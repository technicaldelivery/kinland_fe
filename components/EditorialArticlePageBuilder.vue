<template>
  <div class="page-builder-wrapper" :style="{ '--background-color': `${colorScheme}` }">
    <div class="page-builder">
      <template v-for="(block, index) in blocks">
        <EditorialArticlePageBuilderTextBlock
          v-if="block._type === 'textBlock'"
          :section="block"
          :key="block._key"
        />
        <EditorialArticlePageBuilderMediaBlock
          v-if="block._type === 'mediaBlock'"
          :section="block"
          :imageCaptions="imageCaptions"
          :key="block._key"
        />
      </template>
      <div class="page-builder-image-captions">
        <EditorialArticlePageBuilderImageCaption 
          v-for="(caption, index) in imageCaptions"
          :caption="caption"
          :index="index"
          :key="caption._key" 
        />
      </div>
      <div class="page-builder-end">
        <p class="small-caps">end</p>
      </div>
      <div class="page-builder-next-steps">
        <NuxtLink :to="`/journal`" class="page-builder-next-step header-link small-caps">
          back to journal
        </NuxtLink><NuxtLink v-if="checkNextArticle" :to="`/journal/${ checkNextArticle.slug }`" class="page-builder-next-step header-link small-caps">
          forward to {{ checkNextArticle.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array
    },
    title: {
      type: String
    },
    colorScheme: {
      type: String
    },
    fallbackAltText: {
      type: String
    },
    nextArticle: {
      type: Object
    },
    latestArticle: {
      type: Object
    },
  },
  computed: {
    imageCaptions() {
      let captions = [];
      this.blocks.forEach(block => {
        if (block._type === 'mediaBlock') {
          block.media.forEach(item => {
            if (item.body) {
              captions.push(item);
            }
          })
        }
      })
      return captions;
    },
    checkNextArticle() {
      if (this.nextArticle) {
        return {
          ...this.nextArticle,
          title: this.nextArticle.title.toLowerCase()
        }
      } else {
        return {
          ...this.latestArticle,
          title: this.latestArticle.title.toLowerCase()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.page-builder-wrapper {
  padding: 0 var(--fm);
  background-color: var(--background-color, rgba(225, 225, 225, 0.5));
  border-top: 1px solid rgba(0,0,0,0.25);
  .page-builder {
    width: 100%;
    @include text-width;
    margin: auto;
    padding: calc(4 * var(--fm)) 0 var(--fm) 0;
    .page-builder-image-captions {
      margin-top: calc(2 * var(--fm));
    }
    .page-builder-end {
      margin: calc(4 * var(--fm)) 0;
      text-align: center;
      p {
        @include typography-medium;
      }
    }
    .page-builder-next-steps {
      margin-top: calc(6 * var(--fm));
      text-align: center;
      .page-builder-next-step {
        display: inline-block;
        &:not(:last-child) {
          margin-right: var(--fm);
        }
      }
    }
  }
}

</style>
