<template>
  <div 
    class="video-block" 
    :class="section.layoutOption"
  >
    <MuxVideoAutoplay
      v-if="section.video"
      :video="section.video"
      :controls="false"
      :title="title"
      :captions="section.captions"
    />
    <PortableText
      v-if="section && section.text"
      :blocks="section.text"
      :className="`caption`"
    />
  </div>
</template>

<script>
export default {
  props: ['section','title'],
  data() {
    return {
      playerOptions: {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        settings: ['quality', 'speed', 'loop'],
        volume: 1,
        autoplay: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .video-block {
    &.extra-large {
      flex-basis: 100vw;
      margin: calc(3 * var(--fm)) calc(-2 * var(--fm));
      @include phone {
        margin: calc(3 * var(--fm)) calc(-1 * var(--fm));
      }
    }
    &.large {
      flex-basis: calc((100% - 11 * var(--fm)) * 8 / 12 + 7 * var(--fm));
      margin: calc(3 * var(--fm)) calc(0.5 * var(--fm));
    }
    &.medium {
      flex-basis: calc((100% - 11 * var(--fm)) * 5 / 12 + 4 * var(--fm));
      margin: calc(3 * var(--fm)) calc(0.5 * var(--fm));
    }
    &.small {
      flex-basis: calc((100% - 11 * var(--fm)) * 3 / 12 + 2 * var(--fm));
      margin: calc(3 * var(--fm)) calc(0.5 * var(--fm));
    }
    .caption {
      margin: auto;
      margin-top: calc(0.5 * var(--fm));
    }
  }
</style>
