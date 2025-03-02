<template>
  <div
    class="image-wrapper"
    :style="{
      'padding-top': forceRatio ? forceRatio : image.metadata && image.metadata.dimensions ? 'calc(' + image.metadata.dimensions.height / image.metadata.dimensions.width + ' * 100%)' : '66.67%',
      borderColor: borderColour,
      'box-shadow': glow,
      'background-color': 'var(--color)'
    }"
  >
    <img
      :src="loadingImageUrl"
      :data-srcset="srcset"
      data-sizes="auto"
      :class="{'lazypreload': preload}"
      class="lazyload lazypreload"
      :style="{ objectFit, objectPosition }"
      border="0"
      :alt="alternativeText"
    />
  </div>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import imageUrlBuilder from "@sanity/image-url"
import colourGen from "~/mixins/colourGen.js"

export default {
  mixins: [ colourGen ],
  props: {
    image: {
      type: Object,
      required: true
    },
    alternativeText: {
      type: String,
      default: "Missing caption"
    },
    preload: {
      type: Boolean,
      default: false
    },
    width: {
      default: 1500,
      type: Number
    },
    forceRatio: {
      type: String
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    borderColour: {
      type: String
    },
    glow: {
      type: String
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    viewportPortrait: {
      type: Boolean,
      default: false
    },
    viewportHeight: {},
    viewportWidth: {}
  },
  computed: {
    imageUrl() {
      const sanityClient = createSanityClient(this.$config);
      const builder = imageUrlBuilder(sanityClient);
      return builder.image(this.image).width(this.width)
    },
    srcset() {
      const sanityClient = createSanityClient(this.$config);
      const builder = imageUrlBuilder(sanityClient);
      if (this.fullscreen && this.viewportPortrait) {
        return builder.image(this.image).width(this.aspectRatioAdjust(300)) + "&auto=format&q=90 300w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(400)) + "&auto=format&q=90 400w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(500)) + "&auto=format&q=90 500w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(600)) + "&auto=format&q=90 600w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(700)) + "&auto=format&q=90 700w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(800)) + "&auto=format&q=90 800w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(900)) + "&auto=format&q=90 900w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1000)) + "&auto=format&q=90 1000w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1100)) + "&auto=format&q=90 1100w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1200)) + "&auto=format&q=90 1200w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1400)) + "&auto=format&q=90 1400w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1600)) + "&auto=format&q=90 1600w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(1800)) + "&auto=format&q=90 1800w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(2000)) + "&auto=format&q=90 2000w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(2125)) + "&auto=format&q=90 2125w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(2250)) + "&auto=format&q=90 2250w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(2375)) + "&auto=format&q=90 2375w, " +
          builder.image(this.image).width(this.aspectRatioAdjust(2500)) + "&auto=format&q=90 2500w" 
      } else {
        return builder.image(this.image).width(300) + "&auto=format&q=90 300w, " +
          builder.image(this.image).width(400) + "&auto=format&q=90 400w, " +
          builder.image(this.image).width(500) + "&auto=format&q=90 500w, " +
          builder.image(this.image).width(600) + "&auto=format&q=90 600w, " +
          builder.image(this.image).width(700) + "&auto=format&q=90 700w, " +
          builder.image(this.image).width(800) + "&auto=format&q=90 800w, " +
          builder.image(this.image).width(900) + "&auto=format&q=90 900w, " +
          builder.image(this.image).width(1000) + "&auto=format&q=90 1000w, " +
          builder.image(this.image).width(1100) + "&auto=format&q=90 1100w, " +
          builder.image(this.image).width(1200) + "&auto=format&q=90 1200w, " +
          builder.image(this.image).width(1400) + "&auto=format&q=90 1400w, " +
          builder.image(this.image).width(1600) + "&auto=format&q=90 1600w, " +
          builder.image(this.image).width(1800) + "&auto=format&q=90 1800w, " +
          builder.image(this.image).width(2000) + "&auto=format&q=90 2000w, " +
          builder.image(this.image).width(2125) + "&auto=format&q=90 2125w, " +
          builder.image(this.image).width(2250) + "&auto=format&q=90 2250w, " +
          builder.image(this.image).width(2375) + "&auto=format&q=90 2375w, " +
          builder.image(this.image).width(2500) + "&auto=format&q=90 2500w" 
      }
    },
    loadingImageUrl() {
      const sanityClient = createSanityClient(this.$config);
      const builder = imageUrlBuilder(sanityClient);
      return builder.image(this.image).width(6).blur(10)
    },
    hotspot() {
      if (this.image && this.image.hotspot) {
        return {
          x: this.image.hotspot.x * 100,
          y: this.image.hotspot.y * 100,
          width: this.image.hotspot.width * 100,
          height: this.image.hotspot.height * 100,
        }
      }
      return null;
    },
    objectPosition() {
      if (this.hotspot && this.fullscreen) {
        return `${this.hotspot.x}% ${this.hotspot.y}%`;
      } else {
        return '50% 50%';
      }
    }
  },
  methods: {
    aspectRatioAdjust(size) {
      if (!this.image.metadata || !this.image.metadata.dimensions) {
        return size; // Return original size if metadata is missing
      }
      
      let imageAR = this.image.metadata.dimensions.aspectRatio || 1.5; // Default to 1.5 aspect ratio
      let viewportAR = this.viewportWidth / this.viewportHeight;
      let multiplier = imageAR / viewportAR;
      // console.table({ imageAR, viewportAR, multiplier });
      return Math.round((size * multiplier) / 25) * 25;
    }
  }
}
</script>

<style lang="scss" scoped>

.image-wrapper {
  transform: translateZ(0);
  position: relative;
  display: block;
  height: 0;
  width: 100%;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// Override for lightbox images
::v-deep .lightbox__image {
  height: auto !important;
  max-height: 90vh !important;
  width: auto !important;
  padding-top: 0 !important;
}

::v-deep .lightbox__image img {
  position: static !important;
  width: auto !important;
  height: auto !important;
  max-height: 90vh !important;
  max-width: 100% !important;
  object-fit: contain !important;
}

</style>
