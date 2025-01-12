<template>
  <div>
    <PageWithStatementsLayout
      v-if="page.statements && page.statements.length"
      :statements="page.statements"
      :colorScheme="page.colorScheme"
      :opposite="true"
    />
    <Footer 
      :fixed="true"
    >
      <div class="credits"><p>website design <a href="https://www.2xelliott.co.uk/" target="_blank" class="header-link">two times elliott</a></p><p>development <a href="https://www.simonrogers.info/" target="_blank" class="header-link">simon rogers</a></p></div>
    </Footer>
  </div>
</template>

<script>
import sanity from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData() {
    return await sanity.fetch(pageRequest, { page: 'contact' }).then(page => ({ page }));
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

<style lang="scss" scoped>
.credits {
  font-size: 0.75em;
  transform: translateY(0.25em);
  p {
    margin: 0 calc(0.5 * var(--fm));
  }
}
</style>