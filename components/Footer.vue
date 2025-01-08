<template>
  <div class="bottom-text-wrapper small-caps" :class="{fixed}">
    <div class="footer-item">
      © 2023 kinland
    </div>
    <div class="footer-item footer-item-middle">
      <NuxtLink v-if="contact" :to="`/contact`" class="">
        contact
      </NuxtLink>
      <div v-else>
        <slot />
      </div>
    </div>
    <div class="footer-item">
      <button 
        class="small-caps" 
        @click="mailingList = !mailingList"
      >
        newsletter
      </button>
    </div>
    <transition name="fade">
      <MailingList 
        v-if="mailingList"
        @close="mailingList = false"
        :backgroundColor="mailingListColor"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailingList: false
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    contact: {
      type: Boolean,
      default: false
    },
    mailingListColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-text-wrapper {
  margin: calc(1 * var(--fm)) calc(2 * var(--fm));
  text-align: center;
  display: flex;
  justify-content: space-between;
  @include phone {
    margin: var(--fm);
  }
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .footer-item-middle {
    @include phone {
      display: none;
    }
  }
  p {
    display: inline-block;
  }
}
</style>