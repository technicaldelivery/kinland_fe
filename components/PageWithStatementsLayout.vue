<template>
  <div 
    class="statements-wrapper"
    :style="{ '--background-color': colorScheme }"
  >
    <div class="statements">
      <div
        v-for="statement in statements"
        :key="statement._id"
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
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  padding: calc(3 * var(--fm)) var(--fm);
  background-color: var(--background-color, rgba(227, 97, 9, 1));
  overflow-y: scroll;
  .statements {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: 133.33vmin;
    margin: 0 auto;
    cursor: default;
    @include phone {
      justify-content: center;
    }
    .statement {
      @include typography-medium;
      max-width: 24.333em;
      @include phone {
        max-width: 19.3333em;
        max-width: 100%;
        &:not(:last-child) {
          margin-bottom: calc(1 * var(--fm));
        }
      }
      &:nth-child(1) {
        @include tablet-and-laptop-and-desktop {
          margin-left: calc(2 * var(--fm));
        }
      }
      &:nth-child(2) {
        @include tablet-and-laptop-and-desktop {
          align-self: flex-end;
          margin-right: calc(2 * var(--fm));
        }
      }
      &:nth-child(3) {
        @include tablet-and-laptop-and-desktop {
          margin: 0 auto;
        }
      }
      &:nth-child(4) {
        @include tablet-and-laptop-and-desktop {
          align-self: flex-end;
          margin-right: calc(2 * var(--fm));
        }
      }
      &.opposite {
        &:nth-child(1) {
          @include tablet-and-laptop-and-desktop {
            margin-left: auto;
            margin-right: calc(2 * var(--fm));
          }
        }
        &:nth-child(2) {
          @include tablet-and-laptop-and-desktop {
            align-self: flex-end;
            margin-right: auto;
            margin-left: calc(2 * var(--fm));
          }
        }
        &:nth-child(3) {
          @include tablet-and-laptop-and-desktop {
            margin: 0 auto;
          }
        }
        &:nth-child(4) {
          @include tablet-and-laptop-and-desktop {
            align-self: flex-end;
            margin-right: calc(2 * var(--fm));
          }
        }
        &:nth-child(5) {
          @include tablet-and-laptop-and-desktop {
            align-self: flex-end;
            margin-right: auto;
            margin-left: calc(2 * var(--fm));
          }
        }
        &:nth-child(6) {
          @include tablet-and-laptop-and-desktop {
            margin: 0 auto;
          }
        }
        &:nth-child(7) {
          @include tablet-and-laptop-and-desktop {
            align-self: flex-end;
            margin-right: calc(2 * var(--fm));
          }
        }
      }
      .statement-title {
        margin-bottom: calc(0.25 * var(--fm));
      }
      .body {
         @include typography-medium;
      }
    }
    // .statement {
    //   margin: calc(1 * var(--fm));
    //   .statement-title {
    //     margin-bottom: calc(0.25 * var(--fm));
    //     text-align: center;
    //   }
    // }
  }
}

</style>