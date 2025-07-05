<template>
  <footer class="footer">
    <!-- Newsletter Section -->
    <div class="footer__newsletter">
      <div class="footer__newsletter-left">
        <p class="footer__newsletter-text">{{ siteSettings.newsletterDescription[0].children[0].text }}</p>
        <form class="footer__form" @submit.prevent="handleSubscribe">
          <div class="footer__form-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email Address"
              class="footer__input"
              required
            />
            <button type="submit" class="footer__submit">SUBSCRIBE</button>
          </div>
          <p class="footer__privacy">We respect your privacy. You can unsubscribe at any time.</p>
        </form>
      </div>
      
      <div class="footer__social-links">
        <a
          v-for="item in siteSettings.socialLinks"
          :key="item._key"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__social-link"
        >
          {{ item.text.toUpperCase() }}
        </a>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="footer__nav">
      <div class="footer__copyright">© {{ new Date().getFullYear() }} KINLAND</div>
      <nav class="footer__links">
        <nuxt-link 
          v-for="item in navigation?.header" 
          :key="item._key"
          :to="`/${item.slug}`"
          class="footer__link"
          :class="{ 'footer__link--active': $route.path === `/${item.slug}` }"
        >
          {{ item.title.toUpperCase() }}
        </nuxt-link>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    navigation() {
      return this.$store.state.sanity.navigation
  },
    siteSettings() {
      return this.$store.state.sanity.siteSettings;
    }
  },
  methods: {
    async handleSubscribe() {
      // TODO: Implement newsletter subscription logic
      console.log('Subscribe:', this.email)
      this.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 4rem 1rem 2rem;
  // background: white;

  &__newsletter {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__newsletter-left {
    max-width: 600px;
  }

  &__newsletter-text {
    font-family: 'ABC Marist', serif;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0 0 2rem 0;
  }

  &__social-links {
    display: flex;
    gap: 2rem;
  }

  &__social-link {
    color: inherit;
    text-decoration: none;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }

  &__form {
    width: 100%;
  }

  &__form-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__input {
    width: 650px;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-family: 'ABC Marist', serif;
    font-size: 0.85rem;
    background: transparent;

    &:focus {
      outline: none;
      border-color: black;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__submit {
    padding: 0.5rem 2rem;
    border: 1px solid black;
    background: transparent;
    color: black;
    font-family: 'ABC Marist', serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;
    white-space: nowrap;

    &:hover {
      background: black;
      color: white;
    }
  }

  &__privacy {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.5);
    margin: 0;
  }

  &__nav {
    margin: 2rem auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__copyright {
    font-size: 0.6rem;
    letter-spacing: 0.05em;
  }

  &__links {
    display: flex;
    gap: 2rem;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }

  @media (max-width: 1024px) {
    padding: 2rem 1rem;

    &__newsletter {
      flex-direction: column;
      gap: 2rem;
    }

    &__newsletter-left {
      max-width: 100%;
    }

    &__newsletter-text {
      font-size: 1rem;
    }

    &__form-group {
      flex-direction: column;
    }

    &__input {
      width: 100%;
    }

    &__nav {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    &__links {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  }
}
</style>