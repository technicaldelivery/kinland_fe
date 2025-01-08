<template>
  <video
    ref="video"
    autoplay
    muted
    loop
    playsinline
    :style="{
      backgroundImage,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <source :src="video.asset.url + '.m3u8'" type="application/x-mpegURL">
  </video>
</template>

<script>
import Hls from 'hls.js';
export default {
  props: ['video', 'fullscreen'],
  computed: {
    poster() {
      return `https://image.mux.com/${this.video.asset.playbackId}/thumbnail.jpg?time=0`
    },
    backgroundImage() {
      if (this.fullscreen && this.poster) {
        return `url(${this.poster})`;
      }
    }
  },
  methods: {
    handlePlay() {
      this.$emit('play');
    },
    handleEnded() {
      this.$emit('ended');
    }
  },
  mounted() {
    this.$nextTick(() => {
      var url = "https://stream.mux.com/" + this.video.asset.playbackId + ".m3u8";
      if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(this.$refs.video);
        window.hls = hls;
      }
    })
    this.$refs.video.addEventListener('play', this.handlePlay);
    this.$refs.video.addEventListener('ended', this.handleEnded);
  },
  beforeDestroy() {
    this.$refs.video.removeEventListener('play', this.handlePlay);
    this.$refs.video.removeEventListener('ended', this.handleEnded);
  }
}
</script>

<style lang="scss" scoped>
video {
  margin: 0;
  padding: 0;
  float: left;
}
</style>