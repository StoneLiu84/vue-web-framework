// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vx-easyui/dist/themes/bootstrap/easyui.css'
// import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import './theme/css/iconfont.css'
import Vue from 'vue'
import App from './App'
import Router from './router'
import EasyUI from 'vx-easyui'
import EasyUIlocale from 'vx-easyui/dist/locale/easyui-lang-zh_CN'
import CustomComponents from './components/'
import Store from './store'
import Http from './scripts/http'
import Utility from './scripts/utility'

Vue.use(EasyUI, {
  locale: EasyUIlocale
})
Vue.use(CustomComponents)
Vue.config.productionTip = false
Vue.prototype.$http = Http
Vue.prototype.$utility = Utility

Vue.prototype.$alert = msg => {
  Vue.prototype.$messager.alert({
    title: '警告',
    borderType: 'none',
    msg
  })
}

Vue.prototype.$confirm = msg => {
  return new Promise((resolve) => {
    Vue.prototype.$messager.confirm({
      title: '确认',
      borderType: 'none',
      msg,
      result (r) {
        if (r) {
          resolve()
        }
      }
    })
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: { App },
  template: '<App/>'
})
