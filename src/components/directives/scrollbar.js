import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

Vue.directive('scrollbar', {
  inserted (el) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      el.style.position = 'relative'
    }
    el.ps = new PerfectScrollbar(el, {})
  },
  componentUpdated (el) {
    if (el.ps) {
      el.ps.update()
    }
  }
})
