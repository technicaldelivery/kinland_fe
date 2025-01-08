<template>
  <div v-show="isOpen" class="cookie-banner">
    <div class="statement">
      This website uses cookies to ensure you have the best experience. Read our <nuxt-link class="text-link" to="/privacy-policy">privacy policy</nuxt-link>.
    </div><div class="options">
      <span class="option" @click="accept">Accept</span>
      <span class="option" @click="deny">Deny</span>
    </div>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag';
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    getGDPR() {
      if (process.browser) {
        return localStorage.getItem('GDPR:accepted', true);
      }
    },
    accept() {
      if (process.browser) {
        bootstrap().then(gtag => {
          this.isOpen = false;
          localStorage.setItem('GDPR:accepted', true);
          location.reload();
        })
      }
    },
    deny() {
      if (process.browser) {
        this.isOpen = false;
        localStorage.setItem('GDPR:accepted', false);
      }
    }
  },
  mounted() {
    if (!this.getGDPR() === true) {
      this.isOpen = true;
    } else {
      this.$gtag.set({ 'enabled': true });
      this.$gtm.enable(true);
    }
  },
}
</script>

<style lang="scss" scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  background-color: white;
  padding: var(--fm);
  z-index: 100;
  // min-width: 50%;
  width: 100%;
  display: flex;
  @include phone {
    display: block;
    // padding: calc(0.5 * var(--fm)) var(--fm);
  }
  .statement, .options {
    display: inline-block;
    @include phone {
      display: block;
    }
  }
  .statement {
    flex: 1;
    @include phone {
      margin-bottom: var(--fm);
    }
  }
  .options {
    white-space: nowrap;
    margin-left: calc(2 * var(--fm));
    @include phone {
      margin-left: 0;
    }
    .option {
      & + .option {
        margin-left: var(--fm);
      }
    }
  }
  span, a {
    color: black;
    cursor: pointer;
    &:hover {
      color: var(--active-color);
    }
  }
  // filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.2)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.16)) drop-shadow(0 4px 4px rgba(0, 0, 0, 0.12)) drop-shadow(0 16px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0 32px 32px rgba(0, 0, 0, 0.12)) drop-shadow(0 64px 64px rgba(0, 0, 0, 0.12));
}
</style>
