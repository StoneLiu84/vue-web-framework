<template>
  <comboBox
    :value="comboValue"
    :name="name"
    :data="comboData"
    :editable="editable"
    :placeholder="placeholder"
    @input="onInput"
    @selectionChange="onSelectionChange">
    <template :slot="slotVisible ? 'item' : ''" slot-scope="scope">
      <slot name="item" :row="scope.row"></slot>
    </template>
  </comboBox>
</template>

<script>
import SystemParams from '../mixins/system-params'
import InputBase from '../mixins/input-base'
export default {
  name: 'ComboBoxEx',
  mixins: [InputBase, SystemParams],
  props: {
    value: {
      type: [String, Number, Array, Boolean]
    },
    data: {
      type: Array
    },
    valueField: {
      type: String
    },
    textField: {
      type: String
    },
    editable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      comboData: []
    }
  },
  created () {
    this.comboData = this.data || []
    if (this.systemParams) {
      this.getSystemParams().then(data => {
        this.comboData = data
      }).catch(() => {})
    }
  },
  methods: {
    load () {},
    onInput (value) {
      let newValue = value
      if (typeof this.value === 'boolean') {
        newValue = (value === 1)
      }
      this.$emit('input', newValue)
    },
    onSelectionChange (e) {
      this.$emit('selectionChange', e)
    }
  },
  computed: {
    slotVisible () {
      return this.$slots.item || this.$scopedSlots.item
    },
    comboValue () {
      if (typeof this.value === 'boolean') {
        return (this.value ? 1 : 0)
      } else {
        return this.value || ''
      }
    }
  },
  watch: {
    data (newValue) {
      this.comboData = newValue
    }
  }
}
</script>

<style lang="less">

</style>
