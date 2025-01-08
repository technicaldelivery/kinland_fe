<template>
  <div class="project-page-slide-image">
    <SanityImage
      :key="image._key"
      :image="image"
      :alt="image.alt"
      :transparent="true"
      :objectFit="`contain`"
      :preload="true"
    />
  </div>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style lang="scss" scoped>
.project-page-slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  .image-wrapper {
    height: 100% !important;
    padding-top: 0 !important;
  }
}
</style>