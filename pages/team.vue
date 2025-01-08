<template>
  <div class="team">
    <TeamMembers
      v-if="page.teamMembers && page.teamMembers.length"
      :teamMembers="page.teamMembers"
    />
    <Footer 
      :mailingListColor="'#FF910F'"
      :contact="true"
    />
  </div>
</template>

<script>
import sanity from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData() {
    return await sanity.fetch(pageRequest, { page: 'team' }).then(page => ({ page }));
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

<style lang="scss" scoped>
.team {
  // margin-top: calc(6 * var(--fm));
}
</style>