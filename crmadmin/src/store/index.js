import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import goods from './modules/goods'
import users from './modules/users'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    goods,
    users,
    order
  }
})
