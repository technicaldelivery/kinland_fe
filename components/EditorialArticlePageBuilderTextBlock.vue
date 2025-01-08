<template>
  <div class="text-block">
    <PortableText
      v-if="section.text"
      :blocks="section.text"
      :renderContainerOnSingleChild="true"
      :className="section.large ? 'standfirst' : 'body'"
    />
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.text-block {
  &:not(:last-child) {
    margin-bottom: calc(2 * var(--fm));
  }
  &.large {
    flex-basis: calc((100% - 11 * var(--fm)) * 9 / 12 + 8 * var(--fm));
    display: flex;
    justify-self: end;
    margin: calc(3 * var(--fm)) calc(0 * var(--fm));
    margin-left: auto;
  }
  &.medium {
    flex-basis: calc((100% - 11 * var(--fm)) * 5 / 12 + 4 * var(--fm));
    margin: calc(3 * var(--fm)) calc(0.5 * var(--fm));
  }
}
</style>