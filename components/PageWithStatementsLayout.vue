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
          <div class="image-placeholder">
            <img src="https://cdn.sanity.io/images/z9qxiptb/staging/a39840da976ad5d132dcbe22e53fcbc61fbb9e0d-1728x1140.jpg?w=2500&auto=format&q=90" alt="Kinland architectural detail" />
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
  
  .statements-text {
    @include typography-medium;
    
    .statement {
      @include typography-medium;
      max-width: 32em;
      margin-bottom: calc(1 * var(--fm));
      
      @include phone {
        max-width: 100%;
      }
      
      .statement-title {
        margin-bottom: calc(0.25 * var(--fm));
        
        h4 {
          @include typography-medium;
          font-weight: 400;
          letter-spacing: 0.05em;
          margin: 0;
          color: #2C2C2C;
        }
      }
    }
  }
  
  .statement-text {
    > * {
      margin-bottom: 1.3rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    p {
      margin-bottom: calc(1 * var(--fm));
      line-height: 1.6;
      color: #2C2C2C;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    // Heading styles
    h1, h2, h3, h4, h5, h6 {
      @include typography-medium;
      font-weight: 400;
      letter-spacing: 0.05em;
      margin: calc(1.5 * var(--fm)) 0 calc(0.5 * var(--fm)) 0;
      color: #2C2C2C;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    h1 {
      @include typography-extra-large;
    }
    
    h2 {
      @include typography-large;
    }
    
    h3, h4, h5, h6 {
      @include typography-medium;
    }
    
    // List styles
    ul, ol {
      margin: calc(1 * var(--fm)) 0;
      padding-left: calc(1.5 * var(--fm));
      color: #2C2C2C;
      
      li {
        margin-bottom: calc(0.5 * var(--fm));
        line-height: 1.6;
      }
    }
    
    ul {
      list-style-type: disc;
    }
    
    ol {
      list-style-type: decimal;
    }
    
    // Blockquote styles
    blockquote {
      margin: calc(1.5 * var(--fm)) 0;
      padding-left: calc(1.5 * var(--fm));
      border-left: 2px solid #2C2C2C;
      font-style: italic;
      color: #2C2C2C;
    }
    
    // Link styles
    a {
      color: #2C2C2C;
      text-decoration: underline;
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.175em;
      
      &:hover {
        text-decoration: none;
      }
    }
    
    // Inline text styles
    strong, b {
      font-weight: 600;
    }
    
    em, i {
      font-style: italic;
    }
    
    code {
      background-color: rgba(44, 44, 44, 0.1);
      padding: 0.1em 0.3em;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.9em;
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

    .image-placeholder {
      width: 100%;
      aspect-ratio: 4/5;
      background-color: #E8E2D5;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>