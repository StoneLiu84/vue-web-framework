export default {
  props: {
    value: {},
    name: {
      type: String
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    }
  }
}
