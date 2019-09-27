export default {
  computed: {
    right () {
      let parent = this.$parent
      let right = {}
      while (parent) {
        if (parent.$options.componentName === 'PageBase') {
          right = parent.right
          break
        } else {
          parent = parent.$parent
        }
      }
      return right
    }
  },
  methods: {
    getRight (action) {
      if (this.right[action] === undefined) {
        return true
      } else {
        return this.right[action]
      }
    }
  }
}
