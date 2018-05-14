import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../views/loginPage'
import mainPage from '../views/mainPage'
import userMessagePage from '../views/userBlock/userMessagePage'
import addUserMessagePage from '../views/userBlock/addUserMessagePage'
import upgradeReviewPage from '../views/userBlock/upgradeReviewPage'
import orderMessagePage from '../views/orderBlock/orderMessagePage'
import goodsListPage from '../views/goodsBlock/goodsListPage'
import addGoodsPage from '../views/goodsBlock/addGoodsPage'
import adSettingPage from '../views/publicMessageBLock/adSettingPage'
import yunAddressPage from '../views/publicMessageBLock/yunAddressPage'
import companyDataPage from '../views/statisticsBlock/companyDataPage'
import ownDataPage from '../views/statisticsBlock/ownDataPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/main',
      name: 'mainPage',
      component: mainPage,
      children: [
        {
          path: '/userMessage',
          component: userMessagePage,
          meta: ['用户管理', '用户列表']
        },
        {
          path: '/addUser',
          component: addUserMessagePage,
          meta: ['用户管理', '添加用户']
        },
        {
          path: '/upgradeReview',
          component: upgradeReviewPage,
          meta: ['用户管理', '用户升级审核']
        },
        {
          path: '/orderMessage',
          component: orderMessagePage,
          meta: ['订单管理', '订单信息']
        },
        {
          path: '/addGoods',
          component: addGoodsPage,
          meta: ['商品管理', '添加商品']
        },
        {
          path: '/goodsList',
          component: goodsListPage,
          meta: ['商品管理', '商品信息']
        },
        {
          path: '/yunAddress',
          component: yunAddressPage,
          meta: ['公共信息管理', '云盘地址']
        },
        {
          path: '/adSetting',
          component: adSettingPage,
          meta: ['公共信息管理', '公告编写']
        },
        {
          path: '/companyData',
          component: companyDataPage,
          meta: ['数据统计', '平台盈利']
        },
        {
          path: '/ownData',
          component: ownDataPage,
          meta: ['数据统计', '个人盈利']
        }
      ]
    }
  ]
})
