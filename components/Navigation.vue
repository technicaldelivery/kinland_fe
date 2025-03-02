<template>
  <nav :class="[
    'navigation',
    { 'navigation--transparent': isTransparent },
    { 'navigation--white': isWhite }
  ]">
    <!-- Logo -->
    <nuxt-link to="/" class="navigation__logo">
      <IconKinland :color="isWhite ? 'white' : 'black'" />
    </nuxt-link>

    <!-- Right CTAs -->
    <div class="navigation__ctas">
      <button 
        class="navigation__button" 
        @click="toggleMenu"
        :aria-label="isMenuOpen ? 'Close Menu' : 'Open Menu'"
      >
        <span class="navigation__button-text">{{ isMenuOpen ? 'Close' : 'Menu' }}</span>
      </button>
      <nuxt-link to="/contact" class="navigation__button navigation__button--enquire">
        <span class="navigation__button-text">Enquire Now</span>
      </nuxt-link>
    </div>

    <!-- Overlay Menu -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="navigation__overlay">
        <div class="navigation__overlay-content">
          <!-- Navigation Links -->
          <div class="navigation__links">
            <nuxt-link 
              v-for="item in navigation?.header" 
              :key="item._key"
              :to="`/${item.slug}`"
              class="navigation__link"
              :class="{ 'navigation__link--active': $route.path === `/${item.slug}` }"
              @click.native="closeMenu"
            >
              {{ item.title }}
            </nuxt-link>
          </div>

          <!-- Info Section -->
          <div class="navigation__info-section">
            <!-- Newsletter Section -->
            <div class="navigation__newsletter">
              <h3 class="navigation__newsletter-title">Stay Connected</h3>
              <p class="navigation__newsletter-text">
                Stay informed about luxury design trends, property market insights, and Kinland's latest projects.
              </p>
              <form @submit.prevent="handleSubscribe" class="navigation__form">
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="Email Address"
                  class="navigation__input"
                  required
                />
                <button type="submit" class="navigation__submit">Subscribe</button>
              </form>
            </div>

            <!-- Social Links -->
            <div class="navigation__social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="navigation__social-link">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="navigation__social-link">Instagram</a>
            </div>
          </div>

          <!-- Copyright -->
          <div class="navigation__copyright">
            © {{ new Date().getFullYear() }} KINLAND
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  
  data() {
    return {
      isMenuOpen: false,
      email: ''
    }
  },

  computed: {
    navigation() {
      return this.$store.state.sanity.navigation
    },
    isTransparent() {
      return this.$route.path === '/'
    },
    isWhite() {
      return this.isTransparent || this.isMenuOpen
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    async handleSubscribe() {
      // Implement newsletter subscription logic here
      console.log('Subscribe:', this.email)
      this.email = ''
    }
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &--transparent {
    background: transparent;
  }

  &--white {
    color: white;

    .navigation__button {
      color: white;
      border-color: white;

      &--enquire {
        background: white;
        color: black;
        border-color: white;
      }
    }
  }

  &__logo {
    width: 120px;
    display: block;
    z-index: 1001;
  }

  &__ctas {
    display: flex;
    gap: 1rem;
    z-index: 1001;
    font-size: 0.7rem;
  }

  &__button {
    background: none;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    &--enquire {
      background: black;
      color: white;
      border-color: black;

      .navigation--white & {
        background: white;
        color: black;
        border-color: white;
      }
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    color: white;
    z-index: 100;
  }

  &__overlay-content {
    max-width: 100%;
    margin: 0;
    padding: 6rem 1rem 2rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &__links {
    display: flex;
    justify-content: center;
    gap: 4rem;
    padding: 6rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 2rem 0;
  }

  &__link {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    transition: opacity 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      opacity: 0.8;
    }

    &--active {
      opacity: 0.5;
    }
  }

  &__info-section {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  &__newsletter {
    max-width: 500px;

    &-title {
      font-size: 0.85rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.5);
    }

    &-text {
      margin-bottom: 2rem;
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }

  &__form {
    display: flex;
    gap: 1rem;
  }

  &__input {
    width: 300px;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem;
    color: white;
    font-size: 0.65rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__submit {
    background: white;
    color: black;
    border: none;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.65rem;

    &:hover {
      opacity: 0.8;
    }
  }

  &__social {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  &__social-link {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.65rem;

    &:hover {
      opacity: 0.8;
    }
  }

  &__copyright {
    padding-top: 2rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.65rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    &__overlay-content {
      padding: 5rem 1rem 1rem;
    }

    &__links {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    &__info-section {
      flex-direction: column;
      gap: 2rem;
    }

    &__form {
      flex-direction: column;
    }

    &__input {
      width: 100%;
    }

    &__social {
      justify-content: flex-start;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> 