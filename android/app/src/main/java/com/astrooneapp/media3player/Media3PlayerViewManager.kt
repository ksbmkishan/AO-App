package com.ksbm.astrooneapp.media3player

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class Media3PlayerViewManager : SimpleViewManager<Media3PlayerView>() {

    override fun getName() = "Media3PlayerView"

    override fun createViewInstance(reactContext: ThemedReactContext): Media3PlayerView {
        return Media3PlayerView(reactContext)
    }

    @ReactProp(name = "source")
    fun setSource(view: Media3PlayerView, source: String?) {
        source?.let { view.setSource(it) }
    }

    @ReactProp(name = "paused", defaultBoolean = false)
    fun setPaused(view: Media3PlayerView, paused: Boolean) {
        view.setPaused(paused)
    }

    @ReactProp(name = "muted", defaultBoolean = false)
    fun setMuted(view: Media3PlayerView, muted: Boolean) {
        view.setMuted(muted)
    }
}
