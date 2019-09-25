<template>
  <LinkButton
    :iconCls="iconClass"
    :btnCls="btnCls"
    :disabled="disabled"
    :iconAlign="iconAlign"
    :size="size"
    :toggle="toggle"
    :selected="selected"
    :plain="plain"
    :text="text"
    @click="onClick">
    <slot></slot>
  </LinkButton>
</template>

<script>
export default {
  name: 'LinkButtonEx',
  props: {
    iconCls: {
      type: String
    },
    iconfont: {
      type: Boolean,
      default: true
    },
    btnCls: {
      type: String
    },
    text: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    iconAlign: {
      type: String,
      default: 'left'
    },
    size: {
      type: String,
      default: 'small'
    },
    toggle: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    iconClass () {
      if (this.iconCls) {
        return (this.iconfont ? 'iconfont ' : '') + this.iconCls
      } else {
        return ''
      }
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less">

</style>
