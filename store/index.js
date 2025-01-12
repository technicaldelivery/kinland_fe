import { createSanityClient } from "~/sanity.js";

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { payload, $config }) {
    const sanityClient = createSanityClient($config);
    if (payload) {
      commit('sanity/SET_NAVIGATION', payload.navigation);
      commit('sanity/SET_PAGENOTFOUND', payload.pageNotFound);
      commit('sanity/SET_SEO', payload.seoMeta);
    } else {
      await dispatch('sanity/NAVIGATION_CALL', sanityClient);
      await dispatch('sanity/PAGENOTFOUND_CALL', sanityClient);
      await dispatch('sanity/SEO_CALL', sanityClient);
    }
  }
}
