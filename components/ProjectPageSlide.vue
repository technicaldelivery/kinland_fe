<template>
    <div 
      v-if="slide" 
      :class="{ preload }" 
      class="project-page-slide"
    >
      <div 
        v-if="slide.media && slide.media.length"
        :class="{
          'double': slide.media.length > 1,
          'single': slide.media.length === 1,
        }"
        class="project-page-slide-media"
      >
        <div
          v-for="(item, index) in slide.media"
          :key="item._key"
          :class="[item.layoutOption, {
            'left': index === 0 && slide.media.length > 1,
            'right': index === 1 && slide.media.length > 1,
            'center': slide.media.length === 1
          }]"
          class="project-page-slide-media-item"
        >
          <ProjectPageSlideImage 
            v-if="item._type === 'image'"
            :image="item"
          />
          <ProjectPageSlideVideo 
            v-else-if="item._type === 'video'"
            :item="item"
          />
          <div 
            v-if="item && item.body" 
            class="project-page-slide-media-item-caption-wrapper"
          >
            <p class="project-page-slide-media-item-caption">{{item.body}}</p>
            <!-- <PortableText
              :blocks="item.text"
              :className="`project-page-slide-media-item-caption`"
              :renderContainerOnSingleChild="true"
            /> -->
          </div>
        </div>
      </div>
      <div
        v-else-if="slide.text"
        class="project-page-slide-text"
      >
        <PortableText
          :blocks="slide.text"
          :className="`project-page-slide-text-body`"
          :renderContainerOnSingleChild="true"
        />
      </div>
    </div>
</template>

<script>
export default {
  props: ['slide','currentSlide','preload'],
}
</script>

<style lang="scss" scoped>
.project-page-slide {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 2;
  padding: calc(3 * var(--fm)) var(--fm);
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  &.preload {
    transform: translateX(100%);
  }
  .project-page-slide-media {
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
      }
    }
    &.single {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: var(--fm);
      @include phone {
        grid-template-columns: repeat(1, 1fr);
      }
      .project-page-slide-media-item {
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
    .project-page-slide-media-item {
      height: 100%;
      display: flex;
      transform: translateZ(0);
      &.small {
        .project-page-slide-video, .project-page-slide-image {
          width: 50%;
          height: 50%;
          margin: auto;
          @include phone {
            width: 100%;
            height: 100%;
          }
        }
      }
      .project-page-slide-media-item-caption-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        padding: var(--fm);
        @include phone {
          display: none;
        }
        .project-page-slide-media-item-caption {
          @include typography-small;
        }
      }
    }
  }
  .project-page-slide-text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(1 * var(--fm));
    max-height: calc(100vh - 6 * var(--fm));
    overflow-y: scroll;
    .project-page-slide-text-body {
      @include typography-extra-large;
      max-width: 22.5em;
    }
  }
}
</style>