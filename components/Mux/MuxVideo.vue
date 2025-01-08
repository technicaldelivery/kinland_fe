<template>
  <video
    :id="video.asset._id"
    ref="video"
    :poster="coverImage"
    crossorigin="anonymous"
  >
    <source :src="video.asset.url + '.m3u8'" type="application/x-mpegURL">
    <track v-if="captions" :src="captions" label="English" kind="captions" srclang="en-uk" default >
  </video>
</template>

<script>
import Hls from 'hls.js';
import mux from "mux-embed";
import Plyr from 'plyr';

export default {
  props: [ 'video', 'controls', 'cover', 'title', 'captions' ],
  data() {
    return {
      // playerOptions: {
      //   controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      //   settings: ['quality', 'speed', 'loop'],
      //   autoplay: this.controls
      // }
    }
  },
  computed: {
    coverImage() {
      return `https://image.mux.com/${this.video.asset.playbackId}/thumbnail.jpg${this.video.asset.thumbTime ? `?time=${this.video.asset.thumbTime}` : `` }`
    }
  },
  mounted() {
    var player = new Plyr(document.getElementById(this.video.asset._id), {
      iconUrl: '/svg/plyr.svg',
    });
    player.on('ready', (event) => {
      var instance = event.detail.plyr;
      var url = "https://stream.mux.com/" + this.video.asset.playbackId + ".m3u8";
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(instance.media);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  video {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%;
    height: 100%;
  }
</style>
