<template>
  <section>
    <HoldingPageSplash
      :splash="holdingPage.splash"
      :showSplashLogo="showSplashLogo"
      @splashClick="handleSplashClick"
      @play="handleSplashPlay"
    />
  </section>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { holdingPageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";
import { mapMutations } from 'vuex';
export default {
  asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return sanityClient.fetch(holdingPageRequest).then(holdingPage => ({ holdingPage }));
  },
  data() {
    return {
      showSplashLogo: false,
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
    handleSplashClick() {
      if (this.timeout) clearTimeout(this.timeout);
      this.splash = false;
      this.showSplashLogo = true;
    },
    handleSplashPlay() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showSplashLogo = true;
      }, 5000)
    },
    resetSplash() {
      this.currentSlide = 0;
      this.showSplashLogo = true;
      this.splash = true;
    },
  }
};
</script>

<style lang="scss" scoped>
section {
  cursor: pointer;
  overflow: hidden;
}
</style>