<template>
  <div class="navigation">
    <ul v-if="slides && slides.length" class="ts-s">
      <li
        v-for="(slide, index) in slides"
        :key="slide._key"
        class="tablet-and-laptop-and-desktop"
        :class="{ active: !splash && index === currentSlide }"
        @click="$emit('updateCurrentSlide', index)"
      >
        <button>
          {{ index + 1 }}
        </button>
      </li><li class="phone small-caps" :class="currentSlide < slides.length ? 'active' : 'inactive'">
        {{ currentSlide < slides.length ? currentSlide + 1 : currentSlide }} of {{ slides.length }}
      </li><li 
        class="information"
        :class="{ active: !splash && currentSlide === slides.length }"
        @click="$emit('updateCurrentSlide', slides.length)"
      >
        <button class="small-caps">
          project text
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'slides',
    'currentSlide',
    'splash',
  ],
}
</script>

<style lang="scss" scoped>
.navigation {
  position: absolute;
  bottom: 0; right: 0; left: 0;
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
      color: rgba(0,0,0,0.25);
      transition: color 0.25s ease;
      &:hover, &.active {
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