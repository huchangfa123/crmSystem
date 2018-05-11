import api from '../../api/normal'
import moment from 'moment'
const state = {
  goodsList: [],
  curOrderData: {},
  myBuyList: [],
  myOrderList: []
}

const getters = {
  goodsList: state => state.goodsList,
  curOrderData: state => state.curOrderData,
  myBuyList: state => state.myBuyList,
  myOrderList: state => state.myOrderList
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
  async createOrder ({commit}, data) {
    let result = await api.createOrder(data)
    return result
  },
  async getMyBuyOrder ({commit}, data) {
    let result = await api.getMyBuyOrder(data)
    commit('initMyBuyList', result.data.data)
    return result
  },
  async getMoreMyBuyOrder ({commit}, data) {
    let result = await api.getMyBuyOrder(data)
    commit('addMyBuyList', result.data.data)
    return result
  },
  async getMyOrderList ({commit}, data) {
    let result = await api.getMyOrder(data)
    commit('initMyOrderList', result.data.data)
    return result
  },
  async getMoreMyOrderList ({commit}, data) {
    let result = await api.getMyOrder(data)
    commit('addMyOrderList', result.data.data)
    return result
  },
  async updateOrderState ({commit}, data) {
    let result = await api.updateOrderState(data)
    if (result.data.code === 200) {
      commit('delChangeItem', data)
    }
    return result
  },
  cleanCurOrderData ({commit}, data) {
    commit('cleanCurOrderData')
  }
}

const mutations = {
  initGoodsList (state, data) {
    state.goodsList = data
  },
  setCurOrderData (state, data) {
    state.curOrderData = data
  },
  cleanCurOrderData (state, data) {
    state.curOrderData = {}
  },
  initMyBuyList (state, data) {
    state.myBuyList = data
  },
  addMyBuyList (state, data) {
    for (let item of data) {
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.myBuyList = state.myBuyList.concat(data)
  },
  initMyOrderList (state, data) {
    state.myOrderList = data
  },
  addMyOrderList (state, data) {
    for (let item of data) {
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.myBuyList = state.myBuyList.concat(data)
  },
  delChangeItem (state, data) {
    if (state.myOrderList.length !== 0) {
      state.myOrderList.splice(data.index, 1)
    }
    if (state.myBuyList.length !== 0) {
      state.myBuyList.splice(data.index, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
