<template>
  <comboBox
    v-model="comboValue"
    :data="comboData"
    :editable="editable"
    :placeholder="placeholder"
    @selectionChange="onSelectionChange">
    <template :slot="slotVisible ? 'item' : ''" slot-scope="scope">
      <slot name="item" :row="scope.row"></slot>
    </template>
  </comboBox>
</template>

<script>
import SystemParams from '../mixins/system-params'
export default {
  name: 'ComboBoxEx',
  mixins: [SystemParams],
  props: {
    value: {
      type: [String, Number, Array]
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
      comboValue: '',
      comboData: []
    }
  },
  created () {
    this.comboValue = this.value || ''
    this.comboData = this.data || []
    if (this.systemParams) {
      this.getSystemParams().then(data => {
        this.comboData = data
      }).catch(() => {})
    }
  },
  methods: {
    onSelectionChange (e) {
      this.$emit('selectionChange', e)
    },
    loadData () {}
  },
  computed: {
    slotVisible () {
      return this.$slots.item || this.$scopedSlots.item
    }
  },
  watch: {
    value (newValue) {
      this.comboValue = newValue
    },
    data (newValue) {
      this.comboData = newValue
    },
    comboValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="less">

</style>
