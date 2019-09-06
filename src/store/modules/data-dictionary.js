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
      let dataDictionary = {}
      data.forEach(item => {
        dataDictionary[item.ParamKey] = item.ParamValue
      })
      commit('setData', {data: dataDictionary})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
