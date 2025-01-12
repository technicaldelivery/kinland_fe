<template>
  <div>
    <section class="portfolio-projects">
      <NuxtLink 
        v-for="project in projects.filter(project => project.status && project.status.slug === 'completed')"
        :to="`/portfolio/${project.slug}`" 
        :key="project._id"
        class="portfolio-project"
      >
        <SanityImage
          v-if="project.image"
          :image="project.image"
          :alt="project.title"
          :forceRatio="'66.666%'"
        />
        <ProjectTextCard 
          v-else
          :project="project" 
          :background="true"
        />
        <div class="portfolio-project-text">
          <h4 class="title ts-l">{{ project.title }}</h4>
          <p class="standfirst ts-m">{{ project.standfirst }}</p>
        </div>
      </NuxtLink>
      <div
        v-for="project in projects.filter(project => project.status && project.status.slug === 'in-progress')"
        :key="project._id"
        class="portfolio-project"
      >
        <SanityImage
          v-if="project.image"
          :image="project.image"
          :alt="project.title"
          :forceRatio="'66.666%'"
        />
        <ProjectTextCard 
          v-else
          :project="project" 
          :background="true"
        />
        <div class="portfolio-project-text">
          <h4 class="title ts-l">{{ project.title }}</h4>
          <p class="standfirst ts-m">{{ project.standfirst }}</p>
        </div>
      </div>
      <div
        v-for="project in projects.filter(project => project.status && project.status.slug === 'in-planning')"
        :key="project._id"
        class="portfolio-project"
      >
        <SanityImage
          v-if="project.image"
          :image="project.image"
          :alt="project.title"
          :forceRatio="'66.666%'"
        />
        <ProjectTextCard 
          v-else
          :project="project" 
          :background="true"
        />
        <div class="portfolio-project-text">
          <h4 class="title ts-l">{{ project.title }}</h4>
          <p class="standfirst ts-m">{{ project.standfirst }}</p>
        </div>
      </div>
    </section>
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
  async asyncData({ store, $config }) {
    const sanityClient = createSanityClient($config);
    if (!store.state.sanity.projects) await store.dispatch('sanity/PROJECTS_CALL', sanityClient);
    return await sanityClient.fetch(pageRequest, { page: 'portfolio' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  computed: {
    projects() {
      return this.$store.state.sanity.projects;
    },
  },
}
</script>

<style lang="scss" scoped>

.portfolio-projects {
  margin: calc(4 * var(--fm)) var(--fm) calc(2 * var(--fm)) var(--fm);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: var(--fm);
  grid-row-gap: calc(2 * var(--fm));
  @include phone {
    grid-template-columns: 1fr;
  }
  .portfolio-project {
    .portfolio-project-text {
      margin-top: var(--fm);
      .standfirst {
        margin-top: calc(0.5 * var(--fm));
      }
    }
  }
}



</style>