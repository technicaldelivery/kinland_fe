<template>
  <div>
    <PageHeader
      :title="page.titleOverride || page.title"
      :description="page.description"
    />

    <!-- Main content banner -->
    <div class="lifestyle-banner">
      <SanityImage
        v-if="page.featuredImage"
        :image="page.featuredImage"
        :alt="page.title || 'Development Management'"
        :forceRatio="'50%'"
      />
      <div v-else class="lifestyle-banner-placeholder"></div>
    </div>

    <!-- Services Overview -->
    <div class="about-section">
      <h2 class="about-heading"> {{ page.services.text[0].children[0].text }} </h2>
      
      <div class="services-grid" v-if="page.services && page.services.items">
        <div 
          v-for="service in page.services.items" 
          :key="service._key"
          class="service-column"
        >
          <h3>{{ service.text.toUpperCase() }}</h3>
          <p>{{ service.blurb }}</p>
        </div>
      </div>
    </div>

    <!-- Second content banner -->
    <div class="lifestyle-banner">
      <SanityImage
        v-if="page.services && page.services.image"
        :image="page.services.image"
        :alt="'Kinland development process'"
        :forceRatio="'50%'"
      />
      <div v-else class="lifestyle-banner-placeholder"></div>
    </div>

    <!-- Enquiry Section -->
    <div class="enquiry-section">
      <div class="enquiry-section__left">
        <h2>{{ siteSettings.enquiryDescription[0].children[0].text }}</h2>
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

    <Footer 
      :contact="false"
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
      enquiryForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        enquiryType: '',
        consent: false
      }
    };
  },
  async asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return await sanityClient.fetch(pageRequest, { page: 'studio' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  computed: {
    siteSettings() {
      return this.$store.state.sanity.siteSettings;
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
/* Hero container styling */
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

/* About section styling */
.about-section {
  padding: calc(2 * var(--fm)) var(--fm);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: calc(2 * var(--fm));
  
  .about-heading {
    max-width: 80%;
    font-family: 'ABC Marist', serif;
    font-size: 1.75rem;
    line-height: 1.3;
    font-weight: normal;
    margin-bottom: 3rem;
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @include phone {
      grid-template-columns: 1fr;
    }
  }
  
  .about-column {
    h3 {
      font-size: 0.675rem;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
      opacity: 0.6;
    }
    
    p {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}

/* Services grid styling */
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @include phone {
    grid-template-columns: 1fr;
  }
  
  .service-column {
    h3 {
      font-size: 0.675rem;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
      opacity: 0.6;
    }
    
    p {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}

/* Statements section styling */
.statements-section {
  padding: calc(2 * var(--fm)) var(--fm);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @include phone {
    grid-template-columns: 1fr;
  }
  
  .statement-item {
    h3 {
      font-size: 0.675rem;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
      opacity: 0.6;
    }
    
    .statement-body {
      font-size: 1rem;
      line-height: 1.5;
      
      p {
        margin: 0;
      }
    }
  }
}

/* Enquiry section styling */
.enquiry-section {
  padding: calc(2 * var(--fm)) var(--fm);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @include phone {
    grid-template-columns: 1fr;
  }
  
  &__left {
    h2 {
      font-family: 'ABC Marist', serif;
      font-size: 1.5rem;
      line-height: 1.3;
      font-weight: normal;
    }
  }
  
  &__right {
    .enquiry-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        
        @include phone {
          grid-template-columns: 1fr;
        }
      }
      
      input, textarea, select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        font-family: inherit;
        font-size: 0.9rem;
        border-radius: 0;
        background: transparent;
        
        &:focus {
          outline: none;
          border-color: black;
        }
      }
      
      textarea {
        resize: vertical;
        min-height: 120px;
      }
      
      .consent-checkbox {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        
        input {
          width: auto;
          margin-top: 0.25rem;
        }
        
        label {
          font-size: 0.8rem;
          line-height: 1.3;
        }
      }
      
      button {
        background: black;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-family: inherit;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        cursor: pointer;
        transition: opacity 0.3s ease;
        align-self: flex-start;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>