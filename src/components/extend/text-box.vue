<template>
  <TextBox :name="name" :value="value" :multiline="multiline" :style="componentStyle" @input="onInput"></TextBox>
</template>

<script>
import InputBase from '../mixins/input-base'
export default {
  name: 'TextBoxEx',
  mixins: [InputBase],
  props: {
    multiline: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
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
  }
}
</script>

<style lang="less">

</style>
