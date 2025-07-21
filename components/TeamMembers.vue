<template>
  <div
    class="team-members"
  >
    <div
      v-for="teamMember in teamMembers"
      :key="teamMember._key"
      class="team-member"
    >
      <div
        v-if="teamMember.image"
        class="team-member-image"
      >
        <SanityImage
          v-if="teamMember.image"
          :image="teamMember.image"
          :alternativeText="teamMember.name"
          objectFit="contain"
        />
      </div>
      <div class="team-member-titles">
        <div class="name" v-if="teamMember.name">
          {{ teamMember.name }}
        </div>
        <div class="role small-caps" v-if="teamMember.role">
          {{ teamMember.role }}
        </div>
      </div>
      <div class="bio" v-if="teamMember.bio">
        <p>
          {{ teamMember.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamMembers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.team-members {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: calc(6 * var(--fm));
  margin: calc(4 * var(--fm));
  // margin-bottom: calc(6 * var(--fm));
  @include desktop {
    grid-template-columns: repeat(1, 1fr);
  }
  @include laptop {
    grid-template-columns: repeat(1, 1fr);
  }
  @include tablet {
    grid-template-columns: repeat(1, 1fr);
  }
  @include phone {
    grid-template-columns: repeat(1, 1fr);
    margin: calc(4 * var(--fm)) calc(1 * var(--fm));
    margin-bottom: calc(6 * var(--fm));
  }
  .team-member {
    @include typography-medium;
    @include text-width;
    margin: auto;
    .team-member-image {
      margin-bottom: calc(1 * var(--fm));
      width: 100%;
      padding-top: 100%;
      height: 0;
      // object-fit: contain;
      // transform
      transform: translateZ(0);
      .image-wrapper {
        position: absolute;
        top: 0;
        height: 100%;
        padding-top: 0 !important;
        object-fit: cover;
        overflow: hidden;
      }
      // height: 0;
      // padding-top: 100%;
    }
    .team-member-titles {
      margin-bottom: calc(0.5 * var(--fm));

      .name {
        font-size: 1.4rem;
      }
    }
  }
}
</style>