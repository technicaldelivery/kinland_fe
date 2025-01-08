<template>
  <svg :style="{ fill }" style="display: block;" viewBox="0 0 24 24">
    <path class="st1" d="M2.6,0.1V24l18.8-12L2.6,0.1z"/>
  </svg>
</template>

<script>
  export default {
    props: [ 'fill' ]
  }
</script>

<style lang="scss" scoped>
  svg {
    filter: drop-shadow(0 0 1px rgba(0,0,0,0.12))
      drop-shadow(0 2px 2px rgba(0,0,0,0.12))
      drop-shadow(0 4px 4px rgba(0,0,0,0.12))
      drop-shadow(0 8px 8px rgba(0,0,0,0.12))
      drop-shadow(0 16px 16px rgba(0,0,0,0.12));
  }
</style>
