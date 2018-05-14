import api from '../../api/normal'
import moment from 'moment'

const state = {
  orderList: [],
  orderCount: 0
}

const getters = {
  orderList: state => state.orderList,
  orderCount: state => state.orderCount
}

const actions = {
  async getOrderList ({commit}, data) {
    let result = await api.getOrderList(data)
    if (result.data.code) {
      commit('initOrderList', result.data)
    }
    return result
  }
}

const mutations = {
  initOrderList (state, data) {
    let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
    let stateName = ['待接单', '已接单', '已拒绝', '已出货', '交易已确认', '正在申请取消', '已取消']
    for (let item of data.data) {
      item.fromUserLevel = levelName[item.fromUserLevel - 1]
      item.toUserLevel = levelName[item.toUserLevel - 1]
      item.state = stateName[item.state - 1]
      item.createAt = moment(item.createAt).format('MM-DD HH:mm')
    }
    state.orderList = data.data
    state.orderCount = data.count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
