<template>
  <section>
    <div class="page-not-found" v-if="pageNotFound">
      <div class="body-container">
        <div v-if="pageNotFound.title" class="title">
          <h1>{{ pageNotFound.title }}</h1>
        </div>
        <PortableText
          v-if="pageNotFound.body"
          :blocks="pageNotFound.body"
          :renderContainerOnSingleChild="true"
          :className="'body'"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    pageNotFound() {
      return this.$store.state.sanity.pageNotFound;
    }
  }
}
</script>

<style lang="scss" scoped>

.section {
  // margin: calc(5 * var(--fm)) var(--fm);
}

.page-not-found {
  grid-area: auto / auto / span 8 / span 12;
  background-color: var(--grey);
  padding: calc(0.5 * var(--gs));
}

.title, .image {
  margin-bottom: var(--paragraph-space);
  color: var(--active-color);
}
.body-container {
  // @include text-width;
  // margin: auto;
}
</style>
