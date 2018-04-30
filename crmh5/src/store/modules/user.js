import api from '../../api/normal'
const state = {
  userData: {}
}

const getters = {
  userData: state => state.userData
}

const actions = {
  async getUserData ({commit}, data) {
    let result = await api.getUserData()
    console.log('result', result)
    if (result.data.code === 200) {
      commit('initUserData', result.data.data)
    }
    return result
  }
}

const mutations = {
  initUserData (state, data) {
    state.userData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
