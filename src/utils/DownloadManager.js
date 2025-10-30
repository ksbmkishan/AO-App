import RNBackgroundDownloader from '@kesha-antonov/react-native-background-downloader';
import RNFS from 'react-native-fs';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // optional

const CACHE_DIR = RNFS.CachesDirectoryPath + '/astroone_videos';
const MANIFEST_KEY = 'video_manifest_v1';
const MAX_BYTES = 1200 * 1024 * 1024; // 1.2 GB

// ensure directory exists
async function ensureDir() {
  const exists = await RNFS.exists(CACHE_DIR);
  if (!exists) await RNFS.mkdir(CACHE_DIR);
}

async function loadManifest() {
  const json = await AsyncStorage.getItem(MANIFEST_KEY);
  return json ? JSON.parse(json) : {};
}
async function saveManifest(m) { await AsyncStorage.setItem(MANIFEST_KEY, JSON.stringify(m)); }

function localPathFor(filename) {
  return `${CACHE_DIR}/${filename}`;
}

// compute total cache bytes
async function cacheSize(manifest) {
  let total = 0;
  for (const id in manifest) {
    total += manifest[id].size || 0;
  }
  return total;
}

// LRU eviction based on lastAccess
async function ensureSpace(manifest, incomingBytes = 0) {
  let total = await cacheSize(manifest);
  while (total + incomingBytes > MAX_BYTES) {
    // find oldest lastAccess
    const ids = Object.keys(manifest);
    if (!ids.length) break;
    ids.sort((a,b) => (manifest[a].lastAccess || 0) - (manifest[b].lastAccess || 0));
    const removeId = ids[0];
    const item = manifest[removeId];
    try {
      const p = localPathFor(item.filename);
      const ex = await RNFS.exists(p);
      if (ex) await RNFS.unlink(p);
    } catch(e){ console.warn('evict err', e) }
    total -= item.size || 0;
    delete manifest[removeId];
  }
  await saveManifest(manifest);
}

export default {
  async init() {
    await ensureDir();
    this.manifest = await loadManifest();
    this.activeDownloads = {}; // id -> task
  },

  // enqueue an array of video objects {id, filename, url, size, version}
  async preloadList(videos = [], options = { wifiOnly: true, concurrent: 3 }) {
    const state = await NetInfo.fetch();
    if (options.wifiOnly && state.type !== 'wifi') {
      console.log('Skipping preload: not on WiFi');
      return;
    }
    // filter what we already have and same version
    const toDownload = videos.filter(v => {
      const lm = this.manifest[v.id];
      if (!lm) return true;
      if (lm.version !== v.version) return true; // version changed -> re-download
      // check file exists
      const p = localPathFor(v.filename);
      return !(RNFS.exists(p)); // if exists returns promise but keep simple: we'll check below
    });

    // prepare space
    await ensureSpace(this.manifest, toDownload.reduce((s, t) => s + (t.size || 0), 0));

    // start in small pool
    const concurrency = options.concurrent || 3;
    let idx = 0;
    const startNext = () => {
      if (idx >= toDownload.length) return;
      const v = toDownload[idx++];
      this._startDownload(v).finally(() => startNext());
    };

    // kick off initial tasks
    for (let i=0;i<concurrency && i<toDownload.length;i++) startNext();
  },

  async _startDownload(v) {
    try {
      const dest = localPathFor(v.filename);
      // skip if file already exists and version matches
      if (await RNFS.exists(dest)) {
        this.manifest[v.id] = { ...v, path: dest, lastAccess: Date.now() };
        await saveManifest(this.manifest);
        return;
      }

      const task = RNBackgroundDownloader.download({
        id: `video-${v.id}-${Date.now()}`,
        url: v.url,
        destination: dest,
      }).begin(expectedBytes => {
        // optional: update total bytes
        // console.log(`Starting ${v.filename}, expected: ${expectedBytes}`);
      }).progress((percent) => {
        // emit progress if needed
        // console.log('progress', v.id, percent);
      }).done(async () => {
        // save manifest
        this.manifest[v.id] = { ...v, path: dest, lastAccess: Date.now() };
        await saveManifest(this.manifest);
        delete this.activeDownloads[v.id];
      }).error(async (err) => {
        console.warn('Download error', v.id, err);
        // cleanup partial file
        try { if (await RNFS.exists(dest)) await RNFS.unlink(dest); } catch(e){}
        delete this.activeDownloads[v.id];
      });

      this.activeDownloads[v.id] = task;
    } catch (err) {
      console.warn('startDownload err', err);
    }
  },

  // get local path if present
  async getLocalPath(id) {
     if (!this.manifest) {
    console.warn('Manifest not loaded — initializing now');
    await this.init();
  }
    console.log('id video ', id);
    const m = this.manifest[id];
    console.log('video ', m);
    if (!m) return null;
    const ex = await RNFS.exists(m.path);
    if (!ex) return null;
    // update lastAccess
    m.lastAccess = Date.now();
    await saveManifest(this.manifest);
    return m.path;
  },

  // remove all cache (for debug)
  async clearAll() {
    try {
      const exists = await RNFS.exists(CACHE_DIR);
      if (exists) await RNFS.unlink(CACHE_DIR);
      this.manifest = {};
      await saveManifest(this.manifest);
      await ensureDir();
    } catch(e){ console.warn(e) }
  }
};