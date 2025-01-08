<template>
  <div v-if="item" class="project">
    <portal to="subnavigation"><NuxtLink @click.native="resetSplash" :to="`/portfolio/${item.slug}`" class="header-link">{{ titleToLowercase() }}</NuxtLink></portal>
    <section>
      <transition 
        name="fade-slides" 
        mode="out-in"
      >
        <div
          v-show="splash" 
          @click="handleSplashClick"
          class="project-page-splash"
        >
          <ProjectTextCard
            :project="item"
            :background="false"
          />
        </div>
      </transition>
      <transition-group 
        name="fade-slides" 
        mode="out-in"
        class="project-page-slide-wrapper"
        tag="div"
      >
        <ProjectPageSlide
          v-for="(slide, index) in slides"
          :key="slide._key"
          v-show="!splash && index === currentSlide"
          :slide="slide"
          :currentSlide="currentSlide"
          @click.native="handleSlideClick"
        />
      </transition-group>
      <ProjectPageSlidesNavigation
        v-show="slides"
        :slides="slides"
        :currentSlide="currentSlide"
        :splash="splash"
        @updateCurrentSlide="handleUpdateCurrentSlide"
      />
      <transition name="fade-information">
        <div
          v-show="!splash && currentSlide === slides.length"
          class="project-page-information-wrapper"
          @click="handleSlideClick"
        >
          <div class="project-page-information">
            <div class="project-page-information-main">
              <PortableText
                v-if="item.body"
                :blocks="item.body"
                :className="`body project-page-information-body`"
                :renderContainerOnSingleChild="true"
              />
              <PortableText
                v-if="item.notice"
                :blocks="item.notice"
                :className="`notice`"
                :renderContainerOnSingleChild="true"
              />
            </div>
            <div class="project-page-information-details">
              <div 
                v-if="item.year && item.year.substring(0, 4)"
                class="project-page-information-detail"
              >
                <div class="label small-caps">year</div>
                <div class="value">{{ item.year.substring(0, 4) }}</div>
              </div>
              <div
                v-if="item.status && item.status.title"
                class="project-page-information-detail"
              >
                <div class="label small-caps">status</div>
                <div class="value">{{ item.status.title }}</div>
              </div>
              <div
                v-if="item.location"
                class="project-page-information-detail"
              >
                <div class="label small-caps">location</div>
                <div class="value">{{ item.location }}</div>
              </div>
              <div
                v-if="item.size"
                class="project-page-information-detail"
              >
                <div class="label small-caps">size</div>
                <div class="value">{{ item.size }}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
  <Dynamic404 v-else />
</template>

<script>
import sanity from "~/sanity.js";
import { projectPageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  asyncData({ params, payload }) {
    if (payload) return { item: payload.item }
    else return sanity.fetch(projectPageRequest, params).then(data => ({ item: data }))
  },
  head() {
    if (this.item) {
      const date = this.item._updatedAt;
      const { title, description, image } = this.item.seo || {};
      return makeMeta({ title, description, image, date, fallback: this.$store.state.sanity.seo });
    }
  },
  data() {
    return {
      splash: true,
      // showSplashLogo: true,
      currentSlide: 0,
      // timeout: null
    }
  },
  computed: {
    slides() {
      if (this.item.items && this.item.items.length) {
        return this.item.items;
      } else {
        return null;
      }
    }
  },
  methods: {
    titleToLowercase() {
      return this.item && this.item.title.toLowerCase();
    },
    handleSlideClick(e) {
      if (e.clientX < window.innerWidth / 2) {
        if (this.currentSlide > 0) {
          this.handleUpdateCurrentSlide(this.currentSlide - 1);
        } else {
          this.resetSplash();
        }
      } else {
        if (this.currentSlide < this.slides.length) {
          this.handleUpdateCurrentSlide(this.currentSlide + 1);
        } else {
          this.currentSlide = 0;
        }
      }
    },
    handleUpdateCurrentSlide(index) {
      if (this.splash) {
        this.splash = false;
      }
      if (index === 'information') {
        if (this.previousSlide === this.slides.length - 1) {
          this.currentSlide = 0;
        } else {
          this.currentSlide = this.previousSlide;
        }
      } else {
        this.previousSlide = this.currentSlide;
        this.currentSlide = index;
      }
    },
    handleSplashClick() {
      this.splash = false;
    },
    resetSplash() {
      this.currentSlide = 0;
      this.splash = true;
    },      
    handleKeydown(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === 27) {
        this.resetSplash();
      }
    },
    handleKeyup(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === 37 || e.keyCode === 38) {
        if (this.currentSlide > 0) {
           this.currentSlide = this.currentSlide - 1;
        }
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        if (this.splash) {
          this.splash = false;
        } else if (this.currentSlide < this.slides.length) {
          this.currentSlide = this.currentSlide + 1;
        }
      }
    },
    handleSwipe(e) {
      if (e.direction === 2) {
        if (this.splash) {
          this.splash = false;
        } else if (this.currentSlide < this.slides.length) {
          this.currentSlide = this.currentSlide + 1;
        }
      } else if (e.direction === 4) {
        if (this.currentSlide > 0) {
           this.currentSlide = this.currentSlide - 1;
        } else {
          this.resetSplash();
        }
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }
}
</script>

<style lang="scss" scoped>
.project {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .project-page-splash, .project-page-information-wrapper {
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      z-index: 2;
      padding: 0 var(--fm);
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: transparent;
    }
    .project-page-information-wrapper {
      // mask-image: linear-gradient(180deg, #000 80%, transparent);
      .project-page-information {
        margin: calc(3 * var(--fm)) 0;
        max-height: calc(100vh - 6 * var(--fm));
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
          display: none;
        }
        .project-page-information-main {
          border-bottom: 1px solid black;
          padding-bottom: var(--fm);
          margin-bottom: var(--fm);
          .notice {
            margin-top: var(--fm);
          }
        }
        .project-page-information-details {
          .project-page-information-detail {
            .label, .value {
              display: inline-block;
            }
            .label {
              width: 5em;
              margin-right: var(--fm);
            }
          }
        }
      }
    }
  }
}
</style>