// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vx-easyui/dist/themes/bootstrap/easyui.css'
import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import './theme/css/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import EasyUI from 'vx-easyui'
import store from './store'
import './components/directives/'

Vue.use(EasyUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
