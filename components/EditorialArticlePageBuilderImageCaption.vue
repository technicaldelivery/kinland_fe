<template>
  <div class="page-builder-image-caption" :key="index">
    <a 
      :id="`footnote-${ index + 1 }`"
      :href="`#image-${ index + 1 }`" 
      v-scroll-to="`#image-${ index + 1 }`"
      class="footnote-link"
      @mouseenter="handleMouseMove"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <span class="page-builder-image-caption-number">
        {{index + 1}}
      </span>
      <span class="underline-span">
        {{caption.body}}
      </span>
    </a>
    <div 
      v-show="isActive" 
      class="image-wrapper-wrapper"
      :style="{
        position: 'fixed',
        top: pointerY + 'px',
        left: pointerX + 'px',
      }"
    >
      <SanityImage
        :image="caption"
        :alt="''"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['caption','index'],
  data() {
    return {
      isActive: false,
      pointerX: 0,
      pointerY: 0,
    }
  },
  methods: {
    handleMouseMove(e) {
      console.log(e);
      this.pointerX = e.clientX
      this.pointerY = e.clientY
      this.isActive = true
    },
    handleMouseLeave() {
      this.isActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-builder-image-caption {
    // font-size: 0.625rem;
    display: flex;
    .page-builder-image-caption-number {
      margin: 0 calc(0 * var(--fm));
      margin-right: var(--fm);
    }
    .page-builder-image-caption-text {
    }
    .image-wrapper-wrapper {
      // padding-top: 1.5em;
      // padding-left: 1em;
      width: 8em;
      height: 8em;
      pointer-events: none;
      @include phone-and-tablet {
        display: none;
      }
    }
  }
</style>