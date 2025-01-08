<template>
  <div
    v-if="image && image.metadata && image.metadata.dimensions"
    class="image-block"
    :class="image.layoutOption"
    :style="{ '--aspect-ratio': image.metadata.dimensions.aspectRatio }"
  >
    <div :id="image._key" :class="orientation" class="image-wrapper-wrapper">
      <SanityImage
        :key="image._key"
        :image="image"
        :alt="image.alt"
        objectFit="contain"
      />
    </div>
    <PortableText
      v-if="image.text"
      :blocks="image.text"
      :renderContainerOnSingleChild="true"
      :className="`caption ${orientation}`"
    />
  </div>
</template>

<script>
export default {
  props: ['image'],
  data() {
    return {
      active: false
    }
  },
  computed: {
    orientation() {
      if (this.image.metadata.dimensions.aspectRatio === 1) {
        return 'square';
      } else if (this.image.metadata.dimensions.aspectRatio > 1) {
        return 'landscape';
      } else if (this.image.metadata.dimensions.aspectRatio < 1) {
        return 'portrait';
      }
    },
    alt() {
      if (this.image.alt) return this.image.alt;
      else if (this.image.text) return this.$toPlainText(this.image.text);
      else if (this.fallbackAltText) return this.fallbackAltText;
      else return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-block {
    // flex: 1;
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
      flex-basis: calc((100% - 11 * var(--fm)) * 4 / 12 + 3 * var(--fm));
      margin: calc(3 * var(--fm)) calc(0.5 * var(--fm));
      filter: grayscale(1);
    }

    // grid-column: span 5;
    .image-wrapper-wrapper {
      // transform: translateZ(0);
      width: 100%;
      // width: calc(100vmin - 2 * var(--fm));
      // height: calc((100vmin - 2 * var(--fm)) / var(--aspect-ratio));
      &.portrait {
        @include tablet-and-laptop-and-desktop {
          // height: calc(100vmin - 2 * var(--fm));
        }
      }
    }
    .caption {
      margin: auto;
      margin-top: calc(0.5 * var(--fm));
      // @include tablet-and-laptop-and-desktop {
      //   width: calc(100vmin - 2 * var(--fm));
      // }
      // &.portrait {
      //   @include tablet-and-laptop-and-desktop {
      //     width: calc((100vmin - 2 * var(--fm)) * var(--aspect-ratio));
      //   }
      // }
    }
  }


</style>
