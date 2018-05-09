import api from '../../api/normal'
const state = {
  messageList: [],
  unreadList: []
}

const getters = {
  messageList: state => state.messageList,
  unreadList: state => state.unreadList
}

const actions = {
  async getMessageList ({commit}, data) {
    let result = await api.getMessageList(data)
    if (result.data.code === 200) {
      commit('setMessageList', result.data.data)
    }
  },
  async getUnreadList ({commit}, data) {
    let result = await api.getUnreadList()
    if (result.data.code === 200) {
      commit('setUnreadList', result.data.data)
    }
  },
  async cleanMess ({commit}, data) {
    await api.cleanMess()
  }
}

const mutations = {
  setMessageList (state, data) {
    state.messageList = data
  },
  setUnreadList (state, data) {
    state.unreadList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
