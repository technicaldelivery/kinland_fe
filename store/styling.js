import Vue from 'vue';

export const state = () => ({
  // color:
  textColor: null,
  backgroundColor: null,

  // transitions:
  top: 0,
  headerOpen: false,
  animate: true,
  preventScrollTo: false,
  
  // arrow/cursor handling:
  mouseVisible: true,
  touchDevice: false,

  // hover shenanigans:
  invert: null, // will be set to null, 'menu', or $route.name
  preventMouseEnter: false, // to stop hover/inversion being triggered epilleptically,
  preventMouseEnterTimeout: null, // to renable mouseEnter upon animation complete

})

export const mutations = {
  UPDATE_COLORSCHEME: (state, colors) => {
    if (colors) {
      if (colors.textColor && colors.textColor.hex) Vue.set(state, 'textColor', colors.textColor.hex);
      if (colors.backgroundColor && colors.backgroundColor.hex) Vue.set(state, 'backgroundColor', colors.backgroundColor.hex);
    } else {
      Vue.set(state, 'textColor', null);
      Vue.set(state, 'backgroundColor', null);
    }
  },
  UPDATE_TOP: (state, top) => {
    Vue.set(state, 'top', top);
  },
  UPDATE_HEADEROPEN: (state, headerOpen) => {
    Vue.set(state, 'headerOpen', headerOpen);
  },
  UPDATE_ANIMATE: (state, animate) => {
    Vue.set(state, 'animate', animate);
  },
  UPDATE_PREVENTSCROLLTO: (state, preventScrollTo) => {
    Vue.set(state, 'preventScrollTo', preventScrollTo);
  },
  UPDATE_TOUCHDEVICE: (state, touchDevice) => {
    Vue.set(state, 'touchDevice', touchDevice);
  },
  UPDATE_MOUSEVISIBLE: (state, mouseVisible) => {
    Vue.set(state, 'mouseVisible', mouseVisible);
  },

  // hover shenanigans: 
  UPDATE_INVERT: (state, invert) => {
    Vue.set(state, 'invert', invert);
  },
  UPDATE_PREVENTMOUSEENTER: (state, preventMouseEnter) => {
    // likely to only be used to set preventMouseEnter to `true`
    Vue.set(state, 'preventMouseEnter', preventMouseEnter);
  },
  SET_PREVENTMOUSEENTERTIMEOUT: (state, timeout) => {
    Vue.set(state, 'preventMouseEnterTimeout', timeout);
  },
  CLEAR_PREVENTMOUSEENTERTIMEOUT: (state) => {
    if (state.preventMouseEnterTimeout) {
      clearTimeout(state.preventMouseEnterTimeout);
    }
  }
}

export const actions = {
  SET_PREVENTMOUSEENTER({ state, commit }) {
    commit('UPDATE_PREVENTMOUSEENTER', true);
    commit('CLEAR_PREVENTMOUSEENTERTIMEOUT');
    let timeout = setTimeout(() => {
      commit('UPDATE_PREVENTMOUSEENTER', false)
    },500);
    commit('SET_PREVENTMOUSEENTERTIMEOUT', timeout);
  },
}