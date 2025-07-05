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
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { editorialArticlePageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ params, payload, $config }) {
    const sanityClient = createSanityClient($config);
    if (payload) {
      console.log('ARTICLE_PAGE (PAYLOAD)');
      console.log(payload.item);
      return { item: payload.item }
    } else {
      return await sanityClient.fetch(editorialArticlePageRequest, params).then(data => {
        console.log('ARTICLE_PAGE (REQUESTED)');
        console.log(data);
        return { item: data };
      });
    }
  },
  mounted() {
    if (!this.item) {
      this.$nuxt.error({ statusCode: 404, message: 'This page could not be found' });
    }
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
  }
}
</script>

<style lang="scss" scoped>
.editorial-article {
  // margin-top: calc(-3 * var(--fm));
  .editorial-article-title-card-wrapper {
    padding-top: calc(4 * var(--fm));
    background-color: var(--background-color, rgb(225, 225, 225));
    @include laptop-and-desktop {
      height: 100vh;
      overflow: hidden;
    }
  }
}
</style>