<template>
  <section class="featured-logos">
    <div class="featured-logos__container">
      <h2 class="featured-logos__title">{{ title }}</h2>
      <div class="featured-logos__grid">
        <div 
          v-if="logo"
          v-for="(logo, index) in logos"
          :key="index"
          class="featured-logos__item"
        >
          <img
            v-if="logo.asset"
            :src="getImageUrl(logo.asset)"
            :alt="logo.alternativeText"
            class="featured-logos__image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturedLogos',
  props: {
    featuredLogos: {}
  },
  computed: {
    title() {
      return this.featuredLogos?.title || ''
    },
    logos() {
      return this.featuredLogos?.brands || []
    }
  },
  methods: {
    getImageUrl(asset) {
      if (!asset) return '';
      const { createSanityClient } = require("~/sanity.js");
      const imageUrlBuilder = require("@sanity/image-url");
      const sanityClient = createSanityClient(this.$config);
      const builder = imageUrlBuilder(sanityClient);
      const url = builder.image(asset).width(800).format('webp').url();
      return url;
    }
  }
}
</script>

<style lang="scss" scoped>
.featured-logos {
  width: 100%;
  padding: 0 calc(4.5 * var(--fm)) calc(4.5 * var(--fm));
  margin-bottom: calc(4 * var(--fm));
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  &__title {
    font-family: 'ABC Marist', serif;
    margin-bottom: calc(3 * var(--fm));
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    transition: opacity 0.3s ease;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--fm) calc(4 * var(--fm));
    align-items: center;
    justify-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70px;
    transition: opacity 0.3s ease;
    width: 100%;
  }
  
  &__image {
    max-width: 100%;
    width: auto;
    max-height: 32px;
    object-fit: contain;
    filter: opacity(45%);
    transition: filter 0.3s ease;
  }
  
  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2px;
  }
}
</style>