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
    <SearchDialog ref="dialog" :options="options" @search="onSearchAdvanced"></SearchDialog>
  </div>
</template>

<script>
import SearchUtil from '../utils/search-util'
import SearchDialog from './search-dialog'
export default {
  name: 'SearchBar',
  components: {
    SearchDialog
  },
  props: {
    options: {}
  },
  data () {
    return {
      selectedOption: {},
      fieldData: [],
      componentInstance: null,
      searchValue: ''
    }
  },
  created () {
    this.initFieldData()
  },
  mounted () {
    this.createComponent()
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
        this.createComponent()
      }
    },
    onSearch () {
      this.$emit('search', [
        {
          Field: this.selectedOption.field,
          FindType: 'EQ',
          Value: this.searchValue
        }
      ])
    },
    onSearchAdvanced (params) {
      this.$emit('search', params)
    },
    createComponent () {
      this.componentInstance = SearchUtil.createComponent({
        componentName: this.selectedOption.component,
        propsData: this.selectedOption.propsData,
        parent: this.$refs.input
      })
      this.componentInstance.$on('input', value => {
        this.searchValue = value
      })
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
