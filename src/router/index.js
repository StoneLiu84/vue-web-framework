import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'
// import whileList from './whileList'
import routes from './routes'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes
})
// 获取数据字典
// store.dispatch('systemParams/getData')
// 设置路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 路由找不到页面
    next('/404')
  } else {
    store.commit('loading', true)
    /* if (String.isNullOrEmpty(store.getters.userInfo.UserID)) {
      store.dispatch('userInfo/checkLogin', {
        callback (result) {
          if (!result.authentication && !isRouteValidate(to)) {
            window.location.href = result.data + '?ReturnUrl=' + encodeURI(window.location.href.toString())
          } else {
            store.dispatch('menu/getData', () => { next() })
          }
        }
      })
    } else {
      store.dispatch('menu/getData', () => { next() })
    } */
    next()
  }
})

router.afterEach((to, from) => {
  setTimeout(() => {
    store.commit('loading', false)
  }, 500)
})

router.onError(() => {
  router.push('/error')
})

/* function isRouteValidate (page) {
  if (!String.isNullOrEmpty(store.getters.userInfo.UserID)) {
    return true
  } else if (isWhileList(page)) {
    return true
  } else {
    return false
  }
}

function isWhileList (page) {
  for (let i = 0, len = whileList.length; i < len; i++) {
    if (whileList[i] === page.path) {
      return true
    }
  }
  return false
} */
export default router
