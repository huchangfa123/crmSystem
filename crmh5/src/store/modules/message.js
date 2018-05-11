import api from '../../api/normal'
import moment from 'moment'
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
  async getMoreMessageList ({commit}, data) {
    let result = await api.getMessageList(data)
    if (result.data.code === 200) {
      commit('addMessageList', result.data.data)
    }
    return result
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
  },
  addMessageList (state, data) {
    for (let item of data) {
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.messageList = state.messageList.concat(data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
