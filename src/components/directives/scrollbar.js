import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const scrollbar = {
  name: 'scrollbar',
  inserted (el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      el.style.position = 'relative'
    }
    if (!el.ps) {
      vnode.context.$nextTick(() => {
        el.ps = new PerfectScrollbar(el, {})
      })
    }
  },
  componentUpdated (el, binding, vnode) {
    if (el.ps && el.oldHeight !== el.offsetHeight) {
      vnode.context.$nextTick(() => {
        el.ps.update()
      })
      el.oldHeight = el.offsetHeight
    }
  },
  unbind (el) {
    if (el.ps) {
      el.ps.destroy()
      el.ps = null
    }
  }
}

export default scrollbar
