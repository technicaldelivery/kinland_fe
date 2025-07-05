<template>
  <div>
    <PageHeader
      title="Portfolio"
      description="Explore Kinland Studio's portfolio of high-end residential design and development projects. View our exclusive collection of bespoke interiors, architectural transformations, and luxury property developments across London and beyond. Each project showcases our expertise in spatial design, custom furnishings, and premium property management."
    />
    
    <!-- Filter Section -->
    <div class="portfolio-filters">
      <span class="portfolio-filters__label">Filter</span>
      <div class="portfolio-filters__buttons">
        <button 
          class="portfolio-filters__button"
          :class="{ 'portfolio-filters__button--active': selectedStatus === 'all' }"
          @click="selectedStatus = 'all'"
        >
          All
        </button>
        <button 
          class="portfolio-filters__button"
          :class="{ 'portfolio-filters__button--active': selectedStatus === 'completed' }"
          @click="selectedStatus = 'completed'"
        >
          Completed
        </button>
        <button 
          class="portfolio-filters__button"
          :class="{ 'portfolio-filters__button--active': selectedStatus === 'in-progress' }"
          @click="selectedStatus = 'in-progress'"
        >
          In Progress
        </button>
        <button 
          class="portfolio-filters__button"
          :class="{ 'portfolio-filters__button--active': selectedStatus === 'in-planning' }"
          @click="selectedStatus = 'in-planning'"
        >
          In Planning
        </button>
      </div>
    </div>

    <section class="portfolio-projects">
      <NuxtLink 
        v-for="project in filteredProjects"
        :to="`/portfolio/${project.slug}`" 
        :key="project._id"
        class="portfolio-project"
      >
        <SanityImage
          v-if="project.image"
          :image="project.image"
          :alternativeText="project.title"
          :forceRatio="'66.666%'"
        />
        <ProjectTextCard 
          v-else
          :project="project" 
          :background="true"
        />
        <div class="portfolio-project-text">
          <h2 class="title ts-l">{{ project.title }}</h2>
          <p class="standfirst ts-m">{{ project.standfirst }}</p>
        </div>
      </NuxtLink>
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
  data() {
    return {
      selectedStatus: 'all'
    }
  },
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
    filteredProjects() {
      if (this.selectedStatus === 'all') {
        // Order by status: completed, in-progress, in-planning
        return [...this.projects].sort((a, b) => {
          const order = { completed: 1, 'in-progress': 2, 'in-planning': 3 };
          return order[a.status.slug] - order[b.status.slug];
        });
      }
      return this.projects.filter(project => project.status && project.status.slug === this.selectedStatus);
    }
  },
}
</script>

<style lang="scss" scoped>
.portfolio-filters {
  margin: calc(2 * var(--fm)) var(--fm) 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  &__label {
    font-size: 0.675rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
  }

  &__button {
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: black;
    }

    &--active {
      background: black;
      color: white;
      border-color: black;
    }
  }

  @include phone {
    flex-direction: column;
    align-items: flex-start;
    margin: calc(2 * var(--fm)) 1rem 0;

    &__buttons {
      flex-wrap: wrap;
    }
  }
}

.portfolio-projects {
  margin: calc(4 * var(--fm)) var(--fm) calc(2 * var(--fm)) var(--fm);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: var(--fm);
  grid-row-gap: calc(2 * var(--fm));
  @include phone {
    padding: 0 1rem 3rem;
    grid-template-columns: 1fr;
  }
}

.portfolio-project {
  text-decoration: none;
  color: inherit;

  &-text {
    margin-top: 1rem;

    .title {
      color: inherit;
    }

    .standfirst {
      margin-top: 0.5rem;
      opacity: 0.8;
    }
  }
}
</style>