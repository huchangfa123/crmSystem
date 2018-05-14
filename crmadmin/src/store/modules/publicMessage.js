import api from '../../api/normal'

const state = {
  yunData: []
}

const getters = {
  yunData: state => state.yunData
}

const actions = {
  async getYunData ({commit}, data) {
    let result = await api.getYunData()
    commit('initData', result.data.data)
    return result
  },
  async addYunData ({commit}, data) {
    let result = await api.addYunData(data)
    commit('addData', data)
    return result
  },
  async editYunData ({commit}, data) {
    let result = await api.editYunData(data)
    commit('editData', data)
    return result
  }
}

const mutations = {
  initData (state, data) {
    state.yunData = data
  },
  addData (state, data) {
    state.yunData = data
  },
  editData (state, data) {
    state.yunData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
