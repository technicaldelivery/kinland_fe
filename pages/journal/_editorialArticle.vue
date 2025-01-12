<template>
  <div v-if="item" class="editorial-article">
    <portal to="subnavigation">{{ titleToLowercase() }}</portal>
    <section>
      <EditorialArticleTitleCard
        v-if="item"
        :item="item"
      />
      <EditorialArticlePageBuilder
        v-if="item"
        :blocks="item.articleContent"
        :title="item.title"
        :colorScheme="item.colorScheme"
        :nextArticle="item.nextArticle"
        :latestArticle="item.latestArticle"
      />
    </section>
  </div>
  <Dynamic404 v-else />
</template>

<script>
import sanity from "~/sanity.js";
import { editorialArticlePageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  asyncData({ params, payload }) {
    if (payload) return { item: payload.item }
    else return sanity.fetch(editorialArticlePageRequest, params).then(data => ({ item: data }))
  },
  head() {
    if (this.item) {
      const date = this.item._updatedAt;
      const { title, description, image } = this.item.seoMeta || {};
      return makeMeta({ title, description, image, date, fallback: this.$store.state.sanity.seoMeta });
    }
  },
  methods: {
    titleToLowercase() {
      return this.item && this.item.title.toLowerCase();
    }
  },
  created() {
    console.log(this.item);
  }
}
</script>

<style lang="scss" scoped>
.editorial-article {
  // margin-top: calc(-3 * var(--fm));
  .editorial-article-title-card-wrapper {
    padding-top: calc(3 * var(--fm));
    background-color: var(--background-color, rgb(225, 225, 225));
    @include laptop-and-desktop {
      height: 100vh;
      overflow: hidden;
    }
  }
}
</style>