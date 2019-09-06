import axios from 'axios'
import JSONP from 'jsonp'
// import { Message } from 'element-ui'
// import store from './store/'
import utility from './utility'
// import './prototype'
const qs = require('qs')
const http = axios.create({
  // baseURL: process.env.API_BASE_URL,
  timeout: 300000
})

/* http.interceptors.request.use(
  config => {
    if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['Token'] = store.getters.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
) */

let handleResponse = (response, resolve, reject) => {
  let data
  if (response.data) {
    data = response.data
  } else {
    data = response
  }
  if (data.IsSuccess !== undefined) {
    if (data.IsSuccess) {
      resolve(data.Data)
    } else {
      // Message.error(data.ErrorMessage)
      reject(data.ErrorMessage)
    }
  } else {
    resolve(data)
  }
}

export default {
  get (url, params = {}) {
    return new Promise(function (resolve, reject) {
      http.get(url, {
        params: Object.assign(params, { r: (new Date()).getTime() })
      }).then((response) => {
        handleResponse(response, resolve, reject)
      }).catch((result) => {
        // Message.error(result.message)
        reject(result.message)
      })
    })
  },
  post (url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'POST',
        url: url,
        data: qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      }).then((response) => {
        handleResponse(response, resolve, reject)
      }).catch((result) => {
        // Message.error(result.message)
        reject(result.message)
      })
    })
  },
  jsonp (url, params = {}) {
    url = utility.getUrl(url, params, true)
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
