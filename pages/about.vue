<template>
  <div>
    <PageWithStatementsLayout
      v-if="page.statements && page.statements.length"
      :statements="page.statements"
      :colorScheme="page.colorScheme"
      :opposite="true"
    />
    <Footer 
      :contact="true"
      :fixed="true"
    />
  </div>
</template>

<script>
import sanity from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData() {
    return await sanity.fetch(pageRequest, { page: 'about' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seo || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seo });
  },
  created() {
    console.log(this.page);
  }
}
</script>