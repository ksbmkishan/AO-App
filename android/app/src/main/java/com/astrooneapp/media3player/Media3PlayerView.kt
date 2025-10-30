package com.ksbm.astrooneapp.media3player

import android.content.Context
import android.net.Uri
import android.widget.FrameLayout
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

class Media3PlayerView(context: Context) : FrameLayout(context) {
    private val playerView = PlayerView(context)
    private var player: ExoPlayer? = null

    init {
        addView(playerView)
        playerView.useController = false // ✅ Hides all UI controls
    }

    fun setSource(url: String) {
        releasePlayer()
        player = ExoPlayer.Builder(context).build().also { exoPlayer ->
            playerView.player = exoPlayer
            val mediaItem = MediaItem.fromUri(Uri.parse(url))
            exoPlayer.setMediaItem(mediaItem)

            // ✅ Loop video continuously
            exoPlayer.repeatMode = ExoPlayer.REPEAT_MODE_ONE

            exoPlayer.prepare()
            exoPlayer.playWhenReady = true
        }
    }

    fun setPaused(paused: Boolean) {
        player?.playWhenReady = !paused
    }

    fun setMuted(muted: Boolean) {
        player?.volume = if (muted) 0f else 1f
    }

    fun releasePlayer() {
        player?.release()
        player = null
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        playerView.player = null 
        releasePlayer()
    }
}
