<template>
  <div class="privacy-policy">
    <div class="container">
      <h1>{{ page.title }}</h1>

      <BlockContent
        v-if="page && page.privacyPolicy"
        :blocks="page.privacyPolicy"
      />

      <p style="margin-top: 2rem;"><em>Last updated: {{ formatDate(page._updatedAt) }}</em></p>
    </div>

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
    return await sanityClient.fetch(pageRequest, { page: 'privacy-policy' }).then(page => {
      console.log('PRIVACY_PAGE');
      console.log(page);
      return { page };
    });
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  }
}
</script>

<style scoped>
.privacy-policy {
  padding: 6rem 0 2rem;
  min-height: 60vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

* + h2 {
  padding-top: 1rem;
}

p, ul, ol {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
}

p + ul {
  margin-top: -0.7rem;
}

ul {
  list-style: disc;
  padding-left: 25px;
}

ul > li {
  padding-left: 5px;
}

ol {
  list-style: decimal;
  padding-left: 35px;
}

li {
  margin-bottom: 0.5rem;
  list-style: inherit;
}

em {
  color: #999;
  font-size: 0.9rem;
}
</style>
