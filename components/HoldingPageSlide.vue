<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <!-- <transition name="fade-in" mode="in-out"> -->
    <div 
      v-if="slide" 
      :class="{ preload }" 
      class="holding-page-slide"
    >
      <div 
        v-if="slide.media && slide.media.length"
        :class="{
          'double': slide.media.length > 1,
          'single': slide.media.length === 1,
        }"
        class="holding-page-slide-media"
      >
        <div
          v-for="(item, index) in slide.media"
          :class="[item.layoutOption,  {
            'left': index === 0 && slide.media.length > 1,
            'right': index === 1 && slide.media.length > 1,
            'center': slide.media.length === 1
          }]"
          class="holding-page-slide-media-item"
        >
          <HoldingPageSlideImage 
            v-if="item._type === 'image'"
            :image="item"
          />
          <HoldingPageSlideVideo 
            v-else-if="item._type === 'video'"
            :item="item"
          />
          <div 
            v-if="item && item.text" 
            class="holding-page-slide-media-item-caption-wrapper"
          >
            <PortableText
              :blocks="item.text"
              :className="`holding-page-slide-media-item-caption`"
              :renderContainerOnSingleChild="true"
            />
          </div>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  props: ['slide','currentSlide','preload'],
  computed: {
    // slide() {
    //   if (!this.preload) {
    //     return this.slides[this.currentSlide];
    //   } else {
    //     if (this.slides[this.currentSlide + 1]) {
    //       return this.slides[this.currentSlide + 1]
    //     } else {
    //       return this.slides[0]
    //     }
    //   }
      
    // }
  }
}
</script>

<style lang="scss" scoped>
.holding-page-slide {
  // height: 100%;
  // width: 100%;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 2;
  // padding: calc(3 * var(--fm)) var(--fm);
  padding: 0 var(--fm);
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  &.preload {
    transform: translateX(100%);
  }
  @include phone {
    // padding: calc(3 * var(--fm)) var(--fm) calc(4.5 * var(--fm)) var(--fm);
  }
  .holding-page-slide-media {
    width: 100%;
    height: 100%;
    &.double {
      @include tablet-and-laptop-and-desktop {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: var(--fm);
      }
      @include phone {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: var(--fm);
        // display: flex;
        // flex-direction: column;
        // justify-content: space-evenly;
      }
    }
    &.single {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--fm);
      @include phone {
        grid-template-columns: repeat(1, 1fr);
      }
      .holding-page-slide-media-item {
        @include tablet-and-laptop-and-desktop {
          &.small, &.medium {
            grid-column: 2 / span 2;
          }
          &.large {
            grid-column: span 4;
          }
        }
      }
    }
    .holding-page-slide-media-item {
      height: 100%;
      display: flex;
      transform: translateZ(0);
      &.left {

      }
      &.right {

      }
      &.small, &.medium {
        .holding-page-slide-video, .holding-page-slide-image {
          // position: absolute;
          // top: 0; right: 0; bottom: 0; left: 0;
          // height: 0;
          // padding-top: 100%;
          // transform: translateZ(0);
        }
      }
      &.small {
        .holding-page-slide-video, .holding-page-slide-image {
          width: 50%;
          height: 50%;
          margin: auto;
          @include phone {
            width: 100%;
            height: 100%;
          }
        }
      }
      &.medium {

      }
      &.large {

      }
      .holding-page-slide-media-item-caption-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        padding: var(--fm);
        @include phone {
          display: none;
        }
        .holding-page-slide-media-item-caption {
          @include typography-small;
        }
      }
    }
  }
}
</style>