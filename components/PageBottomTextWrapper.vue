<template>
  <div class="bottom-text-wrapper small-caps" :class="{fixed}">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-text-wrapper {
  margin: calc(1 * var(--fm)) calc(2 * var(--fm));
  text-align: center;
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  p {
    display: inline-block;
  }
}
</style>