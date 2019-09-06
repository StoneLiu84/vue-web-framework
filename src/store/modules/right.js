const state = {
  rightData: []
}

const mutations = {
  setRight (state, { data }) {
    state.rightData = data
  }
}

const actions = {
  getRight ({ commit, rootGetters }, menu) {
    let data = []
    menu.forEach((item) => {
      let right = {}
      if (item.children) {
        item.children.forEach(action => {
          right[action.name] = true
        })
      }
      data.push({
        pageId: item.id,
        right
      })
    })
    commit('setRight', { data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
