import api from '../../api/normal'
const state = {
  userData: {},
  addressList: []
}

const getters = {
  userData: state => state.userData,
  addressList: state => state.addressList
}

const actions = {
  async getUserData ({commit}, data) {
    let result = await api.getUserData()
    if (result.code === 200) {
      commit('initUserData', result.data)
    }
    return result
  },

  async getAddressList ({commit}, data) {
    let result = await api.getAddressList()
    if (result.code === 200) {
      commit('initAddressList', result.data)
    }
    return result
  },

  async addAddress ({commit}, data) {
    let result = await api.addAddress(data)
    return result
  },

  async delAddress ({commit}, data) {
    let result = await api.delAddress(data)
    if (result.code === 200) {
      commit('delAddress', data)
    }
    return result
  },

  async editAddress ({commit}, data) {
    let result = await api.editAddress(data)
    return result
  },

  async setDefaultAddress ({commit}, data) {
    let result = await api.setDefaultAddress(data)
    return result
  },

  async editUserMessage ({commit}, data) {
    let result = await api.editUserMessage(data)
    if (result.data.code === 200) {
      commit('editUserData', data)
    }
    return result
  }
}

const mutations = {
  initUserData (state, data) {
    state.userData = data
    if (data.isActive) {
      sessionStorage.setItem('isActived', true)
    }
  },
  initAddressList (state, data) {
    state.addressList = data
    console.log('curaddress', state.addressList)
  },
  delAddress (state, data) {
    let index = 0
    for (let item of state.addressList) {
      if (item.id === data.id) {
        state.addressList.splice(index, 1)
        return
      } else {
        index++
      }
    }
  },
  editUserData (state, data) {
    state.userData.avatar = data.avatar
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
