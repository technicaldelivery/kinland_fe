<template>
  <section class="featured-logos">
    <div class="featured-logos__container">
      <h2 class="featured-logos__title">{{ title }}</h2>
      <div class="featured-logos__grid">
        <div 
          v-for="(logo, index) in logos"
          :key="logo._id || index"
          class="featured-logos__item"
        >
          <SanityImage
            v-if="logo.image && logo.image.asset"
            :image="logo.image"
            :alternativeText="logo.name || `Logo ${index + 1}`"
            class="featured-logos__image"
          />
          <img
            v-else-if="logo.image"
            :src="logo.image"
            :alt="logo.name || `Logo ${index + 1}`"
            class="featured-logos__image"
          />
          <div v-else class="featured-logos__placeholder">
            {{ logo.name || `Logo ${index + 1}` }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturedLogos',
  props: {
    title: {
      type: String,
      default: 'As featured in'
    },
    logos: {
      type: Array,
      default: () => [
        {
          name: 'Architectural Digest',
          image: require('~/assets/featured-logos/architectural-digest.svg')
        },
        {
          name: 'Country & Town House',
          image: require('~/assets/featured-logos/country-town-house.svg')
        },
        {
          name: 'Financial Times',
          image: require('~/assets/featured-logos/financial-times.svg')
        },
        {
          name: 'Home Journal',
          image: require('~/assets/featured-logos/home-journal.png')
        },
        {
          name: 'House Beautiful',
          image: require('~/assets/featured-logos/house-beautiful.svg')
        },
        {
          name: 'Mason Global',
          image: require('~/assets/featured-logos/mason-global.png')
        },
        {
          name: 'PrimeResi',
          image: require('~/assets/featured-logos/prime-resi.svg')
        },
        {
          name: 'Sheerluxe',
          image: require('~/assets/featured-logos/sheerluxe.svg')
        },
        {
          name: 'The Spaces',
          image: require('~/assets/featured-logos/the-spaces.svg')
        },
        {
          name: 'The Standard',
          image: require('~/assets/featured-logos/the-standard.png')
        },
        {
          name: 'The Times',
          image: require('~/assets/featured-logos/the-times.webp')
        },
        {
          name: 'Wallpaper',
          image: require('~/assets/featured-logos/wallpaper.svg')
        },
      ]
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
  }
  
  &__image {
    max-width: 100%;
    width: auto;
    height: 32px;
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