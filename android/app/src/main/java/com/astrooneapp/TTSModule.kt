package com.ksbm.astrooneapp

import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.os.Bundle
import android.util.Log
import com.facebook.react.bridge.*
import java.util.*

class TTSModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = null
    private var initialized = false
    private var queuedText: String? = null
    private var queuedVoice: String? = null
    private var queuedLocale: String? = null
    private var queuedPromise: Promise? = null
    private var utteranceListeners = mutableMapOf<String, Promise?>()
    private var fallbackToDefault = false

    override fun getName(): String {
        return "TTSModule"
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            initialized = true
            Log.d("TTSModule", "TTS initialized successfully")
            
            // Set up utterance listener with better error handling
            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    Log.d("TTSModule", "Speaking started: $utteranceId")
                }

                override fun onDone(utteranceId: String?) {
                    Log.d("TTSModule", "Speaking finished: $utteranceId")
                    utteranceId?.let { id ->
                        utteranceListeners[id]?.resolve("Speaking completed")
                        utteranceListeners.remove(id)
                    }
                }

                override fun onError(utteranceId: String?) {
                    Log.e("TTSModule", "Speaking error: $utteranceId")
                    handleSpeakError(utteranceId, "Unknown synthesis error")
                }

                override fun onError(utteranceId: String?, errorCode: Int) {
                    Log.e("TTSModule", "Speaking error: $utteranceId, code: $errorCode")
                    val errorMsg = when (errorCode) {
                        TextToSpeech.ERROR_SYNTHESIS -> "Speech synthesis failed"
                        TextToSpeech.ERROR_NETWORK -> "Network error"
                        TextToSpeech.ERROR_NETWORK_TIMEOUT -> "Network timeout"
                        TextToSpeech.ERROR_OUTPUT -> "Output error"
                        TextToSpeech.ERROR_SERVICE -> "TTS service error"
                        TextToSpeech.ERROR_INVALID_REQUEST -> "Invalid request"
                        else -> "Unknown error: $errorCode"
                    }
                    handleSpeakError(utteranceId, errorMsg)
                }
            })
            
            // Process queued request if any
            queuedText?.let { 
                speakInternal(it, queuedVoice, queuedLocale, queuedPromise, false)
                queuedText = null
                queuedVoice = null
                queuedLocale = null
                queuedPromise = null
            }
        } else {
            Log.e("TTSModule", "TTS initialization failed")
            queuedPromise?.reject("INIT_ERROR", "TTS initialization failed")
            queuedPromise = null
        }
    }

    private fun handleSpeakError(utteranceId: String?, errorMsg: String) {
        utteranceId?.let { id ->
            val promise = utteranceListeners[id]
            
            // If we haven't tried fallback yet, try with default settings
            if (!fallbackToDefault && promise != null) {
                Log.w("TTSModule", "Trying fallback to default TTS settings")
                fallbackToDefault = true
                utteranceListeners.remove(id)
                
                // Re-speak with default settings
                queuedText?.let { text ->
                    speakInternal(text, null, "en", promise, true)
                } ?: run {
                    promise.reject("SPEAK_ERROR", errorMsg)
                }
            } else {
                // Already tried fallback or no text to retry
                promise?.reject("SPEAK_ERROR", errorMsg)
                utteranceListeners.remove(id)
                fallbackToDefault = false
            }
        }
    }

    @ReactMethod
    fun speak(text: String, voiceType: String?, localeStr: String?, promise: Promise) {
        if (tts == null) {
            tts = TextToSpeech(reactApplicationContext, this)
        }

        if (!initialized) {
            queuedText = text
            queuedVoice = voiceType
            queuedLocale = localeStr
            queuedPromise = promise
            return
        }

        speakInternal(text, voiceType, localeStr, promise, false)
    }

    private fun speakInternal(text: String, voiceType: String?, localeStr: String?, 
                            promise: Promise?, isFallback: Boolean) {
        try {
            if (!isFallback) {
                queuedText = text // Store for potential retry
            }
            
            val locale = when (localeStr?.toLowerCase()) {
                "hindi" -> Locale("hi", "IN")
                "hinglish" -> Locale("en", "IN")
                "hi" -> Locale("hi",  "IN")
                else -> Locale.ENGLISH // Use standard English as fallback
            }
            
            // First, try to set language
            val setLanguageResult = tts?.setLanguage(locale)
            if (setLanguageResult == TextToSpeech.LANG_MISSING_DATA || 
                setLanguageResult == TextToSpeech.LANG_NOT_SUPPORTED) {
                
                Log.w("TTSModule", "Requested language not supported, falling back to English")
                tts?.setLanguage(Locale.ENGLISH)
            }

            // Voice selection with better fallback logic
            if (!isFallback) {
                selectVoice(voiceType, locale)
            } else {
                // During fallback, use simplest settings
                Log.d("TTSModule", "Using fallback TTS settings")
                tts?.voice = tts?.defaultVoice
            }

            val utteranceId = UUID.randomUUID().toString()
            val params = Bundle().apply {
                putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, utteranceId)
            }

            // Store the promise to resolve when speaking completes
            utteranceListeners[utteranceId] = promise

            // Additional parameters that might help with synthesis
            params.putString(TextToSpeech.Engine.KEY_FEATURE_NETWORK_SYNTHESIS, "auto")
            
            val result = tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
            
            if (result == TextToSpeech.ERROR) {
                promise?.reject("TTS_ERROR", "Failed to start speaking")
                utteranceListeners.remove(utteranceId)
            }
        } catch (e: Exception) {
            Log.e("TTSModule", "Exception in speakInternal: ${e.message}")
            promise?.reject("TTS_ERROR", "Error in speak: ${e.message}")
        }
    }

    private fun selectVoice(voiceType: String?, locale: Locale) {
        try {
            val voices = tts?.voices ?: return
            
            Log.d("TTSModule", "Available voices count: ${voices.size}")
            Log.d("TTSModule", "Requested voice type: $voiceType")

            val selectedVoice = if (voiceType.isNullOrEmpty()) {
                tts?.defaultVoice
            } else {
                voices.find { voice ->
                    when (voiceType.toLowerCase()) {
                        "male" -> voice.name.contains("male", true) ||
                                 voice.locale == locale
                        "female" -> voice.name.contains("female", true) ||
                                   voice.locale == locale
                        else -> voice.locale == locale
                    }
                } ?: voices.find { voice ->
                    // Fallback: any voice with the requested locale
                    voice.locale == locale
                } ?: tts?.defaultVoice
            }

            selectedVoice?.let { 
                tts?.voice = it
                Log.d("TTSModule", "Voice set to: ${it.name} (${it.locale})")
            } ?: run {
                Log.w("TTSModule", "No suitable voice found, using default")
                tts?.voice = tts?.defaultVoice
            }
        } catch (e: Exception) {
            Log.e("TTSModule", "Error selecting voice: ${e.message}")
            tts?.voice = tts?.defaultVoice
        }
    }

    @ReactMethod
    fun speakAndWait(text: String, voiceType: String?, localeStr: String?, promise: Promise) {
        speak(text, voiceType, localeStr, promise)
    }

    @ReactMethod
    fun stop(promise: Promise) {
        try {
            tts?.stop()
            // Clear all pending listeners since we're stopping
            utteranceListeners.forEach { (_, listenerPromise) ->
                listenerPromise?.resolve("Stopped by user")
            }
            utteranceListeners.clear()
            fallbackToDefault = false
            promise.resolve("Stopped")
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", "Error stopping TTS: ${e.message}")
        }
    }

    @ReactMethod
    fun shutdown(promise: Promise) {
        try {
            tts?.stop()
            tts?.shutdown()
            tts = null
            initialized = false
            fallbackToDefault = false
            // Clear all listeners
            utteranceListeners.clear()
            promise.resolve("TTS shutdown")
        } catch (e: Exception) {
            promise.reject("SHUTDOWN_ERROR", "Error shutting down TTS: ${e.message}")
        }
    }

    @ReactMethod
    fun isSpeaking(promise: Promise) {
        try {
            val isSpeaking = tts?.isSpeaking ?: false
            promise.resolve(isSpeaking)
        } catch (e: Exception) {
            promise.reject("CHECK_ERROR", "Error checking speaking status: ${e.message}")
        }
    }

    @ReactMethod
    fun getAvailableVoices(promise: Promise) {
        try {
            val voices = tts?.voices?.map { voice ->
                val args = Arguments.createMap()
                args.putString("name", voice.name)
                args.putString("locale", voice.locale.toString())
                args.putString("features", voice.features.toString())
                args
            }
            
            val result = Arguments.createArray()
            voices?.forEach { result.pushMap(it) }
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("VOICES_ERROR", "Error getting voices: ${e.message}")
        }
    }

    @ReactMethod
    fun checkLanguageSupport(localeStr: String, promise: Promise) {
        try {
            val locale = when (localeStr.toLowerCase()) {
                "hindi" -> Locale("hi", "IN")
                "hinglish" -> Locale("en", "IN")
                else -> Locale("en", "IN")
            }
            
            val result = Arguments.createMap()
            val availability = tts?.isLanguageAvailable(locale) ?: TextToSpeech.LANG_NOT_SUPPORTED
            
            result.putInt("availability", availability)
            result.putBoolean("supported", 
                availability == TextToSpeech.LANG_AVAILABLE || 
                availability == TextToSpeech.LANG_COUNTRY_AVAILABLE || 
                availability == TextToSpeech.LANG_COUNTRY_VAR_AVAILABLE)
            
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("LANG_CHECK_ERROR", "Error checking language: ${e.message}")
        }
    }

    override fun onCatalystInstanceDestroy() {
        tts?.shutdown()
        utteranceListeners.clear()
        super.onCatalystInstanceDestroy()
    }
}