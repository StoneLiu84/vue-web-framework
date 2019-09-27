<template>
  <TextBox v-model="componentValue" :multiline="multiline" :style="componentStyle"></TextBox>
</template>

<script>
export default {
  name: 'TextBoxEx',
  props: {
    value: {},
    multiline: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
    }
  },
  data () {
    return {
      componentValue: ''
    }
  },
  computed: {
    componentStyle () {
      if (this.multiline && this.height) {
        return {
          height: this.height + 'px'
        }
      } else {
        return null
      }
    }
  },
  watch: {
    value (newValue) {
      this.componentValue = newValue
    },
    componentValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="less">

</style>
