import api from '../../api/normal'
const state = {
  goodsList: [],
  curOrderData: {}
}

const getters = {
  goodsList: state => state.goodsList,
  curOrderData: state => state.curOrderData
}

const actions = {
  async getGoodsList ({commit}, data) {
    let result = await api.getGoodsList()
    if (result.data.code === 200) {
      commit('initGoodsList', result.data.data)
    }
    return result
  },
  setCurOrderData ({commit}, data) {
    commit('setCurOrderData', data)
  },
  async uploadPayPic ({commit}, data) {
    let result = await api.UploadPic(data)
    return result
  }
}

const mutations = {
  initGoodsList (state, data) {
    state.goodsList = data
  },
  setCurOrderData (state, data) {
    state.curOrderData = data
    console.log('123', state.curOrderData)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
