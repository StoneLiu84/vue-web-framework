<template>
  <Dialog
    ref="dialog"
    :title="title"
    :dialogStyle="dialogStyle"
    :modal="modal"
    :borderType="borderType"
    :closed="closed"
    :draggable="draggable"
    bodyCls="f-column"
    @open="onOpen"
    @close="onClose">
    <div class="f-full">
      <slot></slot>
    </div>
    <div class="dialog-button">
      <LinkButton iconCls="iconfont icon-save" btnCls="btn-info">保存</LinkButton>
      <LinkButton iconCls="iconfont icon-roundclose" btnCls="btn-default" @click="close">关闭</LinkButton>
    </div>
  </Dialog>
</template>

<script>
export default {
  name: 'DialogEx',
  props: {
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 500
    },
    modal: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    borderType: {
      type: String,
      default: 'none'
    },
    closed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogStyle () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    }
  },
  methods: {
    open () {
      this.$refs.dialog.open()
      this.$nextTick(() => {
        this.$refs.dialog.center()
      })
    },
    close () {
      this.$refs.dialog.close()
    },
    onOpen () {
      this.$emit('open')
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
