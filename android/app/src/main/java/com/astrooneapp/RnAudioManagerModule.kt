package com.ksbm.astrooneapp

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.provider.Settings
import com.facebook.react.bridge.*

class RnAudioManagerModule(private val reactCtx: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactCtx) {

  private val audioManager: AudioManager =
    reactCtx.getSystemService(Context.AUDIO_SERVICE) as AudioManager

  override fun getName() = "RnAudioManager"

  private fun mapStream(s: String): Int = when (s.lowercase()) {
    "music" -> AudioManager.STREAM_MUSIC
    "ring" -> AudioManager.STREAM_RING
    "notification" -> AudioManager.STREAM_NOTIFICATION
    "alarm" -> AudioManager.STREAM_ALARM
    "system" -> AudioManager.STREAM_SYSTEM
    "voice_call" -> AudioManager.STREAM_VOICE_CALL
    else -> AudioManager.STREAM_MUSIC
  }

  // --- Volume ---

  @ReactMethod
  fun getVolume(streamType: String, promise: Promise) {
    try {
      val st = mapStream(streamType)
      val current = audioManager.getStreamVolume(st)
      val max = audioManager.getStreamMaxVolume(st)
      val map = Arguments.createMap().apply {
        putInt("current", current)
        putInt("max", max)
      }
      promise.resolve(map)
    } catch (e: Exception) {
      promise.reject("E_GET_VOLUME", e)
    }
  }

  @ReactMethod
  fun setVolume(streamType: String, volume: Int, showUI: Boolean, promise: Promise) {
    try {
      val st = mapStream(streamType)
      val max = audioManager.getStreamMaxVolume(st)
      val clamped = volume.coerceIn(0, max)
      val flags = if (showUI) AudioManager.FLAG_SHOW_UI else 0
      audioManager.setStreamVolume(st, clamped, flags)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_SET_VOLUME", e)
    }
  }

  @ReactMethod
  fun adjustVolume(streamType: String, direction: String, showUI: Boolean, promise: Promise) {
    try {
      val st = mapStream(streamType)
      val dir = when (direction.lowercase()) {
        "up" -> AudioManager.ADJUST_RAISE
        "down" -> AudioManager.ADJUST_LOWER
        else -> AudioManager.ADJUST_SAME
      }
      val flags = if (showUI) AudioManager.FLAG_SHOW_UI else 0
      audioManager.adjustStreamVolume(st, dir, flags)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_ADJUST_VOLUME", e)
    }
  }

  // --- Ringer mode ---

  @ReactMethod
  fun getRingerMode(promise: Promise) {
    try {
      val mode = when (audioManager.ringerMode) {
        AudioManager.RINGER_MODE_SILENT -> "silent" // Note: Fixed typo from "silent"
        AudioManager.RINGER_MODE_VIBRATE -> "vibrate"
        AudioManager.RINGER_MODE_NORMAL -> "normal"
        else -> "unknown"
      }
      promise.resolve(mode)
    } catch (e: Exception) {
      promise.reject("E_GET_RINGER", e)
    }
  }

  @ReactMethod
  fun setRingerMode(mode: String, promise: Promise) {
    try {
      // Check for DND permission on Android M+
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        val nm = reactCtx.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (!nm.isNotificationPolicyAccessGranted) {
          promise.reject("E_NO_PERMISSION", "Do Not Disturb access not granted")
          return
        }
      }

      val ringerMode = when (mode.lowercase()) {
        "silent" -> AudioManager.RINGER_MODE_SILENT
        "vibrate" -> AudioManager.RINGER_MODE_VIBRATE
        "normal" -> AudioManager.RINGER_MODE_NORMAL
        else -> {
          promise.reject("E_INVALID_MODE", "Invalid ringer mode: $mode")
          return
        }
      }
      
      audioManager.ringerMode = ringerMode
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_SET_RINGER", e)
    }
  }

  // --- DND Permission helpers ---

  @ReactMethod
  fun hasDndPermission(promise: Promise) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      val nm = reactCtx.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      promise.resolve(nm.isNotificationPolicyAccessGranted)
    } else {
      promise.resolve(true)
    }
  }

  @ReactMethod
  fun openDndSettings(promise: Promise) {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactCtx.startActivity(intent)
        promise.resolve(true)
      } else {
        promise.resolve(false)
      }
    } catch (e: Exception) {
      promise.reject("E_OPEN_DND_SETTINGS", e)
    }
  }

  // --- Vibration ---

  @ReactMethod
  fun vibrate(durationMs: Int, promise: Promise) {
    try {
      val vib = reactCtx.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
      if (vib == null || !vib.hasVibrator()) {
        promise.resolve(false)
        return
      }

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        vib.vibrate(VibrationEffect.createOneShot(durationMs.toLong(), VibrationEffect.DEFAULT_AMPLITUDE))
      } else {
        @Suppress("DEPRECATION")
        vib.vibrate(durationMs.toLong())
      }
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_VIBRATE", e)
    }
  }

  @ReactMethod
  fun vibratePattern(pattern: ReadableArray, repeat: Int, promise: Promise) {
    try {
      val vib = reactCtx.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
      if (vib == null || !vib.hasVibrator()) {
        promise.resolve(false)
        return
      }

      val arr = LongArray(pattern.size()) { i -> pattern.getInt(i).toLong() }
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        vib.vibrate(VibrationEffect.createWaveform(arr, repeat))
      } else {
        @Suppress("DEPRECATION")
        vib.vibrate(arr, repeat)
      }
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_VIBRATE_PATTERN", e)
    }
  }

  @ReactMethod
  fun cancelVibration(promise: Promise) {
    try {
      val vib = reactCtx.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
      vib?.cancel()
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("E_CANCEL_VIBRATION", e)
    }
  }
}