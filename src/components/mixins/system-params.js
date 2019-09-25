export default {
  name: 'SystemParams',
  props: {
    systemParams: {
      type: String
    }
  },
  methods: {
    getSystemParams () {
      return new Promise((resolve, reject) => {
        let data = []
        setTimeout(() => {
          resolve(data)
        }, 1000)
      })
    }
  }
}
