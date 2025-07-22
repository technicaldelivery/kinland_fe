<template>
  <div class="holding-page-splash">
    <HoldingPageSplashVideo
      v-if="splash.video"
      :video="splash.video"
      @play="$emit('play')"
      @ended="$emit('ended')"
    />
    <div class="holding-page-splash-text">
      <transition name="fade" mode="out-in">
        <HoldingPageLogo 
          v-if="showSplashLogo" 
          :mode="`splash`" 
        />
        <PortableText
          v-else-if="splash && splash.text"
          :blocks="splash.text"
          :className="`splash-text`"
          :renderContainerOnSingleChild="true"
        />
      </transition>
    </div>
    <button class="splash-click" id="splash-click" />
  </div>
</template>

<script>
export default {
  props: ['splash','showSplashLogo'],
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    handleClick() {
      this.$emit('splashClick');
    }
  },
  mounted() {
    const trigger = document.getElementById('splash-click');
    trigger.addEventListener("click", this.handleClick);
  },
  beforeDestroy() {
    const trigger = document.getElementById('splash-click');
    trigger.removeEventListener("click", this.handleClick);
  }
}
</script>

<style lang="scss" scoped>
.holding-page-splash {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
  .holding-page-splash-text {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    padding: var(--fm);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    .splash-text {
      @include typography-large;
    }
  }
  .splash-click {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 9999;
    cursor: pointer;
  }
}
</style>