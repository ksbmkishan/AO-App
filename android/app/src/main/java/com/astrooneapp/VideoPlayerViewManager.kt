package com.ksbm.astrooneapp

import android.net.Uri
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

class VideoPlayerViewManager : SimpleViewManager<PlayerView>() {

    override fun getName(): String = "VideoPlayerView"

    override fun createViewInstance(reactContext: ThemedReactContext): PlayerView {
        val playerView = PlayerView(reactContext)
        playerView.useController = false
        playerView.setShutterBackgroundColor(0xFF000000.toInt())
        return playerView
    }

    @ReactProp(name = "src")
    fun setSrc(playerView: PlayerView, src: String?) {
        if (src.isNullOrEmpty()) return

        val context = playerView.context
        val player = ExoPlayer.Builder(context).build()
        playerView.player = player

        val uri: Uri = if (src.startsWith("http")) {
            Uri.parse(src)
        } else {
            // Local video in res/raw
            val resId = context.resources.getIdentifier(
                src.substringBeforeLast("."),
                "raw",
                context.packageName
            )
            Uri.parse("android.resource://${context.packageName}/$resId")
        }

        val mediaItem = MediaItem.fromUri(uri)
        player.setMediaItem(mediaItem)
        player.repeatMode = ExoPlayer.REPEAT_MODE_ONE
        player.volume = 0f // muted
       // 🔹 Wait for PlayerView to attach before starting playback
    playerView.addOnAttachStateChangeListener(object : android.view.View.OnAttachStateChangeListener {
        override fun onViewAttachedToWindow(v: android.view.View) {
            player.prepare()
            player.playWhenReady = true
            playerView.removeOnAttachStateChangeListener(this)
        }

        override fun onViewDetachedFromWindow(v: android.view.View) {
            player.release()
        }
    })
    }
}
