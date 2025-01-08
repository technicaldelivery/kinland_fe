<template>
  <div class="video-wrapper clickable" @mousemove="showControls" @mouseleave="hideControls" @click="togglePlay" :style="{ '--accent-color': accentColor || 'white' }">
    <slot></slot>
    <div class="controls-wrapper" :class="{ show: show && video && !video.paused }" @click.stop="">
      <div class="buttons-wrapper">
        <div class="left-group">
          <div class="play-pause-button clickable"
            :class="video && video.paused ? 'play' : 'pause'"
            @click="togglePlay"
          >
            <img v-if="video && video.paused" class="svg" :src="'/svg/play.svg'"/>
            <img v-else-if="video && !video.paused" class="svg" :src="'/svg/pause.svg'"/>
          </div>
          <div class="timestamp">
            <div class="current-time">{{ video && video.currentTime | timestamp }} / {{ video && video.duration | timestamp }}</div>
          </div>
        </div>
        <div class="right-group">
          <div v-if="video && !video.muted" class="volume-slider-wrapper control-element-wrapper clickable">
            <div class="volume-slider">
              <div class="volume-slider-volume" :style="volumeSliderStyle">
                <div class="volume-scrubber" @mousedown.stop="onSlide(setVolumeByScrubberPosition)"></div>
              </div>
              <div class="volume-slider-total"></div>
            </div>
          </div>
          <div
            class="control-element-wrapper volume-button clickable"
            @click="toggleVolume"
          >
            <img v-if="video && video.muted" class="svg" :src="'/svg/mute.svg'"/>
            <img v-else-if="video && !video.muted" class="svg" :src="'/svg/volume.svg'"/>
          </div>
          <div class="control-element-wrapper fullscreen-wrapper" @click="toggleFullscreen">
            <div class="fullscreen clickable">
              <img v-if="video && fullscreen" class="svg" :src="'/svg/fullscreen-exit.svg'"/>
              <img v-else-if="video" class="svg" :src="'/svg/fullscreen.svg'"/>
            </div>
          </div>
        </div>
      </div>
      <div class="progress-bar-wrapper">
        <div class="progress-bar clickable" @click="seek($event)">
          <div class="progress-bar-total"></div>
          <div class="progress-bar-buffered" :style="progressBarBufferedStyle"></div>
          <div class="progress-bar-played" :style="progressBarPlayedStyle">
            <div class="progress-bar-scrubber" @mousedown.stop="onSlide(seek)" ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="video && video.paused" class="title-container">
      <div class="title">
        <MuxVideoPlayButton
          :fill="'white'"
        />
      </div>
    </div>
   </div>
</template>

<script>
export default {
  props: ['id', 'aspectRatio', 'title', 'accentColor'],
  data () {
    return {
      show: true,
      video: undefined,
      playedPercentage: 0,
      bufferedPercentage: 0,
      runningTime: 0,
      totalTime: 0,
      volumePercentage: 0,
      fullscreen: false
    }
  },
  computed: {
    progressBarBufferedStyle () {
      return {
        width: `${this.bufferedPercentage}%`
      }
    },
    progressBarPlayedStyle () {
      return {
        width: `${this.playedPercentage}%`
      }
    },
    volumeSliderStyle () {
      return {
        width: `${this.volumePercentage}%`
      }
    }
  },
  methods: {
    showControls () {
      this.show = true
    },
    hideControls () {
      if (this.video.paused)
        return
      this.show = false
    },
    togglePlay () {
      if (this.video.paused) {
        this.video.play();
        setTimeout(() => this.show = false, 2000);
      } else {
        this.video.pause();
      }
    },
    toggleFullscreen () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        this.fullscreen = false;
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
        this.fullscreen = false;
      } else if (this.$el.requestFullscreen) {
        this.$el.requestFullscreen()
        this.fullscreen = true;
      } else if (this.$el.webkitRequestFullscreen) {
        this.$el.webkitRequestFullscreen()
        this.fullscreen = true;
      } else {
        console.log('Your polyfill does not work in this browser');
      }
    },
    updatePlayedPercentage () {
      const progress = this.video.currentTime / this.video.duration
      this.playedPercentage =  progress * 100
    },
    updateBufferedPercentage () {
      try {
        let progress = vid.buffered.end(0) / vid.duration
      } catch (error) {
        return
      }
      this.bufferedPercentage = progress * 100
    },
    onSlide (callback) {
      document.addEventListener('mousemove', callback)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', callback)
      })
    },
    seek(event) {
      const playFromPercent = this.getMousePositionFromLeftInPercentage('.progress-bar-total', event.clientX);
      this.video.currentTime = this.video.duration * playFromPercent;
    },
    setVolumeByScrubberPosition (event) {
      const volume = this.getMousePositionFromLeftInPercentage('.volume-slider-total', event.clientX)
      if (volume >= 0 && volume <= 1) {
        this.video.volume = volume
      }
    },
    setVolume () {
      this.volumePercentage = this.video.muted ? 0 : this.video.volume * 100
    },
    toggleVolume () {
      if (this.video.paused) {
        this.video.play()
      }
      this.video.muted ? this.video.muted = false : this.video.muted = true
    },
    getMousePositionFromLeftInPercentage (selector, clientX) {
      const element = this.$el.querySelector(selector)
      const mouseFromElementLeft = this.getMousePositionFromLeftInPixels(element, clientX)
      const positionFromLeftInPercentage = mouseFromElementLeft / element.offsetWidth
      return positionFromLeftInPercentage
    },
    getMousePositionFromLeftInPixels (element, clientX) {
      const elementLeft = element.getBoundingClientRect().left
      const mouseFromElementLeft = clientX - elementLeft
      return mouseFromElementLeft
    }
  },
  filters: {
    timestamp(time) {
      const durationInMinutes = time / 60
      let seconds = Math.floor((time % 60)) || 0
      seconds = seconds < 10 ? `0${seconds}` : seconds
      const minutes = Math.floor(durationInMinutes) || 0
      return `${minutes}:${seconds}`
    }
  },
  mounted () {
    this.video = this.$slots.default[0].elm // There has to be a better way to do this
    window.video = this.video; // Attach for easy debugging.
    this.video.addEventListener('pause', this.showControls)
    this.setVolume()
    this.video.addEventListener('volumechange', this.setVolume)
    // Seems a little blunt but timeupdate doesn't fire that
    // often so this seems to produce a smoother slider.
    setInterval(() => {
      this.updatePlayedPercentage()
      this.updateBufferedPercentage()
    }, 100);
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.clickable {
  cursor: pointer;
}

.video-wrapper {
  cursor: pointer;
  overflow: hidden;
  transform: translateZ(0);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  display: flex;
  border: 1px solid rgba(255,255,255,0.1);
}

.title-container {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  .title {
    text-align: center;
    svg {
      margin: 1em auto 0 auto;
      width: 6vw;
    }
  }
}

.small, .medium {
  .title-container {
    .title {
      svg {
        width: 4vw;
      }
    }
  }
}

.controls-wrapper {
  @include gradient;
  color: white;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  pointer-events: all;
  padding: var(--fm);
  width: 100%;
  line-height: 1;
  text-align: right;
  opacity: 0;
  transition: opacity 0.25s ease;
  &.show {
    opacity: 1;
  }
  div, p {
    display: inline-flex;
  }
  .buttons-wrapper, .progress-bar-wrapper {
    width: 100%;
  }
  .buttons-wrapper {
    display: flex;
    .left-group {
      flex: 1;
    }
    .right-group {
      .control-element-wrapper {
        margin-left: 1em;
      }
    }
  }
  .progress-bar-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.controls-wrapper.show {}

.controls {

}


/* PROGRESS BAR */

.progress-bar {
  margin-top: calc(var(--m-s-negative) + var(--fm));
  margin-bottom: var(--m-s-negative);
  padding: var(--fm) 0;
  height: 1px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  transition: top 0.2s ease-out;
  flex: auto;
}

.progress-bar-buffered,
.progress-bar-played,
.progress-bar-total {
  height: 2px;
  width: 0%;
  position: absolute;
  transition: width 0.1s
}

.progress-bar-total {
  width: 100%;
  background-color: white;
}

.progress-bar-buffered {
  background-color: white;
}

.progress-bar-played {
  min-width: 2px;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
}

.progress-bar-scrubber {
  width: 2px;
  position: absolute;
  right: -1px;
  background-color: var(--accent-color);
  z-index: 2;
  height: 2px; /* timeline height */
  box-sizing: content-box;
  background-clip: content-box;
  transition: height 0.3s ease-out, width 0.3s ease-out, left 0.2s ease-out, top 0.3s ease-out;
  transform: translateX(50%);
  border-radius: 50%;
  // top: -6px; /* This appears to be required in FF but not Chrome */
}

.progress-bar:hover .progress-bar-scrubber{
  // height: 16px;
  height: 1em;
  width: 1em;
  // top: -14px; /* This appears to be required in FF but not Chrome */
}

/* END PROGRESS BAR */


/* VOLUME SLIDER */

.volume-button {
  width: 1em;
  height: 1em;
  // margin-right: var(--fm);
  @include phone {
    margin-right: 0em;
  }
  .svg {
    width: 100%;
  }
}

.volume-slider-wrapper {
  display: flex;
  align-items: center;
  width: 150px;
  overflow: hidden;
  transition: width 0.2s ease-out;
  @include phone { display: none !important; }
}

.volume-slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--fm) 0;
  margin: var(--m-s-negative) 0;
}

.volume-slider-total, .volume-slider-volume {
  width: 100%;
  height: 2px;
  position: absolute;
}

.volume-slider-total {
  background: white;
  z-index: -1;
}

.volume-slider-volume {
  width: 50%;
  min-width: 1em;
  display: flex;
  align-items: center;
  background-color: var(--accent-color);
}

.volume-scrubber {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  right: 0%;
  background-color: var(--accent-color);
  z-index: 2;
  box-sizing: content-box;
  // border: 4px solid rgba(0,0, 0, 0);
  background-clip: content-box;
  transition: left 0.2s ease-out;
  padding: 0 var(--fm);
  margin: 0 var(--m-s-negative);
}

/* END VOLUME SLIDER */


.buttons {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.buttons-left-side-wrapper,
.buttons-right-side-wrapper {
  display: flex;
  flex-grow: 1;
}

.buttons-right-side-wrapper {
  justify-content: flex-end;
}

.control-element-wrapper {}

/* PLAY/PAUSE BUTTON */

.play-pause-button {
  width: 1em;
  height: 1em;
  margin-right: 1em;
  .svg {
    width: 100%;
  }
}
.play {}
.pause::before, .pause::after {}
.pause::after {}

/* END PLAY/PAUSE BUTTON */


/* FULL SCREEN BUTTON */

.fullscreen-wrapper {
  right: 5;
}

.fullscreen {
  width: 1em;
  height: 1em;
  position: relative;
  .svg {
    width: 100%;
  }
}

/* END FULL SCREEN BUTTON */


/* TIMESTAMP */

.timestamp {
  margin-right: var(--fm);
  font-variant-numeric: tabular-nums;
  display: flex;
  .current-time  {
    flex-grow: 1;
  }
  p {
    margin: auto;
    text-align: right;
  }
}

.time {
  color: white;
}

/* END TIMESTAMP*/
</style>
