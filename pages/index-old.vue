<template>
  <section v-hammer:swipe="handleSwipe">
    <HoldingPageLogo
      :mode="`slides`"
      @click.native="resetSplash" 
    />
    <transition name="fade-splash">
      <HoldingPageSplash
        v-show="splash"
        :splash="holdingPage.splash"
        :showSplashLogo="showSplashLogo"
        @splashClick="handleSplashClick"
        @play="handleSplashPlay"
        @ended="handleSplashEnded"
      />
    </transition>
    <transition-group 
      name="fade-slides" 
      mode="out-in" 
      class="holding-page-slide-wrapper"
      tag="div"
    >
      <HoldingPageSlide
        v-for="(slide, index) in slides"
        :key="slide._key"
        v-show="!splash && index === currentSlide"
        :slide="slide"
        :currentSlide="currentSlide"
        @click.native="handleSlideClick"
      />
    </transition-group>
    <HoldingPageSlidesNavigation
      v-show="slides"
      :slides="slides"
      :currentSlide="currentSlide"
      @updateCurrentSlide="handleUpdateCurrentSlide"
    />
    <transition name="fade-information">
      <HoldingPageInformation
        v-show="currentSlide === slides.length"
        :information="holdingPage.information"
        @updateCurrentSlide="handleUpdateCurrentSlide"
      />
      <!-- @click.native="currentSlide = 0; splash = true;" -->
    </transition>
  </section>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { holdingPageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";
import { mapMutations } from 'vuex';
export default {
  asyncData($config) {
    const sanityClient = createSanityClient($config);
    return sanityClient.fetch(holdingPageRequest).then(holdingPage => ({ holdingPage }));
  },
  data() {
    return {
      splash: true,
      showSplashLogo: true,
      currentSlide: 0,
      timeout: null
    }
  },
  computed: {
    slides() {
      if (this.holdingPage.slides && this.holdingPage.slides.length) {
        return this.holdingPage.slides;
      } else {
        return null;
      }
    }
  },
  methods: {
    handleSlideClick(e) {
      if (e.clientX < window.innerWidth / 2) {
        if (this.currentSlide > 0) {
          this.handleUpdateCurrentSlide(this.currentSlide - 1);
        } else {
          this.resetSplash();
        }
      } else {
        if (this.currentSlide < this.holdingPage.slides.length) {
          this.handleUpdateCurrentSlide(this.currentSlide + 1);
        } else {
          this.currentSlide = 0;
        }
      }
    },
    handleUpdateCurrentSlide(index) {
      if (index === 'information') {
        if (this.previousSlide === this.slides.length - 1) {
          this.currentSlide = 0;
        } else {
          this.currentSlide = this.previousSlide;
        }
      } else {
        this.previousSlide = this.currentSlide;
        this.currentSlide = index;
      }
    },
    handleSplashClick() {
      if (this.timeout) clearTimeout(this.timeout);
      this.splash = false;
      this.showSplashLogo = true;
    },
    handleSplashPlay() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showSplashLogo = false;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.splash = false;
          this.showSplashLogo = true;            
        }, 9500);
      }, 1500);
    },
    handleSplashEnded() {
      // if (this.timeout) clearTimeout(this.timeout);
      // this.splash = false;
      // this.showSplashLogo = true;            
    },
    resetSplash() {
      this.currentSlide = 0;
      this.showSplashLogo = true;
      this.splash = true;
    },      
    handleKeydown(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === 27) {
        this.splash = true;
        this.showSplashLogo = true;
        this.currentSlide = 0;
      }
    },
    handleKeyup(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === 37 || e.keyCode === 38) {
        if (this.currentSlide > 0) {
           this.currentSlide = this.currentSlide - 1;
        }
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        if (this.splash) {
          this.splash = false;
        } else if (this.currentSlide < this.holdingPage.slides.length) {
          this.currentSlide = this.currentSlide + 1;
        }
      }
    },
    handleSwipe(e) {
      // console.log('swuipe');
      if (e.direction === 2) {
        if (this.splash) {
          this.splash = false;
        } else if (this.currentSlide < this.holdingPage.slides.length) {
          this.currentSlide = this.currentSlide + 1;
        }
      } else if (e.direction === 4) {
        if (this.currentSlide > 0) {
           this.currentSlide = this.currentSlide - 1;
        } else {
          this.resetSplash();
        }
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }
};
</script>

<style lang="scss" scoped>
section {
  cursor: pointer;
  overflow: hidden;
}
</style>