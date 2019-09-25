import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const scrollbar = {
  name: 'scrollbar',
  inserted (el) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      el.style.position = 'relative'
    }
    el.ps = new PerfectScrollbar(el, {})
  },
  componentUpdated (el) {
    if (el.ps && el.oldHeight !== el.offsetHeight) {
      el.ps.update()
      el.oldHeight = el.offsetHeight
    }
  }
}

export default scrollbar
