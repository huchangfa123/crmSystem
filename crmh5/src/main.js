// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/common.css'
import 'mint-ui/lib/style.css'
import './assets/iconfont.css'
import Vuex from 'vuex'
import store from './store/index'
import Mint from 'mint-ui'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Mint)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
