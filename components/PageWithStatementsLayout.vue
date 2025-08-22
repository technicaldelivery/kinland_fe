<template>
  <div 
    class="statements-wrapper"
    :style="{ '--background-color': colorScheme }"
  >
    <div class="statements">
      <div 
        v-for="(statement, statementIndex) in statements"
        :key="statement._id"
        class="statements-content"
      >
        <div 
          class="statements-text"
          :class="{ 'order-last': statement.layout === 'textRightImageLeft' }"
        >
          <div
            class="statement"
            :class="{opposite}"
          >
            <div 
              v-if="statement.title" 
              class="statement-title small-caps"
            >
              <h4>{{ statement.title }}</h4>
            </div>
            <PortableText
              v-if="statement.body"
              :blocks="statement.body"
              :className="`statement-text`"
              :renderContainerOnSingleChild="true"
            />
          </div>
        </div>
        
        <div 
          class="statements-image"
          :class="{ 'order-first': statement.layout === 'textRightImageLeft' }"
        >
          <div v-if="statement.images && statement.images.length > 0" class="image-slider">
            <div 
              class="slider-container" 
              :class="{ 'single-image': statement.images.length === 1 }"
              :style="{ transform: `translateX(-${getSlideIndex(statementIndex) * 100}%)` }"
              @touchstart="statement.images.length > 1 ? (e) => handleTouchStart(e, statementIndex) : null"
              @touchmove="statement.images.length > 1 ? (e) => handleTouchMove(e, statementIndex) : null"
              @touchend="statement.images.length > 1 ? () => handleTouchEnd(statementIndex) : null"
              @mousedown="statement.images.length > 1 ? (e) => handleMouseDown(e, statementIndex) : null"
              @mousemove="statement.images.length > 1 ? (e) => handleMouseMove(e, statementIndex) : null"
              @mouseup="statement.images.length > 1 ? () => handleMouseUp(statementIndex) : null"
              @mouseleave="statement.images.length > 1 ? () => handleMouseUp(statementIndex) : null"
            >
              <div 
                v-for="(image, index) in statement.images" 
                :key="index"
                class="slide"
              >
                <SanityImage
                  :image="image"
                  :alternativeText="image.alternativeText"
                  :forceRatio="'100%'"
                  :objectFit="'cover'"
                />
              </div>
            </div>
            <div v-if="statement.images.length > 1" class="slider-controls">
              <button 
                @click="prevSlide(statementIndex)" 
                class="slider-btn prev-btn"
                :disabled="getSlideIndex(statementIndex) === 0"
              >
                <svg fill="#000000" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&amp;ns_extend;" xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" viewBox="0 0 42 42" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill-rule="evenodd" points="31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 "></polygon> </g></svg>
              </button>
              <button 
                @click="nextSlide(statementIndex)" 
                class="slider-btn next-btn"
                :disabled="getSlideIndex(statementIndex) === statement.images.length - 1"
              >
                <svg fill="#000000" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&amp;ns_extend;" xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" viewBox="0 0 42 42" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill-rule="evenodd" points="11,38.32 28.609,21 11,3.68 13.72,1 34,21.01 13.72,41 "></polygon></g></svg>
              </button>
            </div>
            <div v-if="statement.images.length > 1" class="slider-dots">
              <button
                v-for="(image, index) in statement.images"
                :key="index"
                @click="goToSlide(statementIndex, index)"
                class="dot"
                :class="{ active: getSlideIndex(statementIndex) === index }"
              ></button>
            </div>
          </div>
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
    'opposite'
  ],
  data() {
    return {
      currentSlides: {},
      touchStartX: 0,
      touchEndX: 0,
      minSwipeDistance: 20,
      isDragging: false,
      dragStartX: 0,
      dragEndX: 0,
      activeSlider: null
    }
  },
  methods: {
    getSlideIndex(statementIndex) {
      return this.currentSlides[statementIndex] || 0
    },
    setSlideIndex(statementIndex, index) {
      this.$set(this.currentSlides, statementIndex, index)
    },
    nextSlide(statementIndex) {
      const currentIndex = this.getSlideIndex(statementIndex)
      const maxIndex = this.statements[statementIndex].images.length - 1
      if (currentIndex < maxIndex) {
        this.setSlideIndex(statementIndex, currentIndex + 1)
      }
    },
    prevSlide(statementIndex) {
      const currentIndex = this.getSlideIndex(statementIndex)
      if (currentIndex > 0) {
        this.setSlideIndex(statementIndex, currentIndex - 1)
      }
    },
    goToSlide(statementIndex, index) {
      this.setSlideIndex(statementIndex, index)
    },
    handleTouchStart(event, statementIndex) {
      this.touchStartX = event.touches[0].clientX
      this.activeSlider = statementIndex
      event.preventDefault()
    },
    handleTouchMove(event, statementIndex) {
      if (this.activeSlider !== statementIndex) return
      this.touchEndX = event.touches[0].clientX
      event.preventDefault()
    },
    handleTouchEnd(statementIndex) {
      if (this.activeSlider !== statementIndex) return
      const swipeDistance = this.touchStartX - this.touchEndX
      
      if (Math.abs(swipeDistance) > this.minSwipeDistance) {
        if (swipeDistance > 0) {
          this.nextSlide(statementIndex)
        } else {
          this.prevSlide(statementIndex)
        }
      }
      
      this.touchStartX = 0
      this.touchEndX = 0
      this.activeSlider = null
    },
    handleMouseDown(event, statementIndex) {
      this.isDragging = true
      this.dragStartX = event.clientX
      this.activeSlider = statementIndex
      event.preventDefault()
    },
    handleMouseMove(event, statementIndex) {
      if (!this.isDragging || this.activeSlider !== statementIndex) return
      this.dragEndX = event.clientX
    },
    handleMouseUp(statementIndex) {
      if (!this.isDragging || this.activeSlider !== statementIndex) return
      
      const dragDistance = this.dragStartX - this.dragEndX
      
      if (Math.abs(dragDistance) > this.minSwipeDistance) {
        if (dragDistance > 0) {
          this.nextSlide(statementIndex)
        } else {
          this.prevSlide(statementIndex)
        }
      }
      
      this.isDragging = false
      this.dragStartX = 0
      this.dragEndX = 0
      this.activeSlider = null
    }
  }
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
    // min-height: 100vh;

    @include phone-and-tablet {
      grid-template-columns: 1fr;
      padding-top: calc(2 * var(--fm));
      gap: calc(2 * var(--fm));
      min-height: auto;
    }

    .order-first {
      order: -1;
    }

    .order-last {
      order: 1;
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

    .image-slider {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: fit-content;

      .slider-container {
        display: flex;
        transition: transform 0.3s ease;
        cursor: grab;

        &:active {
          cursor: grabbing;
        }

        &.single-image {
          cursor: default;

          &:active {
            cursor: default;
          }
        }

        .slide {
          min-width: 100%;

          img {
            width: 100%;
            aspect-ratio: 5/6;
            display: block;
          }
        }
      }

      .slider-controls {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
        pointer-events: none;

        .slider-btn {
          pointer-events: all;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 20px;

          &:hover:not(:disabled) {
            transform: scale(1.1);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .slider-dots {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;

          &.active {
            background: rgba(0, 0, 0, 0.9);
            transform: scale(1.2);
          }

          &:hover {
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
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