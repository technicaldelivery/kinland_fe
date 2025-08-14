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
          <!-- <SanityImage
              v-if="featuredImage"
              :image="featuredImage"
              :alternativeText="featuredImage.alternativeText"
              :forceRatio="'100%'"
              :objectFit="'cover'"
          /> -->

          <div v-if="featuredImages && featuredImages.length > 0" class="image-slider">
            <div 
              class="slider-container" 
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              @mousedown="handleMouseDown"
              @mousemove="handleMouseMove"
              @mouseup="handleMouseUp"
              @mouseleave="handleMouseUp"
            >
              <div 
                v-for="(image, index) in featuredImages" 
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
            <div v-if="featuredImages.length > 1" class="slider-controls">
              <button 
                @click="prevSlide" 
                class="slider-btn prev-btn"
                :disabled="currentSlide === 0"
              >
                <svg fill="#000000" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&amp;ns_extend;" xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" viewBox="0 0 42 42" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill-rule="evenodd" points="31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 "></polygon> </g></svg>
              </button>
              <button 
                @click="nextSlide" 
                class="slider-btn next-btn"
                :disabled="currentSlide === featuredImages.length - 1"
              >
                <svg fill="#000000" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&amp;ns_extend;" xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" viewBox="0 0 42 42" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill-rule="evenodd" points="11,38.32 28.609,21 11,3.68 13.72,1 34,21.01 13.72,41 "></polygon></g></svg>
              </button>
            </div>
            <div v-if="featuredImages.length > 1" class="slider-dots">
              <button
                v-for="(image, index) in featuredImages"
                :key="index"
                @click="goToSlide(index)"
                class="dot"
                :class="{ active: currentSlide === index }"
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
    'opposite',
    'featuredImage',
    'featuredImages',
  ],
  data() {
    return {
      currentSlide: 0,
      touchStartX: 0,
      touchEndX: 0,
      minSwipeDistance: 20,
      isDragging: false,
      dragStartX: 0,
      dragEndX: 0
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.featuredImages.length - 1) {
        this.currentSlide++
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX
      event.preventDefault()
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX
      event.preventDefault()
    },
    handleTouchEnd() {
      const swipeDistance = this.touchStartX - this.touchEndX
      
      if (Math.abs(swipeDistance) > this.minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped left, go to next slide
          this.nextSlide()
        } else {
          // Swiped right, go to previous slide
          this.prevSlide()
        }
      }
      
      // Reset values
      this.touchStartX = 0
      this.touchEndX = 0
    },
    handleMouseDown(event) {
      this.isDragging = true
      this.dragStartX = event.clientX
      event.preventDefault()
    },
    handleMouseMove(event) {
      if (!this.isDragging) return
      this.dragEndX = event.clientX
    },
    handleMouseUp() {
      if (!this.isDragging) return
      
      const dragDistance = this.dragStartX - this.dragEndX
      
      if (Math.abs(dragDistance) > this.minSwipeDistance) {
        if (dragDistance > 0) {
          // Dragged left, go to next slide
          this.nextSlide()
        } else {
          // Dragged right, go to previous slide
          this.prevSlide()
        }
      }
      
      // Reset drag state
      this.isDragging = false
      this.dragStartX = 0
      this.dragEndX = 0
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