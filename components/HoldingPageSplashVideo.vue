<template>
  <div class="holding-page-splash-video">
    <MuxVideoAutoplay
      v-if="video"
      :video="video"
      :fullscreen="true"
      @play="$emit('play')"
      @ended="$emit('ended')"
    />
  </div>
</template>

<script>
export default {
  props: ['video']
}
</script>

<style lang="scss" scoped>
.holding-page-splash-video {
  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    text-align: center;
    margin: auto;
  }
}
</style>