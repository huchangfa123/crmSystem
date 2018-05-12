import api from '../../api/normal'
const state = {
  profitList: []
}

const getters = {
  profitList: state => state.profitList
}

const actions = {
  async getProfitList ({commit}, data) {
    let result = await api.getProfitList()
    if (result.data.code === 200) {
      commit('initProfitList', result.data.data)
    }
    return result
  }
}

const mutations = {
  initProfitList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data) {
      item.profit[0].agent = levelName[item.profit[0].agent - 1]
    }
    state.profitList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
