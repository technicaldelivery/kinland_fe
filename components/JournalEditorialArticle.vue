<template>
  <div 
    class="journal-editorial-article" 
    :class="{ hover }"
    :style="{ '--background-color': editorialArticle.colorScheme }"
  >
    <div 
      v-if="editorialArticle.coverImages.length && editorialArticle.coverImages[0]" 
      class="journal-editorial-article-image-wrapper"
    >
      <NuxtLink 
        :to="`/journal/${editorialArticle.slug}`" 
        class="journal-editorial-article-image"
        @mouseenter.native="handleMouseEnter"
        @mouseleave.native="handleMouseLeave"
      >
        <div class="image-wrapper-wrapper">
          <SanityImage
            :image="editorialArticle.coverImages.length && editorialArticle.coverImages[0]"
            :alternativeText="editorialArticle.title"
            class="image-wrapper-deep"
          />
        </div>
      </NuxtLink>
    </div>
    <div 
      class="journal-editorial-article-text-wrapper"
    >
      <NuxtLink
        :to="`/journal/${editorialArticle.slug}`" 
        class="journal-editorial-article-text"
        @mouseenter.native="handleMouseEnter"
        @mouseleave.native="handleMouseLeave"
      >
        <div>
          <h4 class="title ts-l">{{ editorialArticle.title }}</h4>
          <h6 class="subtitle small-caps">{{ editorialArticle.subtitle }}</h6>
          <p class="standfirst">{{ editorialArticle.standfirst }}</p>
        </div>
      </NuxtLink>
    </div>
    <div 
      v-if="editorialArticle.coverImages.length && editorialArticle.coverImages[1]" 
      class="journal-editorial-article-image-wrapper"
    >
      <NuxtLink 
        :to="`/journal/${editorialArticle.slug}`" 
        class="journal-editorial-article-image"
        @mouseenter.native="handleMouseEnter"
        @mouseleave.native="handleMouseLeave"
      >
        <div class="image-wrapper-wrapper">
          <SanityImage
            :image="editorialArticle.coverImages.length && editorialArticle.coverImages[1]"
            :alternativeText="editorialArticle.title"
            class="image-wrapper-deep"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['editorialArticle','index'],
  data() {
    return {
      hover: false,
    }
  },
  methods: {
    handleMouseEnter() {
      this.hover = true;
    },
    handleMouseLeave() {
      this.hover = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  .journal-editorial-article {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    &.hover {
      .journal-editorial-article-image-wrapper {

        // opacity: 0.5;
      }
      .journal-editorial-article-image {
        // mix-blend-mode: soft-light;
        .image-wrapper-wrapper {
          
          .image-wrapper  {
            // mix-blend-mode: lighten;
            transition: opacity 0.333s ease;
            opacity: 0.5;
            // filter: grayscale(1);
            // filter: contrast(20);
            // filter: brightness(1.25);
          }
        }
      }
      .journal-editorial-article-text-wrapper {
        .journal-editorial-article-text {
          background-color: var(--background-color, rgb(225, 225, 225));
        }
      }
    }
    .journal-editorial-article-image-wrapper, .journal-editorial-article-text-wrapper {
      width: 50%;
      padding: calc(6 * var(--fm));
      @include phone {
        width: 100%;
        padding: 0;
      }
    }
    .journal-editorial-article-image-wrapper {
      order: 2;
      transition: opacity 0.333s ease;
      &:last-child {
        order: 4;
      }
      .image-wrapper-wrapper {
        background-color: var(--background-color, rgb(225, 225, 225));
        .image-wrapper {
          transition: opacity 0.333s ease;
          opacity: 1;
        }
      }
    }
    .journal-editorial-article-text-wrapper {
      order: 3;
      display: flex;
      &:last-child {
        order: 1;
      }
      @include laptop-and-desktop {
        // padding-top: 37.5%;
        transform: translateY(calc(3 * var(--fm)));
      }
      @include phone {
        padding: calc(4 * var(--fm)) calc(3 * var(--fm));
      }
      .journal-editorial-article-text {
        align-self: flex-end;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--fm);
        aspect-ratio: 1.5;
        background-color: rgb(225, 225, 225);
        transition: background-color 0.333s ease;
        @include typography-medium;
        .subtitle {
          margin-top: calc(0.5 * var(--fm));
        }
        .standfirst {
          margin-top: calc(0.5 * var(--fm));
        }
      }
    }
  }
</style>