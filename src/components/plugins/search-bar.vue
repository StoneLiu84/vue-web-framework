<template>
  <div class="search-bar">
    <div class="body">
      <div class="col">
        <ComboBoxEx
          :value="selectedOption.field"
          :data="fieldData"
          @selectionChange="onSelectionChange">
        </ComboBoxEx>
      </div>
      <div class="col" ref="input"></div>
      <div class="col">
        <LinkButtonEx
          iconCls="icon-search"
          btnCls="btn-default"
          @click="onSearch"
          text="搜索">
        </LinkButtonEx>
      </div>
    </div>
    <DialogEx ref="dialog" title="高级查询" :buttons="dialogButtons" :width="600">
      <p style="text-align:center;margin:20px 0;font-size:16px">The Dialog Content.</p>
    </DialogEx>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'SearchBar',
  props: {
    options: {}
  },
  data () {
    return {
      selectedOption: {},
      fieldData: [],
      componentInstance: null,
      searchValue: '',
      dialogButtons: [
        {
          text: '确定',
          iconCls: 'icon-task_done',
          btnCls: 'btn-primary',
          handler: this.onSearchAdvanced
        },
        'close'
      ]
    }
  },
  created () {
    this.initFieldData()
  },
  mounted () {
    this.createComponent({
      name: this.selectedOption.component,
      props: this.selectedOption.props,
      parent: this.$refs.input
    })
  },
  methods: {
    initFieldData () {
      let fieldData = []
      this.options.forEach(item => {
        fieldData.push({
          value: item.field,
          text: item.text
        })
      })
      fieldData.push({
        value: 'Advanced',
        text: '高级'
      })
      this.fieldData = fieldData
      this.selectedOption = this.options[0]
    },
    onSelectionChange (e) {
      if (!e) return
      if (e.value === 'Advanced') {
        let selectedOption = this.selectedOption
        this.$refs.dialog.open()
        this.selectedOption = {}
        this.$nextTick(() => {
          this.selectedOption = selectedOption
        })
      } else {
        if (this.selectedOption.field === e.value || !this.selectedOption) return
        this.searchValue = ''
        for (let i = 0, len = this.options.length; i < len; i++) {
          if (this.options[i].field === e.value) {
            this.selectedOption = this.options[i]
            break
          }
        }
        this.createComponent({
          name: this.selectedOption.component,
          props: this.selectedOption.props,
          parent: this.$refs.input
        })
      }
    },
    onSearch () {
      this.$emit('search', [
        {
          Field: this.selectedOption.field,
          FindType: 'LIKE',
          Value: this.searchValue
        }
      ])
    },
    onSearchAdvanced () {
      this.$refs.dialog.close()
    },
    createComponent ({name, props, parent} = {}) {
      if (!parent) return
      if (this.componentInstance) {
        parent.removeChild(this.componentInstance.$el)
      }
      const component = Vue.component(name)
      const Component = Vue.extend(component)
      this.componentInstance = new Component({
        el: document.createElement('div'),
        propsData: props
      })
      this.componentInstance.$on('input', value => {
        this.searchValue = value
      })
      parent.appendChild(this.componentInstance.$el)
    }
  }
}
</script>

<style lang="less">
.search-bar {
  overflow: hidden;
  position: absolute;
  width: 400px;
  right: 10px;
  top: 5px;
  .body {
    display: flex;
    flex-direction: row;
    align-items: center;
    .col {
      flex: 1;
      margin-left: -1px;
      &:first-of-type {
        margin-left: 0px;
        flex: none;
        width: 120px;
        .textbox {
          border-radius: 3px 0px 0px 3px;
        }
      }
      &:last-of-type {
        flex: none;
        width: 58px;
        .l-btn {
          border-radius: 0px 3px 3px 0px;
          .l-btn-text {
            line-height: 28px;
            height: 28px;
          }
        }
      }
    }
    .textbox {
      border-radius: 0px;
      width: 100%;
    }
  }
}
</style>
