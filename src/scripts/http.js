import Axios from 'axios'
import JSONP from 'jsonp'
import Vue from 'vue'
import Store from '../store/'
import Utility from './utility'

const http = Axios.create({
  timeout: 300000
})

http.interceptors.request.use(
  config => {
    if (Store.getters.token) {
      config.headers['Authorization'] = Store.getters.token.token_type + ' ' + Store.getters.token.access_token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

let handleResponse = (response, resolve, reject) => {
  let result = null
  if (response.data) {
    result = response.data
  } else {
    result = response
  }
  if (result.code !== undefined) {
    if (!result.code) {
      resolve(result.data)
    } else {
      alertMesage(result.msg)
      reject(result)
    }
  } else {
    resolve(result)
  }
}

let alertMesage = message => {
  if (!message) return
  Vue.prototype.$messager.alert({
    title: '警告',
    msg: message
  })
}

export default {
  get (url, params = {}) {
    return new Promise(function (resolve, reject) {
      http.get(url, {
        params: Object.assign(params, { r: (new Date()).getTime() })
      }).then((response) => {
        handleResponse(response, resolve, reject)
      }).catch((result) => {
        alertMesage(result.message)
        reject(result.message)
      })
    })
  },
  post (url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'POST',
        url: url,
        data,
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        handleResponse(response, resolve, reject)
      }).catch((result) => {
        alertMesage(result.message)
        reject(result.message)
      })
    })
  },
  jsonp (url, params = {}) {
    url = Utility.getUrl(url, params, true)
    return new Promise((resolve, reject) => {
      JSONP(url, {
        param: 'jsonp_callback',
        name: 'jsonp_callback' + (new Date()).getTime()
      }, (err, result) => {
        if (err) {
          reject(err)
        } else {
          handleResponse(result, resolve, reject)
        }
      })
    })
  }
}
