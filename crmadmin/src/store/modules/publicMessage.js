import api from '../../api/normal'

const state = {
  yunAddress: '',
  yunPassword: ''
}

const getters = {
  yunAddress: state => state.yunAddress,
  yunPassword: state => state.yunPassword
}

const actions = {
  getYunData ({commit}, data) {
    let result = await 
  }
}

const mutations = {
  setMainPageTop (state, mainPageTop) {
    state.mainPageTop = mainPageTop
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
