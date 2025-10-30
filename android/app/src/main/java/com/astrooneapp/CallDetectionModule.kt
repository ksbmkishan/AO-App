package com.ksbm.astrooneapp

import android.Manifest
import android.content.Context
import android.os.Build
import android.telephony.PhoneStateListener
import android.telephony.TelephonyCallback
import android.telephony.TelephonyManager
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.Executors

class CallDetectionModule(private val reactCtx: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactCtx) {

  private var telephonyManager: TelephonyManager? = null
  private var phoneStateListener: PhoneStateListener? = null
  private var telephonyCallback: TelephonyCallback? = null

  override fun getName() = "CallDetection"

  private fun hasReadPhoneState(): Boolean {
    return ContextCompat.checkSelfPermission(
      reactCtx, Manifest.permission.READ_PHONE_STATE
    ) == PackageManager.PERMISSION_GRANTED
  }

  @ReactMethod
  fun startListener(promise: Promise) {
    try {
      if (!hasReadPhoneState()) {
        promise.reject("NO_PERMISSION", "READ_PHONE_STATE not granted")
        return
      }

      telephonyManager = reactCtx.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        // Android 12+ (API 31): TelephonyCallback
        val exec = Executors.newSingleThreadExecutor()
        telephonyCallback = object : TelephonyCallback(), TelephonyCallback.CallStateListener {
          override fun onCallStateChanged(state: Int) {
            sendState(state)
          }
        }
        telephonyManager?.registerTelephonyCallback(exec, telephonyCallback as TelephonyCallback)
      } else {
        // Older devices: PhoneStateListener
        phoneStateListener = object : PhoneStateListener() {
          override fun onCallStateChanged(state: Int, phoneNumber: String?) {
            sendState(state)
          }
        }
        @Suppress("DEPRECATION")
        telephonyManager?.listen(phoneStateListener, PhoneStateListener.LISTEN_CALL_STATE)
      }

      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("START_ERROR", e)
    }
  }

  @ReactMethod
  fun stopListener(promise: Promise) {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        telephonyCallback?.let { telephonyManager?.unregisterTelephonyCallback(it) }
        telephonyCallback = null
      } else {
        @Suppress("DEPRECATION")
        telephonyManager?.listen(phoneStateListener, PhoneStateListener.LISTEN_NONE)
        phoneStateListener = null
      }
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STOP_ERROR", e)
    }
  }

  private fun sendEvent(name: String, value: String) {
    reactCtx
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(name, value)
  }

  private fun sendState(state: Int) {
    val stateStr = when (state) {
      TelephonyManager.CALL_STATE_IDLE -> "Idle"
      TelephonyManager.CALL_STATE_RINGING -> "Ringing"
      TelephonyManager.CALL_STATE_OFFHOOK -> "Offhook"
      else -> "Unknown"
    }
    sendEvent("CallState", stateStr)
  }
}