<template>
  <header 
    v-on-clickaway="handleClickaway" 
    :class="[
      isIndex ? 'white' : 'black',
      isSolidBackground ? 'solid-background' : '',
      isActive ? 'active' : '', 
    ]"
  >
    <transition name="fade-menu" mode="out-in">
      <div 
        v-if="!isActive"
        key="menu-button-wrapper-wrapper" 
        class="menu-button-wrapper-wrapper"
      >
        <div class="menu-button-wrapper">
          <div 
            @click="isActive = true"  
            class="menu-button ts-s small-caps"
          >
            menu
          </div><nuxt-link v-if="$route.name?.split('-') && $route.name?.split('-').length > 1" :to="`/${$route.name?.split('-')[0]}`" class="menu-status header-link ts-s small-caps">
            {{ $route.name?.split('-')[0] }}
          </nuxt-link><div v-else-if="!isIndex" class="menu-status ts-s small-caps">
            {{ $route.name?.split('-')[0] }}
          </div><div class="menu-status ts-s small-caps">
            <portal-target name="subnavigation" class="subnavigation"></portal-target>
          </div> 
        </div> 
        <IconKinland 
          v-if="!isIndex" 
          color="black" 
          class="menu-logo" 
        />
        <div class="weird-flex-but-ok">&nbsp;</div>
      </div>
      <div v-else key="menu-items" class="menu-items">
        <div v-for="item in header" :key="item._key" class="menu-item">
          <nuxt-link @click.native="isActive = false" class="header-link ts-s small-caps" :to="`/${item.slug}`">{{ item.slug }}</nuxt-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
  mixins: [ clickaway ],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    navigation() {
      return this.$store.state.sanity.navigation;
    },
    header() {
      if (this.navigation && this.navigation.header) {
        return this.navigation.header.filter(item => item.title && item.slug);
      }
    },
    isIndex() {
      return this.$route.path === '/';
    },
    isSolidBackground() {
      return ['portfolio', 'journal'].includes(this.$route.name);
    }
  },
  methods: {
    handleClickaway() {
      console.log(this.$route);
      console.log(this.$route.name?.split('-'));
      this.isActive = false;
    }
  }
}
</script>


<style lang="scss" scoped>
header {
  position: fixed;
  width: 100vw;
  top: 0;
  padding: var(--fm) calc(2 * var(--fm));
  z-index: 1000;
  transition: color 0.666s ease;
  @include phone { 
    padding: var(--fm);
    &.solid-background {
      background-color: white;
    }
  }
  &.white {
    color: white;
    &.active {
      @include phone {
        color: black;
      }
    }
  }
  &.black {
    color: black;
  }
  .menu-button-wrapper-wrapper {
    display: flex;
    // justify-content: space-between;
    .menu-button-wrapper,
    .weird-flex-but-ok {
      flex: 1;
    }
    .menu-button-wrapper {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: fade;
      .menu-button, .menu-status {
        display: inline-block;
      }
      .menu-button {
        cursor: pointer;
      }
      .menu-status {
        margin-left: var(--fm);
        // opacity: 0.5;
        @include tablet { display: none; }
        @include phone { display: none; }
      }
    }
    .menu-logo {
      width: 7.5em;
    }
    .weird-flex-but-ok {
      flex: 1;
    }
  }
  .menu-items {
    display: flex;
    justify-content: space-between;
    @include phone {
      display: block;
      background-color: white;
      padding: var(--fm);
      margin: calc(-1 * var(--fm));
      .menu-item {
        &:not(:last-child) {
          margin-bottom: var(--fm);
        }
      }
    }
  }

}
</style>