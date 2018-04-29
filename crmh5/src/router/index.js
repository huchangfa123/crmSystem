import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/mainPage'
import userMessagePage from '../views/userBlock/userMessagePage'
import addressPage from '../views/userBlock/addressPage'
import credentialsPage from '../views/userBlock/credentialsPage'
import lowerProxyPage from '../views/proxyBlock/lowerProxyPage'
import proxyStructurePage from '../views/proxyBlock/proxyStructurePage'
import myRecommendPage from '../views/proxyBlock/myRecommendPage'
import proxyReviewPage from '../views/proxyBlock/proxyReviewPage'
import levelUpPage from '../views/proxyBlock/levelUpPage'
import cancelUpgradePage from '../views/proxyBlock/cancelUpgradePage'
import myOrderPage from '../views/orderBlock/myOrderPage'
import otherOrderPage from '../views/orderBlock/otherOrderPage'
import onlineOrderPage from '../views/orderBlock/onlineOrderPage'
import myGoodsPage from '../views/goodsBlock/myGoodsPage'
import profitPage from '../views/goodsBlock/profitPage'
import messagePage from '../views/messagePage'
import registerPage from '../views/auth/registerPage'
import loginPage from '../views/auth/loginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'registerPage',
      component: registerPage
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/userMessage',
      name: 'userMessage',
      component: userMessagePage
    },
    {
      path: '/address',
      name: 'addressPage',
      component: addressPage
    },
    {
      path: '/credentials',
      name: 'credentialsPage',
      component: credentialsPage
    },
    {
      path: '/lowerProxy',
      name: 'lowerProxyPage',
      component: lowerProxyPage
    },
    {
      path: '/proxyStructure',
      name: 'proxyStructurePage',
      component: proxyStructurePage
    },
    {
      path: '/myRecommend',
      name: 'myRecommendPage',
      component: myRecommendPage
    },
    {
      path: '/proxyReview',
      name: 'proxyReviewPage',
      component: proxyReviewPage
    },
    {
      path: '/levelUp',
      name: 'levelUpPage',
      component: levelUpPage
    },
    {
      path: '/cancelUpgrade',
      name: 'cancelUpgradePage',
      component: cancelUpgradePage
    },
    {
      path: '/myOrder',
      name: 'myOrderPage',
      component: myOrderPage
    },
    {
      path: '/otherOrder',
      name: 'otherOrderPage',
      component: otherOrderPage
    },
    {
      path: '/onlineOrder',
      name: 'onlineOrderPage',
      component: onlineOrderPage
    },
    {
      path: '/myGoods',
      name: 'myGoodsPage',
      component: myGoodsPage
    },
    {
      path: '/profit',
      name: 'profitPage',
      component: profitPage
    },
    {
      path: '/message',
      name: messagePage,
      component: messagePage
    }
  ],
  mode: 'history'
})
