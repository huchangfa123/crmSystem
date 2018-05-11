import api from '../../api/normal'
import moment from 'moment'

const state = {
  myRecommendList: [],
  lowerLevelList: []
}

const getters = {
  myRecommendList: state => state.myRecommendList,
  lowerLevelList: state => state.lowerLevelList
}

const actions = {
  async getRecommendList ({commit}, data) {
    let result = await api.getMyRecommend()
    commit('initRecommendList', result.data.data)
    return result
  },
  async getLowerLevelList ({commit}, data) {
    let result = await api.getMyLowerLevel(data)
    commit('initLowerLevelList', result.data.data)
    return result
  }
}

const mutations = {
  initRecommendList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data) {
      item.toUserLevel = levelName[item.toUserLevel + 1]
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.myRecommendList = data
  },
  initLowerLevelList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data) {
      item.level = levelName[item.level + 1]
      item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
    }
    state.lowerLevelList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
