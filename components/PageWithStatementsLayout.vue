<template>
  <div 
    class="statements-wrapper"
    :style="{ '--background-color': colorScheme }"
  >
    <div class="statements">
      <div class="statements-content">
        <div class="statements-text">
          <div
            v-if="statements && statements.length > 0"
            :key="statements[0]._id"
            class="statement"
            :class="{opposite}"
          >
            <div 
              v-if="statements[0].title" 
              class="statement-title small-caps"
            >
              <h4>{{ statements[0].title }}</h4>
            </div>
            <PortableText
              v-if="statements[0].body"
              :blocks="statements[0].body"
              :className="`statement-text`"
              :renderContainerOnSingleChild="true"
            />
          </div>
        </div>
        
        <div class="statements-image">
          <SanityImage
              v-if="featuredImage"
              :image="featuredImage"
              :alternativeText="featuredImage.alternativeText"
              :forceRatio="'100%'"
              :objectFit="'cover'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'statements',
    'colorScheme',
    'opposite',
    'featuredImage'
  ]
}
</script>

<style lang="scss" scoped>

.statements-wrapper {
  padding: calc(4 * var(--fm)) var(--fm);
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--background-color, rgba(227, 97, 9, 1));
  
  @include phone {
    padding: calc(2 * var(--fm)) var(--fm);
  }

  .statements {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: default;
  
  .statements-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: calc(2 * var(--fm));
    gap: calc(4 * var(--fm));
    align-items: start;
    min-height: 100vh;

    @include phone-and-tablet {
      grid-template-columns: 1fr;
      padding-top: calc(2 * var(--fm));
      gap: calc(2 * var(--fm));
      min-height: auto;
    }
  }
  
  .statements-image {
    position: sticky;
    top: calc(2 * var(--fm));
    height: fit-content;
    
    @include phone-and-tablet {
      position: static;
      order: -1; // Show image first on mobile
    }

    img {
        width: 100%;
        height: 100%;
        aspect-ratio: 5/6;
      }
  }

  // .statement-text {
  //   h1 {
  //     font-size: 2.5rem;
  //     margin-bottom: 2rem;
  //     text-align: center;
  //   }

  //   h2 {
  //     font-size: 1.5rem;
  //     margin-bottom: 1rem;
  //     color: #333;
  //   }

  //   * + h2 {
  //     padding-top: 1rem;
  //   }

  //   p, ul, ol {
  //     font-size: 1.2rem!important;
  //     line-height: 1.6;
  //     margin-bottom: 1rem;
  //     color: #666;
  //   }

  //   p + ul {
  //     margin-top: -0.7rem;
  //   }

  //   ul {
  //     list-style: disc;
  //     padding-left: 25px;
  //   }

  //   ul > li {
  //     padding-left: 5px;
  //   }

  //   ol {
  //     list-style: decimal;
  //     padding-left: 35px;
  //   }

  //   li {
  //     margin-bottom: 0.5rem;
  //     list-style: inherit;
  //   }

  //   em {
  //     color: #999;
  //     font-size: 0.9rem;
  //   }
  // }
}
}


</style>