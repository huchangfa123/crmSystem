import api from '../../api/normal'
const state = {
  profitList: [],
  profitCount: 0
}

const getters = {
  profitList: state => state.profitList,
  profitCount: stata => state.profitCount
}

const actions = {
  async getProfitList ({commit}, data) {
    let result = await api.getProfitData(data)
    if (result.data.code === 200) {
      commit('initProfitList', result.data)
    }
    return result
  }
}

const mutations = {
  initProfitList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data.data) {
      item.userLevel = levelName[item.userLevel - 1]
    }
    state.profitList = data.data
    state.profitCount = data.count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
