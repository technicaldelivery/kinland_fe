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
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return await sanityClient.fetch(pageRequest, { page: 'team' }).then(page => {
      console.log('TEAM_PAGE');
      console.log(page);
      return { page };
    });
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  }
}
</script>

<style lang="scss" scoped>
.team {
  // margin-top: calc(6 * var(--fm));
}
</style>