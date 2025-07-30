<template>
  <div>
    <PageHeader
      :title="page.titleOverride || page.title"
      :description="page.description"
    />
    <section class="journal-articles">
      <NuxtLink 
        v-for="article in editorialArticles"
        :to="`/journal/${article.slug}`" 
        :key="article._id"
        class="journal-article"
      >
        <SanityImage
          v-if="article.coverImages && article.coverImages.length"
          :image="article.coverImages[0]"
          :alternativeText="article.title"
          :forceRatio="'66.666%'"
        />
        <div v-else class="journal-article-placeholder"></div>
        <div class="journal-article-text">
          <h2 class="title ts-l">{{ article.title }}</h2>
          <p class="standfirst ts-m">{{ article.standfirst }}</p>
        </div>
      </NuxtLink>
    </section>
    <Footer />
  </div>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ store, $config }) {
    const sanityClient = createSanityClient($config);
    if (!store.state.sanity.editorialArticles) await store.dispatch('sanity/EDITORIALARTICLES_CALL', sanityClient);
    return await sanityClient.fetch(pageRequest, { page: 'journal' }).then(page => {
      console.log('JOURNAL_PAGE');
      console.log(page);
      return { page };
    });
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  computed: {
    editorialArticles() {
      return this.$store.state.sanity.editorialArticles;
    },
  }
}
</script>

<style lang="scss" scoped>
.journal-articles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: var(--fm);
  grid-row-gap: calc(2 * var(--fm));
  padding: 0 var(--fm) calc(2 * var(--fm));
  
  @include phone {
    grid-template-columns: 1fr;
  }
}

.journal-article {
  text-decoration: none;
  color: inherit;

  &-placeholder {
    width: 100%;
    padding-bottom: 66.666%;
    background: #f5f5f5;
  }

  &-text {
    margin-top: 1rem;

    .title {
      color: inherit;
    }

    .standfirst {
      margin-top: 0.5rem;
      opacity: 0.8;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>