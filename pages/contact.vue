<template>
  <div class="page">
    <div class="contact">
      <!-- Left Column -->
      <div class="contact__info">
        <h1 class="contact__title">Contact Us</h1>
        <p class="contact__description">
          Have a project in mind? Get in touch to discuss your requirements. Our team specializes in bespoke design consultancy and development management for residential properties across London.
        </p>

        <div class="contact__section">
          <h2 class="contact__section-title">Office Address</h2>
          <p class="contact__address">Nexus House DA14 5DA</p>
        </div>

        <div class="contact__section">
          <h2 class="contact__section-title">Social</h2>
          <div class="contact__social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="contact__social-link">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="contact__social-link">LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="contact__form-container">
        <form class="contact__form" @submit.prevent="handleSubmit">
          <div class="contact__form-group">
            <input 
              type="text" 
              v-model="form.firstName"
              placeholder="First Name"
              required
              class="contact__input"
            />
          </div>

          <div class="contact__form-group">
            <input 
              type="text" 
              v-model="form.lastName"
              placeholder="Last Name"
              required
              class="contact__input"
            />
          </div>

          <div class="contact__form-group">
            <input 
              type="email" 
              v-model="form.email"
              placeholder="Email"
              required
              class="contact__input"
            />
          </div>

          <div class="contact__form-group">
            <input 
              type="tel" 
              v-model="form.phone"
              placeholder="Phone"
              class="contact__input"
            />
          </div>

          <div class="contact__form-group">
            <select 
              v-model="form.enquiryType"
              required
              class="contact__input contact__select"
            >
              <option value="" disabled selected>Enquiry Type</option>
              <option value="Project">Project Enquiry</option>
              <option value="General">General Enquiry</option>
              <option value="Collaboration">Collaboration</option>
            </select>
          </div>

          <div class="contact__form-group">
            <textarea 
              v-model="form.message"
              placeholder="Message"
              required
              class="contact__input contact__textarea"
            ></textarea>
          </div>

          <div class="contact__form-group contact__consent">
            <label class="contact__checkbox">
              <input 
                type="checkbox" 
                v-model="form.consent"
                required
              />
              <span>I consent to Kinland using my information to contact me about their services</span>
            </label>
          </div>

          <button type="submit" class="contact__submit">Send Enquiry</button>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Footer
  },
  data() {
    return {
      form: {
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
  async asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return await sanityClient.fetch(pageRequest, { page: 'contact' }).then(page => ({ page }));
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  },
  methods: {
    async handleSubmit() {
      try {
        // TODO: Implement form submission logic
        console.log('Form submitted:', this.form);
        // Reset form
        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          enquiryType: '',
          consent: false
        };
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: #B8D6EC;
  min-height: 100vh;
}

.contact {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 6rem 1rem 2rem;
  gap: 1rem;
  margin: 0 auto;

  &__info {
    padding-top: 2rem;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: normal;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 4rem;
  }

  &__section {
    margin-bottom: 2rem;
  }

  &__section-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }

  &__address {
    font-size: 1rem;
  }

  &__social {
    display: flex;
    gap: 2rem;
  }

  &__social-link {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;

    &:hover {
      opacity: 0.6;
    }
  }

  &__form-container {
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__form-group {
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 0.625rem;
    background: transparent;
    border: 1px solid rgba(0, 0, 0);
    font-size: 0.8125rem;
    transition: border-color 0.3s ease;
    font-family: 'ABC Marist', serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.01em;
    font-variant-numeric: oldstyle-nums;

    &:focus {
      outline: none;
      border-color: black;
    }

    &::placeholder {
      font-family: 'ABC Marist', serif;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__textarea {
    min-height: 100px;
    resize: vertical;
    position: relative;
    left: 0;
  }

  &__select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    font-family: 'ABC Marist', serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.01em;
    font-variant-numeric: oldstyle-nums;

    option {
      font-family: 'ABC Marist', serif;
      font-weight: 400;
    }
  }

  &__consent {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  &__checkbox {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    cursor: pointer;

    input {
      margin-top: 0.25rem;
    }
  }

  &__submit {
    background: black;
    color: white;
    border: none;
    padding: 0.75rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: opacity 0.3s ease;
    margin-top: 0.5rem;
    font-family: 'ABC Marist', serif;
    font-weight: 400;
    font-style: normal;

    &:hover {
      opacity: 0.8;
    }
  }

  .credits {
    font-size: 0.75em;
    transform: translateY(0.25em);
    p {
      margin: 0 calc(0.5 * var(--fm));
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 4rem 1rem 1rem;

    &__form-container {
    }

    &__description {
      max-width: none;
    }
  }
}
</style>