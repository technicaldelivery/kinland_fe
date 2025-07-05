<template>
  <div 
    class="editorial-article-title-card-wrapper"
    :style="{ '--background-color': item.colorScheme }"
  >
    <div class="editorial-article-title-card">
      <div class="editorial-article-title-card-text">
        <div
          v-if="item.title" 
          class="title"
        >
          {{ item.title }}
        </div>
        <div 
          v-if="item.subtitle" 
          class="subtitle small-caps"
        >
          {{ item.subtitle }}
        </div>
        <div 
          v-if="item.standfirst" 
          class="standfirst"
        >
          {{ item.standfirst }}
        </div>
      </div>
      <div class="editorial-article-title-card-image">
        <div class="image-wrapper-wrapper">
          <SanityImage
            v-if="item.coverImage"
            :image="item.coverImage"
            :alternativeText="item.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style lang="scss" scoped>
  .editorial-article-title-card {
    border-top: 1px solid rgba(0,0,0,0.25);
    @include laptop-and-desktop {
      display: flex;
      align-items: stretch;
    }
    .editorial-article-title-card-text,
    .editorial-article-title-card-image {
      @include laptop-and-desktop {
        width: 50%;
        height: calc(100vh - 3 * var(--fm));
      }
    }
    .editorial-article-title-card-text {
      @include laptop-and-desktop {
        display: flex;
        flex-direction: column;
        padding: calc(2 * var(--fm));
      }
      @include phone-and-tablet {
        padding: calc(1 * var(--fm));
      }
      .title {
        @include laptop-and-desktop {
          flex: 1;
          font-size: 4rem;
        }
        @include phone-and-tablet {
          // @include typography-extra-large;
          font-size: 2.25rem;
          margin-bottom: var(--fm);
        }
      }
      .subtitle,
      .standfirst {
        @include typography-large;
      }
      .subtitle {
        // @include laptop-and-desktop {
        margin-bottom: calc(0.25 * var(--fm));
        // }
      }
    }
    .editorial-article-title-card-image {
      @include laptop-and-desktop {
        max-width: 50%;
        overflow: hidden;
      }
      .image-wrapper-wrapper {
        @include laptop-and-desktop {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 50%;
        }
        .image-wrapper {
          @include laptop-and-desktop {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
            padding-top: 0 !important;
          }
        }
      }
    }
  }
</style>