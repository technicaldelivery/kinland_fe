<template>
  <div class="about-page">
    <!-- Comment out the existing layout -->
    <PageWithStatementsLayout
      v-if="page.statements && page.statements.length"
      :statements="page.statements"
      :featuredImage="page.featuredImage"
      :featuredImages="page.featuredImages"
      :colorScheme="page.colorScheme"
      :opposite="true"
    />

    <!-- New 2-column layout -->
    <!-- 
    <div class="about-container">
      <div class="about-content">
        <div class="about-text">
          <div class="about-header">
            <h1>KINLAND</h1>
          </div>
          
          <div class="about-body">
            <p class="first-para">At Kinland, we believe good design shapes how we live. It can bring calm, invite light, and create spaces that feel connected to their place.</p>
            
            <p class="first-para">We design and build homes in the UK and Portugal, focusing on quality and careful details. Using natural materials, generous spaces, and thoughtful layouts, we create homes that feel warm, welcoming, and made to last.</p>
            
            <p>Each project is a quiet collaboration between architecture, craft, and place. It's about more than a building; it's about creating homes that support a slower, more considered way of living.</p>
            
            <p>We work closely with architects, makers, and communities who share our values. We care about the streets our homes sit on, how light moves through a room, and how spaces shape everyday moments.</p>
            
            <p>Part design, part craft, each home we build connects people to place and to each other. Every project is an opportunity to work with skilled makers, explore new ideas, and raise the standard for how homes can feel and function. We believe in building spaces that support thoughtful, considered living.</p>
            
            <div class="about-kin">
              <p><strong>Kin</strong> <em>(noun) – one's relatives, family, group</em></p>
              <p>Through Kin, we connect with creative communities and industry experts through curated events and collaborations, and we release biannual publications. Sign up to stay connected.</p>
            </div>
            
            <div class="about-kind">
              <p>Through <strong>Kind</strong>, we give back by supporting environmental and community initiatives. We partner with charities that protect the environment, support the arts, and help vulnerable communities across the UK, ensuring our work contributes positively to people and places.</p>
            </div>
            
            <p class="first-para"><em>Design, Place, Responsibility.</em></p>
          </div>
        </div>
        
        <div class="about-image">
          <div class="image-placeholder">
            <img src="https://cdn.sanity.io/images/z9qxiptb/staging/a39840da976ad5d132dcbe22e53fcbc61fbb9e0d-1728x1140.jpg?w=2500&auto=format&q=90" alt="Kinland architectural detail" />
          </div>
        </div>
      </div>
    </div>
    -->

    <Footer 
      :contact="true"
      :fixed="true"
    />
  </div>
</template>

<script>
import { createSanityClient } from "~/sanity.js";
import { pageRequest } from "~/sanityRequests.js";
import { makeMeta } from "~/utils/makeMeta.js";

export default {
  async asyncData({ $config }) {
    const sanityClient = createSanityClient($config);
    return await sanityClient.fetch(pageRequest, { page: 'about' }).then(page => {
      console.log('ABOUT_PAGE');
      console.log(page);
      return { page };
    });
  },
  head() {
    const { title, description, image } = this.page.seoMeta || {};
    return makeMeta({ title, description, image, fallback: this.$store.state.sanity.seoMeta });
  }
}
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  background-color: #ebe1a5;
}

.about-container {
  padding: calc(4 * var(--fm)) var(--fm);
  max-width: 1400px;
  margin: 0 auto;
}

.about-content {
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

.about-text {
  @include typography-medium;
  
  .about-header {
    margin-bottom: calc(2 * var(--fm));
    
    h1 {
      @include typography-extra-large;
      font-weight: 400;
      letter-spacing: 0.05em;
      margin: 0;
      color: #2C2C2C;
    }
  }

  .about-body {
    p {
      margin-bottom: calc(1 * var(--fm));
      line-height: 1.6;
      color: #2C2C2C;
      max-width: 32em;

      &.first-para {
        font-size: 1.2rem;
        line-height: 1.2;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    .about-kin,
    .about-kind {
      margin: calc(2 * var(--fm)) 0;
      
      p {
        margin-bottom: calc(1 * var(--fm));
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      strong {
        font-weight: 600;
      }
      
      em {
        font-style: italic;
      }
    }

    .about-motto {
      margin-top: calc(3 * var(--fm));
      
      p {
        strong {
          font-weight: 600;
          font-size: 1.1em;
        }
      }
    }
  }
}

.about-image {
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

// Responsive adjustments
@include phone {
  .about-container {
    padding: calc(2 * var(--fm)) var(--fm);
  }
  
  .about-text {
    .about-header h1 {
      font-size: 2rem;
    }
    
    .about-body p {
      font-size: 1rem;
      max-width: none;
    }
  }
}

@include tablet {
  .about-content {
    gap: calc(3 * var(--fm));
  }
}
</style>