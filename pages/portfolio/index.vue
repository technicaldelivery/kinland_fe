<template>
  <div>
    <PageHeader
      :title="page.titleOverride || page.title"
      :description="page.description"
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
    return await sanityClient.fetch(pageRequest, { page: 'portfolio' }).then(page => {
      console.log('PORTFOLIO_PAGE');
      console.log(page);
      return { page };
    });
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  computed: {
    projects() {
      return this.$store.state.sanity.projects || [];
    },
    filteredProjects() {
      const statusOrder = { completed: 1, 'in-progress': 2, 'in-planning': 3 };
      const sort = (list) => [...list].sort((a, b) => {
        const aHasOrder = a.orderRank != null;
        const bHasOrder = b.orderRank != null;
        if (aHasOrder && bHasOrder) return a.orderRank - b.orderRank;
        if (aHasOrder) return -1;
        if (bHasOrder) return 1;
        return this.getStatusOrder(a.status, statusOrder) - this.getStatusOrder(b.status, statusOrder);
      });

      if (this.selectedStatus === 'all') {
        return sort(this.projects);
      }
      return sort(this.projects.filter(project => this.matchesStatus(project.status, this.selectedStatus)));
    }
  },
  methods: {
    // Convert title to slug format for fallback matching
    titleToSlug(title) {
      return title ? title.toLowerCase().replace(/\s+/g, '-') : null;
    },
    // Check if a project's status matches the selected filter
    matchesStatus(status, selectedStatus) {
      if (!status) return false;
      // First try matching by slug, then fall back to title
      const slug = status.slug || this.titleToSlug(status.title);
      return slug === selectedStatus;
    },
    // Get sort order for a status
    getStatusOrder(status, order) {
      if (!status) return 4;
      const slug = status.slug || this.titleToSlug(status.title);
      return slug ? (order[slug] || 4) : 4;
    }
  },
}
</script>

<style lang="scss" scoped>
.portfolio-filters {
  padding: 0 var(--fm) calc(2 * var(--fm));
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
    padding: 0.35rem 0.75rem;
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

    &__buttons {
      flex-wrap: wrap;
    }

  }
}

.portfolio-projects {
  padding: 0 var(--fm) calc(2 * var(--fm));
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: var(--fm);
  grid-row-gap: calc(2 * var(--fm));
  @include phone {
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