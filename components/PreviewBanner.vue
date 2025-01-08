<template>
  <div
    v-if="!close"
    class="preview-notice"
  >
    <span class="ui-font">Draft Preview</span><a class="refresh" @click="$nuxt.refresh()">Refresh</a><a href="" target="_blank">New window</a><a @click="close = true">Close</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close: false
    }
  },
}
</script>

<style lang="scss" scoped>
  .preview-notice {
    position: fixed;
    bottom: 0;
    left: 0; right: 0;
    z-index: 9999;
    flex: 0;
    padding: var(--fm);
    color: black;
    background-color: rgba(227, 97, 9, 1);
    // font-family: 'Old French';
    font-size: 0.75em;
    text-align: center;
    // border-top: 1.8px solid black;
    .refresh {
      cursor: pointer;
      &:hover {
        color: var(--hover);
      }
    }
    span, a {
      padding: 0 var(--fm);
    }
    a {
      // font-family: 'Help Me', sans-serif;
    
      cursor: pointer;
      &:hover {
        color: var(--hover);
      }
    }
  }
</style>
