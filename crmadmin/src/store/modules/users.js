import api from '../../api/normal'
const state = {
  userList: [],
  listCount: 0
}

const getters = {
  userList: state => state.userList,
  listCount: state => state.listCount
}

const actions = {
  async getUserList ({commit}, data) {
    let result = await api.getUserList(data)
    if (result.data.code === 200) {
      commit('initUserList', {userList: result.data.data, count: result.data.count})
    }
    return result
  }
}

const mutations = {
  initUserList (state, data) {
    state.userList = data.userList
    state.listCount = data.count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
