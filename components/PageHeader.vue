<template>
  <header class="page-header">
    <div class="page-header__content">
      <h1 class="page-header__title">{{ title }}</h1>
      <p class="page-header__description">{{ description }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  padding: 4rem 0 1rem;
  max-width: 750px;

  &__content {
    margin: calc(4 * var(--fm)) var(--fm) calc(2 * var(--fm)) var(--fm);
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: normal;
  }

  &__description {
    max-width: 750px;
    font-size: 1rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 6rem 0 3rem;

    &__content {
      padding: 0 1rem;
    }

    &__title {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    &__description {
      font-size: 1rem;
    }
  }
}
</style> 