<template>
  <BlockContent
    v-if="blocks"
    :blocks="blocks"
    :className="className ? className :'text'"
    :renderContainerOnSingleChild="true"
    :serializers="serializers"
  />
</template>

<script>
import PortableTextExternalLink from '~/components/PortableTextExternalLink.vue';
export default {
  props: ['blocks', 'className'],
  data() {
    return {
      serializers: {
        marks: {
          link: PortableTextExternalLink
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text {
    text-align: center;
  }

  .body, .text, .event {
    @include typography-medium;
  }
  
  .body, .text, .event, .notice {
    p, iframe, blockquote {
      white-space: inherit;
      overflow: inherit;
      text-overflow: inherit;
      &:not(:first-child) {
        text-indent: calc(1.5 * var(--fm));
      }
      // &:not(:last-child) {
      //   margin-top: 0;
      //   margin-bottom: var(--fm);
      // }
    }
    :not(iframe) {
      @include text-width;
    }
    blockquote {
      padding-left: calc(1.5*var(--fm));
    }
  }

  .caption {
    margin-bottom: calc(-1 * var(--fm));
    p {
      padding-bottom: var(--fm);
    }
  }
</style>