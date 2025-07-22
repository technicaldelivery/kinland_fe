<template>
  <div class="portfolio-project-text-card" :class="{ background }" :style="{ '--background-color': project.colorScheme }">
    <div v-if="project" class="details ts-l">
      <p class="title">{{ project.title }}</p>
      <p v-if="project.year && project.year.substring(0, 4)"><span class="small-caps">year:</span> {{ project.year.substring(0, 4) }}</p>
      <p v-if="project.status && project.status.title"><span class="small-caps">status:</span> {{ project.status.title }}</p>
      <p v-if="project.location"><span class="small-caps">location:</span> {{ project.location }}</p>
      <p v-if="project.size"><span class="small-caps">size:</span> {{ project.size }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    background: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .portfolio-project-text-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.background {
      // aspect-ratio: 1.5;
      min-height: calc((100vw - 3 * var(--fm)) / 2 * 0.666);
      background-color: var(--background-color, rgb(225, 225, 225));
      @include phone {
        min-height: calc((100vw - 3 * var(--fm)) * 0.666);
      }
    }
    .details {
      margin: calc(1 * var(--fm));
      @include typography-extra-large;
      .title {
        margin-bottom: calc(0.25 * var(--fm));
        text-align: center;
      }
    }
  }
</style>
