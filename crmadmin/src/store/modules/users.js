import api from '../../api/normal'
const state = {
  userList: []
}

const getters = {
  userList: state => state.userList
}

const actions = {
  async getUserList ({commit}, data) {
    let result = await api.getUserList(data)
    if (result.data.code === 200) {
      commit('initUserList', result.data.data)
    }
  }
}

const mutations = {
  initUserList (state, data) {
    state.userList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
