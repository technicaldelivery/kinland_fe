<template>
  <div class="kinland" :class="mode">
    <!-- <h1>Kinland</h1> -->
    <h1>
      <span class="visually-hidden">Kinland</span>
      <IconKinland :color="color" class="shoopdewoop" />
    </h1>
  </div>
</template>

<script>
export default {
  props: ['mode'],
  computed: {
    color() {
      if (this.mode === 'splash') return 'white';
      else return 'black';
    }
  }
}
</script>

<style lang="scss" scoped>
.kinland {
  &.slides {
    // position: absolute;
    // top: 0; right: 0; left: 0;
    z-index: 111;
    padding: var(--fm);
    height: calc(3 * var(--fm));
    // height: var(--fm);
    h1 {
      line-height: 1 !important;
      transform: translateY(-0.095em);
    }
  }
  &.splash {
    color: white;
    h1 {
      @include typography-extra-large;
      transform: translateY(-0.25em);
    }
  }
  text-align: center;
  h1 {
    @include typography-large;
    .visually-hidden {
      @include typography-large;
      border: 0;
      padding: 0;
      margin: 0;
      position: absolute !important;
      height: 1px; 
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
      clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
      clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
      white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
    }
  }
}
</style>