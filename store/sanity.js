import Vue from 'vue'
import * as requests from "~/sanityRequests.js"

export const state = () => ({
  editorialArticles: null,
  projects: null,
  navigation: null,
  pageNotFound: null,
  seoMeta: null,
})

export const getters = {}

export const mutations = {
  SET_EDITORIALARTICLES: (state, editorialArticles) => {
    Vue.set(state, 'editorialArticles', editorialArticles)
  },
  SET_PROJECTS: (state, projects) => {
    Vue.set(state, 'projects', projects)
  },
  SET_NAVIGATION: (state, navigation) => {
    Vue.set(state, 'navigation', navigation)
  },
  SET_PAGENOTFOUND: (state, pageNotFound) => {
    Vue.set(state, 'pageNotFound', pageNotFound)
  },
  SET_SEO: (state, seoMeta) => {
    Vue.set(state, 'seoMeta', seoMeta)
  },
}

export const actions = {
  async EDITORIALARTICLES_CALL ({ commit }, sanityClient) {
    const { editorialArticles } = await sanityClient.fetch(requests.editorialArticlesPageRequest)
    commit('SET_EDITORIALARTICLES', editorialArticles)
  },
  async PROJECTS_CALL ({ commit }, sanityClient) {
    const { projects } = await sanityClient.fetch(requests.projectsPageRequest)
    commit('SET_PROJECTS', projects)
  },
  async NAVIGATION_CALL ({ commit }, sanityClient) {
    console.log('NAVIGATION_CALL');
    const { navigation } = await sanityClient.fetch(requests.navigationRequest)
    console.log(navigation);
    commit('SET_NAVIGATION', navigation)
  },
  async PAGENOTFOUND_CALL ({ commit }, sanityClient) {
    const pageNotFound = await sanityClient.fetch(requests.pageNotFoundRequest)
    commit('SET_PAGENOTFOUND', pageNotFound)
  },
  async SEO_CALL ({ commit }, sanityClient) {
    const seoMeta = await sanityClient.fetch(requests.seoRequest)
    commit('SET_SEO', seoMeta)
  },
}
