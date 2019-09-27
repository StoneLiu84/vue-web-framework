export default {
  name: 'PageBase',
  componentName: 'PageBase',
  computed: {
    right () {
      return {
        add: true,
        search: true,
        save: true,
        delete: true,
        import: true,
        export: true
      }
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
