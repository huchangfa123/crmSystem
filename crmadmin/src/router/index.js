import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../components/loginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    }
  ]
})
