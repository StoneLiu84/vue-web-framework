import Vue from 'vue'
import Vuex from 'vuex'
import right from './modules/right'
import userInfo from './modules/user-info'
import dataDictionary from './modules/data-dictionary'
import systemParams from './modules/system-params'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {
    token: null,
    loading: false
  },
  getters: {
    token: state => state.token,
    loading: state => state.loading,
    userInfo: state => state.userInfo.data,
    right: state => state.right.rightData,
    dataDictionary: state => state.dataDictionary.data
  },
  modules: {
    right,
    userInfo,
    dataDictionary,
    systemParams
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    loading (state, loading) {
      state.loading = loading
    }
  },
  strict: debug
})
