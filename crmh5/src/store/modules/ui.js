const state = {
  mainPageTop: ''
}

const getters = {
  mainPageTop: state => state.mainPageTop
}

const actions = {
  setMainPageTop ({commit}, {mainPageTop}) {
    commit('setMainPageTop', mainPageTop)
  }
}

const mutations = {
  setMainPageTop (state, mainPageTop) {
    state.mainPageTop = mainPageTop
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
