<template>
  <div>
    <transition name="fade">
      <div v-if="isOpen" class="enquiry-tray__overlay" @click="$emit('close')"></div>
    </transition>
    <transition name="slide">
      <div v-if="isOpen" class="enquiry-tray__content">
        <button class="enquiry-tray__close" @click="$emit('close')">&times;</button>
        
        <div class="enquiry-tray__header">
          <h2 class="enquiry-tray__title">Make an Enquiry</h2>
          <p class="enquiry-tray__description">{{ siteSettings.enquiryDescription[0].children[0].text }}</p>
        </div>

        <form class="enquiry-tray__form" @submit.prevent="handleSubmit">
          <div class="enquiry-tray__form-group">
            <input 
              type="text" 
              v-model="form.firstName"
              placeholder="First Name"
              required
              class="enquiry-tray__input"
            />
          </div>

          <div class="enquiry-tray__form-group">
            <input 
              type="text" 
              v-model="form.lastName"
              placeholder="Last Name"
              required
              class="enquiry-tray__input"
            />
          </div>

          <div class="enquiry-tray__form-group">
            <input 
              type="email" 
              v-model="form.email"
              placeholder="Email"
              required
              class="enquiry-tray__input"
            />
          </div>

          <div class="enquiry-tray__form-group">
            <input 
              type="tel" 
              v-model="form.phone"
              placeholder="Phone"
              class="enquiry-tray__input"
            />
          </div>

          <div class="enquiry-tray__form-group">
            <textarea 
              v-model="form.message"
              placeholder="Message"
              required
              class="enquiry-tray__input enquiry-tray__textarea"
            ></textarea>
          </div>

          <div class="enquiry-tray__form-group">
            <select 
              v-model="form.enquiryType"
              required
              class="enquiry-tray__input enquiry-tray__select"
            >
              <option value="" disabled selected>Enquiry Type</option>
              <option value="Project">Project Enquiry</option>
              <option value="General">General Enquiry</option>
              <option value="Collaboration">Collaboration</option>
            </select>
          </div>

          

          <div class="enquiry-tray__form-group enquiry-tray__consent">
            <label class="enquiry-tray__checkbox">
              <input 
                type="checkbox" 
                v-model="form.consent"
                required
              />
              <span>I consent to Kinland using my information to contact me about their services</span>
            </label>
          </div>

          <button type="submit" class="enquiry-tray__submit">Send Enquiry</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'EnquiryTray',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    projectContext: {
      type: Object,
      default: null
    }
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
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        if (this.projectContext) {
          this.form.message = `I'm interested in the ${this.projectContext.title} project.`;
          this.form.enquiryType = 'project';
        }
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  computed: {
    siteSettings() {
      return this.$store.state.sanity.siteSettings;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // TODO: Implement form submission logic
        console.log('Form submitted:', this.form);

        await fetch('/.netlify/functions/submission', {
          method: 'POST',
          body: JSON.stringify(this.form),
        }).then((data) => {
          console.log('Form submission response:', data);
        });

        this.$emit('close');

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
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  }
}
</script>

<style lang="scss" scoped>
.enquiry-tray {
  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 999;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    height: 100%;
    background: #B8D6EC;
    padding: 2rem;
    overflow-y: auto;
    z-index: 1000;
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: normal;
    font-family: 'ABC Marist', serif;
    font-weight: 400;
    font-style: normal;
  }

  &__description {
    font-size: 0.75rem;
    line-height: 1.6;
    opacity: 0.8;
    font-family: 'ABC Marist', serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.01em;
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
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style> 