import Http from '@/scripts/http'
const state = {
  data: {}
}

const mutations = {
  setData (state, {data}) {
    Object.assign(state.data, data)
  }
}

const actions = {
  getData ({commit}) {
    Http.get('/Api/Shared/GetSystemParamterList').then(data => {
      let systemParams = {}
      data.forEach(item => {
        systemParams[item.ParamKey] = item.ParamValue
      })
      commit('setData', {data: systemParams})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
