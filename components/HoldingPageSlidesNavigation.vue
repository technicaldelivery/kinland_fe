<template>
  <div class="navigation">
    <ul class="ts-s">
      <li
        v-for="(slide, index) in slides"
        :key="slide._key"
        class="tablet-and-laptop-and-desktop"
        :class="{ active: index === currentSlide }"
        @click="$emit('updateCurrentSlide', index)"
      >
        <button>
          {{ index + 1 }}
        </button>
      </li><li class="phone active small-caps">
        {{ currentSlide + 1 }} of {{ slides.length }}
      </li><li 
        class="active information"
        @click="$emit('updateCurrentSlide', slides.length)"
      >
        <button class="small-caps">
          information
        </button>
      </li>
    </ul>
    <!-- <h1 class="ts-l">Kinland</h1> -->
  </div>
</template>

<script>
export default {
  props: ['slides','currentSlide'],
}
</script>

<style lang="scss" scoped>
.navigation {
  // position: absolute;
  // bottom: 0; right: 0; left: 0;
  z-index: 2;
  padding: var(--fm);
  text-align: center;
  h1 {
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  ul {
    @include phone {
      transform: translateY(1px);
    }
    li {
      display: inline-block;
      padding: 0 calc(0.375 * var(--fm));
      color: rgba(0,0,0,0.2);
      &.active {
        color: rgba(0,0,0,1);
      }
      &.tablet-and-laptop-and-desktop {
        @include phone { display: none; }
      }
      &.phone {
        @include tablet-and-laptop-and-desktop {
          display: none;
        }
      }
      &.information {
        @include phone {
          // padding-top: 2px;
          // // display: block;
          // margin-top: calc(0.5 * var(--fm));
        }
      }
    }
  }
}
</style>