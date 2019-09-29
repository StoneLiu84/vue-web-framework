<template>
  <MenuButton :text="text" :iconCls="iconClass" :btnCls="btnCls">
    <slot></slot>
  </MenuButton>
</template>

<script>
export default {
  name: 'MenuButtonEx',
  props: {
    text: {
      type: String
    },
    iconCls: {
      type: String
    },
    btnCls: {
      type: String
    },
    iconFont: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconClass () {
      if (this.iconCls) {
        return (this.iconFont ? 'iconfont ' : '') + this.iconCls
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less">

</style>
