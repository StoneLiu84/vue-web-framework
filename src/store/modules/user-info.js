import http from '@/scripts/http'
import utility from '@/scripts/utility'
const state = {
  data: {},
  isSystemAdmin: null
}

const mutations = {
  setUserInfo (state, { userInfo }) {
    state.data = userInfo
  },
  systemAdmin (state, isSystemAdmin) {
    state.isSystemAdmin = isSystemAdmin
  }
}

const actions = {
  checkLogin ({ commit, dispatch }, {callback} = {}) {
    http.jsonp(process.env.API_BASE_URL + '/services/CheckLogin.ashx').then(result => {
      if (result.Authentication) {
        commit('setToken', { token: result.Token }, { root: true })
        commit('setUserInfo', { userInfo: result.Data })
      }

      if (utility.isFunction(callback)) {
        callback.call(this, {
          authentication: result.Authentication,
          data: result.Data
        })
      }
    }).catch(() => { })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
