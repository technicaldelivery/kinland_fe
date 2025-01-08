import Vue from 'vue'
import sanity from "~/sanity.js"
import * as requests from "~/sanityRequests.js"

export const state = () => ({
  editorialArticles: null,
  projects: null,
  navigation: null,
  pageNotFound: null,
  seo: null,
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
  SET_SEO: (state, seo) => {
    Vue.set(state, 'seo', seo)
  },
}

export const actions = {
  async EDITORIALARTICLES_CALL ({ commit }) {
    const { editorialArticles } = await sanity.fetch(requests.editorialArticlesPageRequest)
    commit('SET_EDITORIALARTICLES', editorialArticles)
  },
  async PROJECTS_CALL ({ commit }) {
    const { projects } = await sanity.fetch(requests.projectsPageRequest)
    commit('SET_PROJECTS', projects)
  },
  async NAVIGATION_CALL ({ commit }) {
    console.log('NAVIGATION_CALL');
    const { navigation } = await sanity.fetch(requests.navigationRequest)
    console.log(navigation);
    commit('SET_NAVIGATION', navigation)
  },
  async PAGENOTFOUND_CALL ({ commit }) {
    const pageNotFound = await sanity.fetch(requests.pageNotFoundRequest)
    commit('SET_PAGENOTFOUND', pageNotFound)
  },
  async SEO_CALL ({ commit }) {
    const seo = await sanity.fetch(requests.seoRequest)
    commit('SET_SEO', seo)
  },
}
