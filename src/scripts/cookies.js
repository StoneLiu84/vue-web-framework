export default {
  get (name) {
    var arr = null
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr === document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  set (name, value) {
    var Days = 30
    var expires = new Date()
    expires.setTime(expires.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + expires.toGMTString()
  },
  remove (name) {
    var expires = new Date()
    expires.setTime(expires.getTime() - 1)
    var cval = this.get(name)
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + expires.toGMTString()
    }
  }
}
