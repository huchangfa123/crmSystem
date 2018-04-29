import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui
  },
  actions
})
