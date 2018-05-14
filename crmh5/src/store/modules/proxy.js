import api from '../../api/normal'
import moment from 'moment'

const state = {
  myRecommendList: [],
  lowerLevelList: [],
  myUpgraderList: [],
  otherUpgradeList: []
}

const getters = {
  myRecommendList: state => state.myRecommendList,
  lowerLevelList: state => state.lowerLevelList,
  myUpgraderList: state => state.myUpgraderList,
  otherUpgradeList: state => state.otherUpgradeList
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
  },
  async applyLevel ({commit}, data) {
    let result = await api.levelUp(data)
    return result
  },
  async applyActive ({commit}, data) {
    let result = await api.activeLevelUp(data)
    return result
  },
  async getMyUpgradeList ({commit}, data) {
    let result = await api.myUpgradeList()
    if (result.data.code === 200) {
      commit('initMyUpgradeList', result.data.data)
    }
    return result
  },
  async getOtherUpgradeList ({commit}, data) {
    let result = await api.otherUpgradeList()
    if (result.data.code === 200) {
      commit('initOtherUpgradeList', result.data.data)
    }
    return result
  }
}

const mutations = {
  initRecommendList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data) {
      item.toUserLevel = levelName[item.toUserLevel - 1]
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.myRecommendList = data
  },
  initLowerLevelList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    for (let item of data) {
      item.level = levelName[item.level - 1]
      item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
    }
    state.lowerLevelList = data
  },
  initMyUpgradeList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    let deelName = ['等待处理', '批准升级', '拒绝申请']
    for (let item of data) {
      item.applyLevel = levelName[item.applyLevel - 1]
      item.deel = deelName[item.deel - 1]
      item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
    }
    state.myUpgraderList = data
  },
  initOtherUpgradeList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    let deelName = ['等待处理', '批准升级', '拒绝申请']
    for (let item of data) {
      item.applyLevel = levelName[item.applyLevel - 1]
      item.deel = deelName[item.deel - 1]
      item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
    }
    state.otherUpgradeList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
