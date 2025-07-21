<template>
  <nav :class="[
    'navigation',
    { 'navigation--transparent': isTransparent },
    { 'navigation--white': isWhite },
    { 'navigation--scrolled': this.isScrolled },
    { 'navigation--visible': this.showNav },
    { 'navigation--hidden': this.isScrollingDown && !this.isMenuOpen }
  ]">
    <!-- Logo -->
    <div class="navigation__logo">
      <IconKinland :color="isWhite ? 'white' : 'black'" />
    </div>

    <!-- Right CTAs -->
    <div class="navigation__ctas">
      <button 
        class="navigation__button" 
        @click="toggleMenu"
        :aria-label="isMenuOpen ? 'Close Menu' : 'Open Menu'"
      >
        <span v-if="!isMobile" class="navigation__button-text">{{ isMenuOpen ? 'Close' : 'Menu' }}</span>
        <span v-else class="navigation__button-icon" aria-hidden="true">
          <svg v-if="!isMenuOpen" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
          </svg>
          <svg v-else style="padding: 2px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
        </span>
      </button>
      <nuxt-link to="/contact" class="navigation__button navigation__button--enquire">
        <span v-if="!isMobile" class="navigation__button-text">Enquire Now</span>
        <span v-else class="navigation__button-icon" aria-hidden="true">
          <svg :fill="isWhite ? '#000000' : '#ffffff'" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" fill-rule="evenodd"/>
          </svg>
        </span>
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
              <p class="navigation__newsletter-text">{{ newsletterDescriptionFirstSentence }}</p>
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
              <a
                v-for="item in siteSettings.socialLinks"
                :key="item._key"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="navigation__social-link"
              >
                {{ item.text }}
              </a>
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
      email: '',
      isMobile: false,
      isScrolled: false,
      showNav: false,
      lastScrollY: 0,
      isScrollingDown: false
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
      return this.isTransparent || this.isMenuOpen || this.isScrolled
    },
    siteSettings() {
      return this.$store.state.sanity.siteSettings;
    },
    newsletterDescriptionFirstSentence() {
      const newsletterDescription = this.$store.state.sanity.siteSettings?.newsletterDescription?.[0]?.children?.[0]?.text || '';
      const firstSentence = newsletterDescription.match(/[^.!?]+[.!?]/);
      return firstSentence ? firstSentence[0].trim() : '';
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
    },
    checkIsMobile() {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches
    },
    handleScroll() {
      const currentScrollY = window.scrollY;
      const threshold = this.isTransparent 
        ? (window.innerHeight - 39) 
        : 79;

      // Update scrolled state
      this.isScrolled = currentScrollY > threshold;

      // Determine scroll direction
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial threshold
        this.isScrollingDown = true;
      } else if (currentScrollY < this.lastScrollY) {
        // Scrolling up
        this.isScrollingDown = false;
      }

      this.lastScrollY = currentScrollY;
    }
  },
  activated() {
    window.addEventListener('scroll', this.handleScroll);
  },
  deactivated() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    document.body.style.overflow = ''
    window.removeEventListener('scroll', this.handleScroll)
  },

  mounted() {
    this.checkIsMobile()
    this.mediaQuery = window.matchMedia('(max-width: 768px)')
    this.mediaQuery.addEventListener('change', this.checkIsMobile)

    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()

    setTimeout(() => {
      this.showNav = true;
    }, 250)
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
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  height: 79px;
  opacity: 0;
  transform: translateY(0);

  &--transparent {
    background: transparent;
  }

  &--scrolled {
    background: black;
  }

  &--visible {
    opacity: 1;
  }

  &--hidden {
    transform: translateY(-100%);
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
    gap: 0.7rem;
    z-index: 1001;
    font-size: 12px;
    padding-left: 1rem;
  }

  &__button {
    background: none;
    border: 1px solid currentColor;
    padding: 5px 15px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    height: 39px;
    display: flex;
    align-items: center;

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

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
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
    padding: 5.2rem 1rem 2rem;
    overflow: scroll;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: black;
  }

  &__links {
    display: flex;
    justify-content: center;
    gap: 4rem;
    padding: 6rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 2rem 0;

    @media (min-width: 768px) and (max-width: 1024px) {
      flex-wrap: wrap;

      & > a {
        text-align: center;
        flex-grow: 1;
	      width: 25%;
      }
    }
  }

  &__link {
    color: white;
    text-decoration: none;
    font-size: 18px;
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
    padding: 5px 15px;

    &__overlay-content {
      padding: 4.5rem 1rem 1rem;
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