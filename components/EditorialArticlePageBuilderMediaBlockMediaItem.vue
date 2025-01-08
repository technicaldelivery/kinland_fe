<template>
  <div 
    :id="`image-${ imageCaption }`" 
    class="media-item"
  >
    <div
      class="media-item-inner"
    >
      <SanityImage
        v-if="item._type === 'image'"
        :image="item"
        :alt="''"
      />
      <EditorialArticlePageBuilderMediaBlockMediaItemCaptionNumber 
        v-if="item && item.body"
        :item="item"
        :imageCaption="imageCaption"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'imageCaptions'],
  computed: {
    imageCaption() {
      return this.imageCaptions.findIndex(imageCaption => imageCaption._key === this.item._key) + 1
    }
  },
  methods: {
    onceHandler(e) {
      console.log('onceHandler', e);
      this.inView = true;
    },
    viewHandler(e) {
      console.log('viewHandler', e);
      if (e.percentInView > 0.5) {
        this.inView = true;
      } else {
        this.inView = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .media-item {
    padding-top: calc(3 * var(--fm));
    margin-top: calc(-3 * var(--fm));
    width: 100%;
    // &:nth-child(even) {
    //   .media-item-inner {
    //     transition: 0.333s opacity 0.666s ease;
    //   }
    // }
    // .media-item-inner {
    //   // opacity: 0;
    //   // transition: opacity 0.666s ease;
    //   &.in-view {
    //     // opacity: 1;
    //   }
    // }
  }
</style>