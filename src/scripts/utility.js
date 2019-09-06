var utility = {
  isJson: function (obj) {
    var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
    return isjson
  },
  urlEncode: function (str) {
    str = (str + '').toString()
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
  },
  getUrl: function (url, params, addRandom) {
    var strParams = ''
    if (params != null && utility.isJson(params)) {
      for (var key in params) {
        if (!String.isNullOrEmpty(strParams)) {
          strParams += '&' + key + '=' + utility.urlEncode(params[key])
        } else {
          strParams = key + '=' + utility.urlEncode(params[key])
        }
      }
    }

    if (addRandom !== false) {
      if (!String.isNullOrEmpty(strParams)) {
        strParams += '&r=' + (new Date()).getTime()
      } else {
        strParams += 'r=' + (new Date()).getTime()
      }
    }

    if (!String.isNullOrEmpty(strParams)) {
      if (url.indexOf('?') > -1) {
        return url + '&' + strParams
      } else {
        return url + '?' + strParams
      }
    } else {
      return url
    }
  },
  newGuid: function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
  },
  isFunction (fn) {
    return fn !== undefined && typeof fn === 'function'
  },
  getCookie (name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  removeClass ($el, name) {
    if ($el.className.indexOf(name) > -1) {
      let className = $el.className.split(' ')
      for (let i = 0, len = className.length; i < len; i++) {
        if (className[i] === name) {
          className.splice(i, 1)
        }
      }
      $el.className = className.join(' ')
    }
  },
  addClass ($el, name) {
    if ($el.className.indexOf(name) === -1) {
      $el.className += ' ' + name
    }
  },
  queryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
}

export default utility
