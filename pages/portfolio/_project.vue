<template>
  <div v-if="item" class="project">
    <!-- Lightbox -->
    <div v-if="lightboxImage" class="lightbox" @click="closeLightbox">
      <button class="lightbox__close" @click="closeLightbox">&times;</button>
      <div class="lightbox__content" @click.stop>
        <div class="lightbox__direct-image-container" v-if="lightboxImage && lightboxImage.asset">
          <div class="lightbox__loader" v-if="isLightboxLoading"></div>
          <img 
            :src="getLightboxImageUrl(lightboxImage)"
            :alt="item.title"
            class="lightbox__direct-image"
            @load="isLightboxLoading = false"
          />
        </div>
        <div v-else class="lightbox__error">No image data available</div>
      </div>
    </div>

    <div class="project__container">
      <!-- Left Column - Content -->
      <div class="project__content">
        <!-- Featured Image -->
        <div class="project__featured-image" @click="openLightbox(item.image)">
          <SanityImage
            v-if="item.image && item.image.asset"
            :image="item.image"
            :alternativeText="item.title"
            :forceRatio="'66.666%'"
          />
          <div v-else>No featured image available</div>
        </div>

        <!-- Project Description -->
        <div class="project__description">
          <PortableText
            v-if="item.body"
            :blocks="item.body"
            :className="`project__body`"
            :renderContainerOnSingleChild="true"
          />
        </div>

        <!-- Image Grid -->
        <div class="project__image-grid">
          <!-- Group portrait images in pairs -->
          <template v-for="(image, index) in groupedSlides">
            <!-- Portrait image pair container -->
            <div 
              v-if="image.type === 'portrait-pair'"
              :key="'pair-' + index"
              class="project__grid-item-pair"
            >
              <div 
                v-for="(portraitImg, pIndex) in image.images" 
                :key="portraitImg._key"
                class="project__grid-item project__grid-item--portrait"
                @click="openLightbox(portraitImg)"
              >
                <SanityImage
                  :image="portraitImg"
                  :alternativeText="item.title"
                  forceRatio="150%"
                />
              </div>
            </div>
            
            <!-- Single landscape image -->
            <div 
              v-if="image.type === 'landscape'"
              :key="image.image._key"
              class="project__grid-item project__grid-item--landscape"
              @click="openLightbox(image.image)"
            >
              <SanityImage
                :image="image.image"
                :alternativeText="item.title"
                forceRatio="66.666%"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Right Column - Meta -->
      <div class="project__meta">
        <div class="project__meta-content">
          <h1 class="project__title">{{ item.title }}</h1>
          
          <!-- Project Details -->
          <div class="project__details">
            <div 
              v-if="item.year && item.year.substring(0, 4)"
              class="project__detail"
            >
              <div class="label small-caps">year</div>
              <div class="value">{{ item.year.substring(0, 4) }}</div>
            </div>
            <div
              v-if="item.status && item.status.title"
              class="project__detail"
            >
              <div class="label small-caps">status</div>
              <div class="value">{{ item.status.title }}</div>
            </div>
            <div
              v-if="item.location"
              class="project__detail"
            >
              <div class="label small-caps">location</div>
              <div class="value">{{ item.location }}</div>
            </div>
            <div
              v-if="item.size"
              class="project__detail"
            >
              <div class="label small-caps">size</div>
              <div class="value">{{ item.size }}</div>
            </div>
          </div>

          <!-- Notice if exists -->
          <PortableText
            v-if="item.notice"
            :blocks="item.notice"
            :className="`notice`"
            :renderContainerOnSingleChild="true"
          />

          <!-- CTAs -->
          <div class="project__ctas">
            <button class="project__cta project__cta--enquire" @click="openEnquiryForm">
              Enquire Now
            </button>
            <NuxtLink 
              v-if="nextProject"
              :to="`/portfolio/${nextProject.slug}`" 
              class="project__cta project__cta--next"
            >
              Next Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enquiry Tray -->
    <EnquiryTray 
      :is-open="isEnquiryOpen"
      :project-context="item"
      @close="isEnquiryOpen = false"
    />

    <Footer />
  </div>
  <Dynamic404 v-else />
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { projectPageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";
import EnquiryTray from '~/components/EnquiryTray.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    EnquiryTray,
    Footer
  },
  async asyncData({ params, payload, store, $config }) {
    const sanityClient = createSanityClient($config);
    
    // Ensure projects are loaded in the store
    if (!store.state.sanity.projects) {
      await store.dispatch('sanity/PROJECTS_CALL', sanityClient);
    }

    // Get the current project data
    if (payload) return { item: payload.item }
    else return sanityClient.fetch(projectPageRequest, params).then(data => ({ item: data }))
  },
  data() {
    return {
      isEnquiryOpen: false,
      lightboxImage: null,
      isLightboxLoading: true
    }
  },
  head() {
    if (this.item) {
      const date = this.item._updatedAt;
      const { title, description, image } = this.item.seoMeta || {};
      return makeMeta({ title, description, image, date, fallback: this.$store.state.sanity.seoMeta });
    }
  },
  computed: {
    slides() {
      if (this.item.slides && this.item.slides.length) {
        return this.item.slides.reduce((acc, slide) => {
          if (slide.media) {
            const images = slide.media.filter(item => item._type === 'image');
            acc.push(...images);
          }
          return acc;
        }, []);
      }
      return [];
    },
    groupedSlides() {
      if (!this.slides || !this.slides.length) return [];
      
      const result = [];
      let portraitPair = [];
      
      // Group images appropriately
      this.slides.forEach(image => {
        if (this.isPortrait(image)) {
          // Add to portrait pair
          portraitPair.push(image);
          
          // When we have 2 portrait images, add them as a pair and reset
          if (portraitPair.length === 2) {
            result.push({
              type: 'portrait-pair',
              images: [...portraitPair]
            });
            portraitPair = [];
          }
        } else {
          // If we have a single portrait image waiting and now encounter a landscape,
          // add the single portrait first as its own pair
          if (portraitPair.length === 1) {
            result.push({
              type: 'portrait-pair',
              images: [...portraitPair]
            });
            portraitPair = [];
          }
          
          // Add landscape image individually
          result.push({
            type: 'landscape',
            image: image
          });
        }
      });
      
      // Add any remaining portrait images
      if (portraitPair.length > 0) {
        result.push({
          type: 'portrait-pair',
          images: [...portraitPair]
        });
      }
      
      return result;
    },
    nextProject() {
      const projects = this.$store.state.sanity.projects;
      
      // If no projects in store, try to get them
      if (!projects || !projects.length) {
        console.warn('No projects found in store');
        return null;
      }

      // Find current project index
      const currentIndex = projects.findIndex(p => p.slug === this.item.slug);
      console.log('Current project index:', currentIndex, 'Total projects:', projects.length);

      // If current project not found, return first project
      if (currentIndex === -1) {
        console.warn('Current project not found in projects');
        return projects[0];
      }

      // If it's the last project, loop to first, otherwise get next
      return currentIndex === projects.length - 1 
        ? projects[0] 
        : projects[currentIndex + 1];
    }
  },
  methods: {
    isPortrait(slide) {
      if (!slide || !slide.metadata || !slide.metadata.dimensions) return false;
      return slide.metadata.dimensions.height > slide.metadata.dimensions.width;
    },
    openEnquiryForm() {
      this.isEnquiryOpen = true;
    },
    getLightboxImageUrl(image) {
      if (!image || !image.asset) return '';
      
      const sanityClient = createSanityClient(this.$config);
      const imageUrlBuilder = require('@sanity/image-url');
      const builder = imageUrlBuilder(sanityClient);
      
      // Build a large high-quality version of the image
      return builder.image(image).width(2000).auto('format').quality(90).url();
    },
    openLightbox(image) {
      console.log('Opening lightbox with image:', image);
      if (!image || !image.asset) {
        console.warn('No valid image provided to lightbox');
        return;
      }
      // Reset loader state and store the image data for the lightbox
      this.isLightboxLoading = true;
      this.lightboxImage = image;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxImage = null;
      document.body.style.overflow = '';
    }
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  }
}
</script>

<style lang="scss" scoped>
.project {
  padding-top: var(--header-height, 80px);
  min-height: 100vh;

  &__container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    max-width: 2000px;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }

  &__content {
    padding-right: 2rem;

    @media (max-width: 1024px) {
      padding-right: 0;
    }
  }

  &__featured-image {
    margin-bottom: 2rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
    position: relative;
    
    &:hover {
      opacity: 0.9;
    }
    
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__description {
    margin-bottom: 3rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  &__image-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  &__grid-item-pair {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  &__grid-item {
    cursor: pointer;
    transition: opacity 0.3s ease;
    position: relative;

    &:hover {
      opacity: 0.9;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    // Portrait images in a 2-column grid
    &--portrait {
      width: 100%;
    }
    
    // Landscape images take full width
    &--landscape {
      width: 100%;
    }
  }

  &__meta {
    position: sticky;
    top: calc(var(--header-height, 80px) + 2rem);
    height: fit-content;
    padding: 2rem;
    background: #f8f8f8;

    @media (max-width: 1024px) {
      position: relative;
      top: 0;
    }
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: normal;
  }

  &__details {
    margin-bottom: 2rem;
  }

  &__detail {
    margin-bottom: 1rem;

    .label {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
      opacity: 0.6;
    }

    .value {
      font-size: 1rem;
    }
  }

  &__ctas {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }

  &__cta {
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    border: none;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    &--enquire {
      background: black;
      color: white;
    }

    &--next {
      background: white;
      color: black;
      border: 1px solid black;
      text-decoration: none;
    }
  }
}

.notice {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &__close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 1rem;
    z-index: 2001;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__content {
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__direct-image-container {
    width: auto;
    max-width: 90vw;
    max-height: 90vh;
  }
  
  &__direct-image {
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    display: block;
    object-fit: contain;
  }
  
  &__error {
    color: white;
    padding: 1rem;
    text-align: center;
  }
  
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: white;
      animation: loading 1.5s infinite ease;
    }
  }
  
  @keyframes loading {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
}
</style>