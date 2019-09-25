// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vx-easyui/dist/themes/bootstrap/easyui.css'
// import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import './theme/css/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import EasyUI from 'vx-easyui'
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN'
import CustomComponents from './components/'
import store from './store'

Vue.use(EasyUI, {
  locale
})
Vue.use(CustomComponents)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
