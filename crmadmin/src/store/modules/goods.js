import api from '../../api/normal'
const state = {
  goodsList: []
}

const getters = {
  goodsList: state => state.goodsList
}

const actions = {
  async addGoods ({commit}, data) {
    let result = await api.addGoods(data)
    return result
  },
  async getGoodsList ({commit}, data) {
    let result = await api.getGoodsList()
    if (result.data.code === 200) {
      commit('initGoodsList', result.data.data)
    }
    return result
  },
  async delGoods ({commit}, data) {
    let result = await api.delGoods(data)
    if (result.data.code === 200) {
      commit('delGoods', data)
    }
    return result
  },
  async editGoods ({commit}, data) {
    let result = await api.editGoods(data)
    return result
  }
}

const mutations = {
  initGoodsList (state, data) {
    state.goodsList = data
  },
  delGoods (state, data) {
    let index = 0
    for (let item of state.goodsList) {
      if (item.id.toString() === data.id.toString()) {
        state.goodsList.splice(index, 1)
        break
      } else {
        index++
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
