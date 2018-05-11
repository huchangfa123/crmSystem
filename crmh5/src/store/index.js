import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import user from './modules/user'
import order from './modules/order'
import message from './modules/message'
import proxy from './modules/proxy'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    user,
    order,
    message,
    proxy
  },
  actions
})
