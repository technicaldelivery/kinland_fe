<template>
  <div class="media-item-caption-wrapper">
    <a
      v-if="item.body"
      :href="`#footnote-${ imageCaption }`"
      v-scroll-to="`#footnote-${ imageCaption }`"
      class="media-item-caption"
    >
      {{ imageCaption }}
    </a>
  </div>
</template>

<script>
export default {
  props: ['item', 'imageCaption']
}
</script>

<style lang="scss" scoped>
.media-item-caption-wrapper {
  margin-top: calc(0.25 * var(--fm));
}
</style>