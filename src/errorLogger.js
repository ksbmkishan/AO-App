// mobile/src/errorLogger.js
import { Platform } from 'react-native';

const LOGGER_URL = 'https://your-server.com/api/log-error'; // replace

async function postToServer(payload) {
  try {
    // small timeout + safe JSON size limit
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    await fetch(LOGGER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'REPLACE_WITH_SERVER_API_KEY' // optional auth
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (err) {
    // Don't block the app in case of failure
    // Optionally queue to AsyncStorage for retry
    console.warn('Error sending log to server', err?.message || err);
  }
}

function buildPayload(error, extra = {}) {
  return {
    message: error?.message || String(error),
    name: error?.name || null,
    stack: error?.stack || null,
    time: new Date().toISOString(),
    platform: Platform.OS,
    device: {
      // optionally fill using react-native-device-info
      // deviceId, model, brand, systemVersion, appVersion, buildNumber
    },
    appVersion: extra.appVersion || null,
    userId: extra.userId || null,
    screen: extra.screen || null,
    handled: !!extra.handled, // boolean: true if a handled error
    meta: extra.meta || {},
  };
}

/* 1) Use a manual helper to log handled errors */
export async function logHandledError(error, opts = {}) {
  const payload = buildPayload(error, { ...opts, handled: true });
  await postToServer(payload);
}

/* 2) Catch unhandled JS exceptions globally */
export function setupGlobalErrorHandlers() {
  // For RN JS exceptions
  const defaultHandler = global.ErrorUtils.getGlobalHandler && global.ErrorUtils.getGlobalHandler();

  function globalErrorHandler(error, isFatal) {
    const payload = buildPayload(error, { handled: false, meta: { isFatal } });
    // do not await (fire and forget)
    postToServer(payload).catch(() => {});
    // call default to show redbox in dev or crash in prod if needed
    if (defaultHandler) {
      defaultHandler(error, isFatal);
    }
  }

  if (global.ErrorUtils && global.ErrorUtils.setGlobalHandler) {
    global.ErrorUtils.setGlobalHandler(globalErrorHandler);
  }

  // Unhandled promise rejections
  const rejectionHandler = (event) => {
    try {
      const error = event?.reason || new Error('UnhandledPromiseRejection');
      const payload = buildPayload(error, { handled: false, meta: { unhandledPromiseRejection: true } });
      postToServer(payload).catch(() => {});
    } catch (e) {}
  };

  if (typeof global.process === 'object' && global.process?.on) {
    global.process.on('unhandledRejection', rejectionHandler);
  } else {
    // fallback for some RN versions:
    window.addEventListener && window.addEventListener('unhandledrejection', (e) => {
      const err = e?.reason || new Error('Unhandled Promise Rejection');
      postToServer(buildPayload(err, { handled: false })).catch(()=>{});
    });
  }
}
