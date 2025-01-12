<template>
  <section id="top" class="journal-editorial-articles-wrapper">
    <div class="journal-editorial-articles">
      <JournalEditorialArticle 
        v-for="(editorialArticle, index) in editorialArticles"
        :key="editorialArticle._id"
        :editorialArticle="editorialArticle"
        :index="index"
      />
    </div>
    <Footer :mailingListColor="'#FF910F'">
      <a href="#content" v-scroll-to="'#content'">
        back to top
      </a>
    </Footer>
  </section>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ store, $config }) {
    const sanityClient = createSanityClient($config);
    if (!store.state.sanity.editorialArticles) await store.dispatch('sanity/EDITORIALARTICLES_CALL', sanityClient);
    return await sanityClient.fetch(pageRequest, { page: 'journal' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  computed: {
    editorialArticles() {
      return this.$store.state.sanity.editorialArticles;
    },
  },
  created() {
    console.log(this.editorialArticles);
  }
}
</script>

<style lang="scss" scoped>

.journal-editorial-articles-wrapper {
  margin-top: calc(4 * var(--fm));
}

.journal-editorial-articles {
  margin: calc(4 * var(--fm));
  @include phone {
    margin: calc(4 * var(--fm)) var(--fm);
  }
}

.back-to-top {
  margin-bottom: var(--fm);
  text-align: center;
}

</style>