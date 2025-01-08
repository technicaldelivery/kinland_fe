<template>
  <div class="project-page-slide-video">
    <MuxVideoAutoplay
      v-if="item.video"
      :video="item.video"
    />
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>
.project-page-slide-video {
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  video {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>