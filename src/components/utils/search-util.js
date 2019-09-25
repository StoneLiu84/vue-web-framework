import Vue from 'vue'
export default {
  getSearchItem (item) {
    return {
      Field: item.field,
      FindType: item.findType,
      Value: item.searchValue
    }
  },
  hasMatchRightBracket (searchItems, index) {
    let matchIndex = -1
    for (let i = index, len = searchItems.length; i < len; i++) {
      if ((i === index && searchItems[i].rightBracket) || (!searchItems[i].leftBracket && searchItems[i].rightBracket)) {
        matchIndex = i
        break
      }
      if (i !== index && searchItems[i].leftBracket) {
        break
      }
    }
    return matchIndex
  },
  hasMatchLeftBracket (searchItems, index) {
    let matchIndex = -1
    for (let i = index; i >= 0; i--) {
      if (searchItems[i].leftBracket) {
        matchIndex = i
        break
      }
    }
    return matchIndex
  },
  cancelInvalidLeftBracket (searchItems, index) {
    for (let i = index - 1; i >= 0; i--) {
      if (searchItems[i].leftBracket) {
        searchItems[i].leftBracket = false
        break
      }
      if (searchItems[i].rightBracket) {
        break
      }
    }
  },
  cancelInvalidRightBracket (searchItems, index) {
    for (let i = index; i >= 0; i--) {
      if (i !== index && searchItems[i].rightBracket) {
        searchItems[i].rightBracket = false
        break
      }
      if (searchItems[i].leftBracket) {
        break
      }
    }
    for (let i = index + 1, len = searchItems.length; i < len; i++) {
      if (searchItems[i].rightBracket) {
        searchItems[i].rightBracket = false
        break
      }
      if (searchItems[i].leftBracket) {
        break
      }
    }
  },
  createComponent ({componentName, propsData, parent} = {}) {
    if (!parent) return
    for (let i = parent.childNodes.length - 1; i >= 0; i--) {
      parent.removeChild(parent.childNodes[i])
    }
    const component = Vue.component(componentName)
    const Component = Vue.extend(component)
    let instance = new Component({
      el: document.createElement('div'),
      propsData: propsData
    })
    parent.appendChild(instance.$el)
    return instance
  }
}
