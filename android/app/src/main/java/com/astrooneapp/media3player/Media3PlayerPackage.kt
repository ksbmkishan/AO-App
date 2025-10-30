package com.ksbm.astrooneapp.media3player

import com.facebook.react.ReactPackage
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.bridge.NativeModule

class Media3PlayerPackage : ReactPackage {
    override fun createNativeModules(reactContext: com.facebook.react.bridge.ReactApplicationContext)
        = emptyList<NativeModule>()

    override fun createViewManagers(reactContext: com.facebook.react.bridge.ReactApplicationContext)
        = listOf(Media3PlayerViewManager())
}
