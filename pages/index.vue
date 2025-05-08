<template>
  <section>
    <!-- Hero Banner Splash Container -->
    <div class="hero-container">
      <HoldingPageSplash
        :splash="holdingPage.splash"
        :showSplashLogo="showSplashLogo"
        @splashClick="handleSplashClick"
        @play="handleSplashPlay"
      />
    </div>

    <!-- Project Portfolio Section -->
    <div class="section-heading">
      <h2>Creating places that seamlessly integrate lifestyle, urban living, and design</h2>
      <NuxtLink to="/portfolio" class="view-all-link">VIEW ALL PROJECTS</NuxtLink>
    </div>

    <!-- Project Grid -->
    <section class="portfolio-grid">
      <NuxtLink 
        v-for="project in featuredProjects"
        :to="`/portfolio/${project.slug}`" 
        :key="project._id"
        class="portfolio-item"
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
        <div class="section-portfolio-project-text">
          <h3 class="title ts-l">{{ project.title }}</h3>
          <p class="standfirst ts-m">{{ project.standfirst }}</p>
        </div>
      </NuxtLink>
    </section>

    <!-- Lifestyle Banner Image -->
    <div class="lifestyle-banner">
      <SanityImage
        v-if="holdingPage.lifestyleBanner"
        :image="holdingPage.lifestyleBanner"
        :alt="'Kinland lifestyle'"
        :forceRatio="'50%'"
      />
      <!-- Placeholder when no image is available -->
      <div v-else class="lifestyle-banner-placeholder">
        
      </div>
    </div>

    <!-- About Us Section -->
    <div class="about-section">
      <h2 class="about-heading">Through thoughtfully curated details, our projects offer an emotionally resonant take on the house and home that nurtures a relationship with place.</h2>
      
      <div class="about-content">
        <div class="about-column">
          <h3>OUR STORY</h3>
          <p>The contrast in our work is in better our built environment through social engagement and slow, responsible design.</p>
        </div>
        <div class="about-column">
          <h3>GIVING BACK</h3>
          <p>In addition to promoting slow and responsible design, we work with charities and actively support our communities through design that prioritizes fragile ecosystems.</p>
        </div>
      </div>
    </div>

    <!-- Second Lifestyle Banner -->
    <div class="lifestyle-banner">
      <SanityImage
        v-if="holdingPage.secondLifestyleBanner"
        :image="holdingPage.secondLifestyleBanner"
        :alt="'Kinland interior design'"
        :forceRatio="'50%'"
      />
      <!-- Placeholder when no image is available -->
      <div v-else class="lifestyle-banner-placeholder lifestyle-banner-placeholder--second">
      </div>
    </div>

    <!-- Enquiry Section -->
    <div class="enquiry-section">
      <div class="enquiry-section__left">
        <h2>Have a project in mind? Get in touch to discuss your requirements. Our team specializes in bespoke design consultancy and development management for residential properties across London.</h2>
      </div>
      
      <div class="enquiry-section__right">
        <form class="enquiry-form" @submit.prevent="handleEnquirySubmit">
          <div class="form-row">
            <input type="text" v-model="enquiryForm.firstName" placeholder="First Name" required>
            <input type="text" v-model="enquiryForm.lastName" placeholder="Last Name" required>
          </div>
          <div class="form-row">
            <input type="email" v-model="enquiryForm.email" placeholder="Email" required>
            <input type="tel" v-model="enquiryForm.phone" placeholder="Phone">
          </div>
          <textarea v-model="enquiryForm.message" placeholder="Message" required></textarea>
          <select v-model="enquiryForm.enquiryType" required>
            <option value="" disabled selected>Enquiry Type</option>
            <option value="project">Project Enquiry</option>
            <option value="general">General Enquiry</option>
            <option value="collaboration">Collaboration</option>
          </select>
          <div class="consent-checkbox">
            <input type="checkbox" id="consent" v-model="enquiryForm.consent" required>
            <label for="consent">I consent to Kinland using my information to contact me about their services</label>
          </div>
          <button type="submit">Send Enquiry</button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </section>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { holdingPageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";
import { mapMutations } from 'vuex';

export default {
  asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return sanityClient.fetch(holdingPageRequest).then(holdingPage => ({ holdingPage }));
  },
  data() {
    return {
      showSplashLogo: false,
      timeout: null,
      enquiryForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        enquiryType: '',
        consent: false
      }
    }
  },
  computed: {
    featuredProjects() {
      if (!this.$store.state.sanity.projects) return [];
      
      // Sort projects by status priority: completed, in-progress, in-planning
      return [...this.$store.state.sanity.projects]
        .sort((a, b) => {
          const order = { completed: 1, 'in-progress': 2, 'in-planning': 3 };
          return (a.status && b.status) ? 
            (order[a.status.slug] - order[b.status.slug]) : 0;
        })
        .slice(0, 3); // Only return the top 3 projects
    }
  },
  methods: {
    handleSplashClick() {
      if (this.timeout) clearTimeout(this.timeout);
      this.splash = false;
      this.showSplashLogo = true;
    },
    handleSplashPlay() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showSplashLogo = true;
      }, 5000)
    },
    async handleEnquirySubmit() {
      try {
        // TODO: Implement form submission logic
        console.log('Enquiry form submitted:', this.enquiryForm);
        // Reset form after submission
        this.enquiryForm = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          enquiryType: '',
          consent: false
        };
        // Show success message
        alert('Thank you for your enquiry. We will be in touch shortly.');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your enquiry. Please try again.');
      }
    }
  },
  async fetch() {
    const sanityClient = createSanityClient(this.$config);
    if (!this.$store.state.sanity.projects) {
      await this.$store.dispatch('sanity/PROJECTS_CALL', sanityClient);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  overflow: hidden;
}

/* Hero container to fix splash overlap */
.hero-container {
  position: relative;
  height: 100vh; /* Full viewport height for hero */
  width: 100%;
  pointer-events: all;
  overflow: hidden;
  margin-bottom: 2rem;
}

.section-heading {
  padding: calc(2 * var(--fm)) var(--fm);
  width: 45%;
  // display: flex;
  // justify-content: space-between;
  // align-items: flex-end;
  
  h2 {
    max-width: 70%;
    font-family: 'ABC Marist', serif;
    font-size: 1.75rem;
    line-height: 1.3;
    font-weight: normal;
    margin-bottom: 0.6em;
  }
  
  .view-all-link {
    text-decoration: none;
    color: inherit;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid currentColor;
    padding-bottom: 2px;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--fm);
  padding: 0 var(--fm) calc(4 * var(--fm));
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  .portfolio-item {
    text-decoration: none;
    color: inherit;
  }

  .section-portfolio-project-text {
    padding-top: 1em;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.25em;
    }

    p {
      font-size: 0.9rem;
    }
  }

}

.lifestyle-banner {
  width: 100%;
  margin-bottom: calc(4 * var(--fm));
  
  &-placeholder {
    width: 100%;
    height: 90vh;
    background-color: #f3efe9; /* Warm, neutral background matching the brand aesthetic */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%),
                  linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%);
      background-size: 60px 60px;
      background-position: 0 0, 30px 30px;
      opacity: 0.5;
    }
    
    &--second {
      background-color: #e9e4df; /* Slightly different shade for the second banner */
    }
    
    .placeholder-text {
      font-family: 'ABC Marist', serif;
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.8);
      text-align: center;
      max-width: 80%;
      position: relative;
      z-index: 2;
      padding: 2rem;
    }
  }
}

.about-section {
  padding: 0 var(--fm) calc(4 * var(--fm));
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: calc(2 * var(--fm));
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  .about-heading {
    font-family: 'ABC Marist', serif;
    font-size: 1.75rem;
    line-height: 1.3;
    font-weight: normal;
    // margin-bottom: calc(2 * var(--fm));
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(2 * var(--fm));
    grid-column: 2;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-column: 1;
    }
    
    .about-column {
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      height: 250px;
      display: flex;
      flex-direction: column;
      
      h3 {
        font-size: 1rem;
        font-weight: normal;
        margin-bottom: 1rem;
      }
      
      p {
        font-family: 'ABC Marist', serif;
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }
}

.enquiry-section {
  padding: 0 var(--fm) calc(4 * var(--fm));
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(3 * var(--fm));
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: calc(2 * var(--fm));
  }
  
  &__left {
    padding-right: 2rem;
    
    @media (max-width: 1024px) {
      padding-right: 0;
    }
    
    h2 {
      font-family: 'ABC Marist', serif;
      font-size: 1.5rem;
      line-height: 1.3;
      font-weight: normal;
      margin-bottom: calc(2 * var(--fm));
    }
  }
  
  &__right {
    width: 100%;
  }
  
  .enquiry-form {
    width: 100%;
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    
    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-family: 'ABC Marist', serif;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      
      &:focus {
        outline: none;
        border-color: black;
      }
    }
    
    textarea {
      min-height: 150px;
      resize: vertical;
    }
    
    .consent-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      
      input {
        width: auto;
        margin-top: 0.3rem;
      }
      
      label {
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
    
    button {
      background: black;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: #333;
      }
    }
  }
}
</style>