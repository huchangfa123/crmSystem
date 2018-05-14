import api from '../../api/normal'
import moment from 'moment'
const state = {
  userList: [],
  listCount: 0,
  reviewList: [],
  reviewCount: 0
}

const getters = {
  userList: state => state.userList,
  listCount: state => state.listCount,
  reviewList: stata => state.reviewList,
  reviewCount: state => state.reviewCount
}

const actions = {
  async getUserList ({commit}, data) {
    let result = await api.getUserList(data)
    if (result.data.code === 200) {
      commit('initUserList', {userList: result.data.data, count: result.data.count})
    }
    return result
  },
  async addUser ({commit}, data) {
    let result = await api.addUser(data)
    return result
  },
  async getReviewList ({commit}, data) {
    let result = await api.getReviewList(data)
    if (result.data.code === 200) {
      commit('initReviewList', result.data)
    }
    return result
  },
  async dealLevelUpApply ({commit}, data) {
    let result = await api.dealLevelUpApply(data)
    if (result.data.code === 200) {
      commit('editReviewList', data)
    }
    return result
  }
}

const mutations = {
  initUserList (state, data) {
    state.userList = data.userList
    state.listCount = data.count
  },
  initReviewList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    let stateName = ['待处理', '已批准', '已拒绝']
    for (let item of data.data) {
      item.applyUserLevel = levelName[item.applyUserLevel - 1] || '未激活'
      item.applyLevel = levelName[item.applyLevel - 1]
      item.state = stateName[item.deel - 1]
      item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
    }
    state.reviewList = data.data
    state.reviewCount = data.count
  },
  editReviewList (state, data) {
    let stateName = ['待处理', '已批准', '已拒绝']
    state.reviewList[data.index].state = stateName[data.deel - 1]
    state.reviewList[data.index].deel = parseInt(data.deel)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
