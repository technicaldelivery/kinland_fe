<template>
  <div class="holding-page-information-wrapper">
    <div v-if="information" class="holding-page-information">
      <div v-for="item in information.textBlocks" class="holding-page-information-item">
        <PortableText
          v-if="item && item.body"
          :blocks="item.body"
          :className="`body`"
          :renderContainerOnSingleChild="true"
        />
      </div>
      <div class="holding-page-information-contact">
        <div v-if="information.email" class="holding-page-information-email">
          <p>
            <span class="small-caps">email</span><br>
            <a :href="information.email.href">{{ information.email.text }}</a>
          </p>
        </div>
        <div v-if="information.instagram" class="holding-page-information-phone">
          <p>
            <span class="small-caps">social</span><br>
            <a :href="information.instagram.href">{{ information.instagram.text }}</a>
          </p>
        </div>
      </div>
      <div @click.prevent="$emit('updateCurrentSlide', 'information')" class="holding-page-information-close">
        <button @click="$emit('updateCurrentSlide', 'information')" class="ts-s small-caps">
          close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['information']
}
</script>

<style lang="scss" scoped>
.holding-page-information-wrapper {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  padding: calc(2 * var(--fm)) var(--fm);
  background-color: rgba(227, 97, 9, 1);
  z-index: 99;
  pointer-events: none;
  .body, p {
    pointer-events: all !important;
  }
  .holding-page-information {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: 133.33vmin;
    margin: 0 auto;
    cursor: default;
    .holding-page-information-item {
      width: 24.333em;
      @include phone {
        width: 19.3333em;
        max-width: 100%;
      }
      &:nth-child(1) {
        @include tablet-and-laptop-and-desktop {
          margin-left: calc(2 * var(--fm));
        }
      }
      &:nth-child(2) {
        align-self: flex-end;
        @include tablet-and-laptop-and-desktop {
          margin-right: calc(2 * var(--fm));
        }
      }
      &:nth-child(3) {
        @include tablet-and-laptop-and-desktop {
          margin: 0 auto;
        }
        @include phone {
          margin-left: var(--fm);
        }
      }
      .body {
         @include typography-medium;
      }
    }
    .holding-page-information-contact {
      display: grid;
      grid-gap: var(--fm);
      grid-template-columns: repeat(2, 1fr);
      width: 66.66%;
      margin: 0 auto;
      @include tablet {
        width: 100%;
      }
      @include phone {
        grid-template-columns: repeat(1, 1fr);
      }
      .holding-page-information-email,
      .holding-page-information-phone {
        text-align: center;
        p {
          @include typography-medium;
        }
      }
      .holding-page-information-phone {
        a {
          // letter-spacing: 0.075em !important;
        }
      }
    }
    .holding-page-information-close {
      position: absolute;
      top: 0; bottom: 0; right: 0; left: 0;
      z-index: -1;
      pointer-events: all;
      cursor: pointer;
      button {
        position: absolute;
        bottom: 0; right: 0; left: 0;
        text-align: center;
        padding: var(--fm);
      }
    }
  }
}
</style>