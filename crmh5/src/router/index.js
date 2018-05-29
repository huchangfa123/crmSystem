import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/mainPage'
import userMessagePage from '../views/userBlock/userMessagePage'
import addAddressPage from '../views/userBlock/addAddressPage'
import managerAddressPage from '../views/userBlock/managerAddressPage'
import credentialsPage from '../views/userBlock/credentialsPage'
import lowerProxyPage from '../views/proxyBlock/lowerProxyPage'
import proxyStructurePage from '../views/proxyBlock/proxyStructurePage'
import myRecommendPage from '../views/proxyBlock/myRecommendPage'
import levelUpPage from '../views/proxyBlock/levelUpPage'
import reviewProxyPage from '../views/proxyBlock/proxyReviewPage'
import myOrderPage from '../views/orderBlock/myOrderPage'
import otherOrderPage from '../views/orderBlock/otherOrderPage'
import onlineOrderPage from '../views/orderBlock/onlineOrderPage'
import ensureOrderPage from '../views/orderBlock/ensureOrderPage'
import profitPage from '../views/goodsBlock/profitPage'
import messagePage from '../views/messagePage'
import registerPage from '../views/auth/registerPage'
import loginPage from '../views/auth/loginPage'
import changePassPage from '../views/auth/changePassPage'
import inviteCodePage from '../views/userBlock/inviteCodePage'
import publicMessagePage from '../views/userBlock/publicMessagePage'

Vue.use(Router)

let router = new Router({
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
      path: '/changePass',
      name: 'changePassPage',
      component: changePassPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/userMessage',
      name: 'userMessage',
      component: userMessagePage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/addAddress',
      name: 'addAddressPage',
      component: addAddressPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/managerAddress',
      name: 'managerAddressPage',
      component: managerAddressPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/credentials',
      name: 'credentialsPage',
      component: credentialsPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/inviteCode',
      name: 'inviteCodePage',
      component: inviteCodePage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/publicMessage',
      name: 'publicMessagePage',
      component: publicMessagePage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/lowerProxy',
      name: 'lowerProxyPage',
      component: lowerProxyPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/proxyStructure',
      name: 'proxyStructurePage',
      component: proxyStructurePage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/myRecommend',
      name: 'myRecommendPage',
      component: myRecommendPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/levelUp',
      name: 'levelUpPage',
      component: levelUpPage
    },
    {
      path: '/reviewProxy',
      name: 'reviewProxyPage',
      component: reviewProxyPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/myOrder',
      name: 'myOrderPage',
      component: myOrderPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/otherOrder',
      name: 'otherOrderPage',
      component: otherOrderPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/onlineOrder',
      name: 'onlineOrderPage',
      component: onlineOrderPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/ensureOrder',
      name: 'ensureOrderPage',
      component: ensureOrderPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/profit',
      name: 'profitPage',
      component: profitPage,
      meta: {
        requireActive: true
      }
    },
    {
      path: '/message',
      name: messagePage,
      component: messagePage
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'loginPage' && to.name !== 'registerPage' && to.name !== 'changePassPage') {
    if (sessionStorage.getItem('actoken')) {
      if (to.matched.some((r) => r.meta.requireActive)) {
        if (sessionStorage.getItem('isActived') !== 'false') {
          next()
        } else {
          next({
            path: '/main',
            query: {isActived: false}
          })
        }
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
