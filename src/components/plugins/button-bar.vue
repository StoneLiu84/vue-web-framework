<template>
  <div class="button-bar">
    <LinkButtonEx
      v-for="(btn, index) in componentButtons"
      :key="index"
      :iconCls="btn.iconCls"
      :btnCls="btn.btnCls"
      :text="btn.text"
      :disabled="btn.disabled"
      @click="btn.handler">
    </LinkButtonEx>
    <slot></slot>
  </div>
</template>

<script>
import Right from '../mixins/right'
export default {
  name: 'ButtonBar',
  mixins: [Right],
  props: {
    buttons: {
      type: Array,
      default: () => ['add', 'delete']
    }
  },
  data () {
    return {
      componentButtons: [],
      defaultButtons: {
        add: { text: '新增', iconCls: 'icon-add', btnCls: 'btn-primary', handler: () => { this.onButtonClick('add') } },
        delete: { text: '删除', iconCls: 'icon-delete', btnCls: 'btn-danger', handler: () => { this.onButtonClick('delete') } },
        export: { text: '导出', iconCls: 'icon-export', btnCls: 'btn-warning', handler: () => { this.onButtonClick('export') } },
        import: { text: '导入', iconCls: 'icon-import', btnCls: 'btn-info', handler: () => { this.onButtonClick('import') } }
      }
    }
  },
  created () {
    this.initButtons()
  },
  methods: {
    onButtonClick (type) {
      this.$emit('buttonClick', type)
    },
    initButtons () {
      let componentButtons = []
      this.buttons.forEach(item => {
        if (typeof item === 'string') {
          componentButtons.push(Object.assign({
            disabled: !this.getRight(item)
          }, this.defaultButtons[item]))
        } else {
          componentButtons.push(Object.assign({
            disabled: false
          }, item))
        }
      })
      this.componentButtons = componentButtons
    }
  }
}
</script>

<style lang="less">
.button-bar {
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
  padding: 5px 10px;
  overflow: hidden;
  .l-btn {
    float: left;
  }
  .l-btn + .l-btn {
    margin-left: 8px;
  }
}
</style>
