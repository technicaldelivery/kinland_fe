<template>
  <a 
    :href="href" 
    target="_blank" 
    rel="noopener"
    @mouseenter="UPDATE_MOUSEVISIBLE(false)" 
    @mouseleave="UPDATE_MOUSEVISIBLE(true)"
  ><slot /></a>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: ['href'],
  methods: {
    ...mapMutations('styling', ['UPDATE_MOUSEVISIBLE']),
  }
}
</script>

<style lang="scss" scoped>
a {
  pointer-events: all;
}
</style>
