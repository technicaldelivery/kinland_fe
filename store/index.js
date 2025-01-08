export const actions = {
  async nuxtServerInit({ commit, dispatch }, { payload }) {
    if (payload) {
      commit('sanity/SET_NAVIGATION', payload.navigation);
      commit('sanity/SET_PAGENOTFOUND', payload.pageNotFound);
      commit('sanity/SET_SEO', payload.seo);
    } else {
      await dispatch('sanity/NAVIGATION_CALL');
      await dispatch('sanity/PAGENOTFOUND_CALL');
      await dispatch('sanity/SEO_CALL');
    }
  }
}
