<template>
  <div 
    class="media-block" 
    :class="section.media && section.media.length && section.media.length > 1 ? 'two' : 'one'"
  >
    <EditorialArticlePageBuilderMediaBlockMediaItem 
      v-for="item in section.media"
      :item="item"
      :imageCaptions="imageCaptions"
      :key="item._key"
    />
  </div>
</template>

<script>
export default {
  props: ['section','imageCaptions'],
}
</script>

<style lang="scss" scoped>

.media-block {
  width: 100%;
  @include text-width;
  display: flex;
  &.two {
    .media-item {
      &:first-child {
        margin-right: calc(0.5 * var(--fm));
      }
      &:last-child {
        margin-left: calc(0.5 * var(--fm));
      }
    }
  }
  &:not(:first-child) {
    margin-top: calc(4 * var(--fm));
  }
  &:not(:last-child) {
    margin-bottom: calc(4 * var(--fm));
  }
}
</style>
