<template>
  <div>
    <PageWithStatementsLayout
      v-if="page.statements && page.statements.length"
      :statements="page.statements"
      :colorScheme="page.colorScheme"
    />
    <Footer 
      :contact="true"
      :fixed="true"
    />
  </div>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return await sanityClient.fetch(pageRequest, { page: 'studio' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  created() {
    console.log(this.page);
  }
}
</script>