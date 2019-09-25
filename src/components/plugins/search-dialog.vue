<template>
  <DialogEx ref="dialog" title="高级查询" :buttons="dialogButtons" :width="600">
    <div class="search-list">
      <div class="search-list-item" v-for="(item, index) in searchItems" :key="index">
        <div class="col bracket">
          <div :class="{'active': item.leftBracket}" @click="onLeftBracketClick(item, index)"><span v-if="item.leftBracket">(</span></div>
        </div>
        <div class="col field">
          <ComboBoxEx :data="fieldData" v-model="item.field" @selectionChange="onFieldChange(item, index, $event)"></ComboBoxEx>
        </div>
        <div class="col findtype">
          <ComboBoxEx :data="findTypeOptions" v-model="item.findType"></ComboBoxEx>
        </div>
        <div class="col value" :ref="'component' + index">
          <!--<TextBox placeholder="请输入关键字"></TextBox>-->
        </div>
        <div class="col bracket">
          <div :class="{'active': item.rightBracket}" @click="onRightBracketClick(item, index)"><span v-if="item.rightBracket">)</span></div>
        </div>
        <div class="col join">
          <ComboBoxEx :data="joinTypeOptions" v-model="item.joinType" v-if="(index + 1) !== searchItems.length"></ComboBoxEx>
        </div>
        <div class="col delete">
          <span @click="onRemoveClick(index)" v-if="index !== 0"><i class="iconfont icon-delete"></i></span>
        </div>
      </div>
    </div>
  </DialogEx>
</template>

<script>
import SearchUtil from '../utils/search-util'
export default {
  name: 'SearchDialog',
  props: {
    options: {}
  },
  data () {
    return {
      dialogButtons: [
        {
          text: '搜索',
          iconCls: 'icon-search',
          btnCls: 'btn-success',
          handler: this.onSearch
        },
        {
          text: '添加条件',
          iconCls: 'icon-add',
          btnCls: 'btn-info',
          handler: this.addSearchItem
        },
        'close'
      ],
      fieldData: [],
      joinTypeOptions: [
        {text: 'AND', value: 'AND'},
        {text: 'OR', value: 'OR'}
      ],
      findTypeOptions: [
        { text: '等于', value: 'EQ' },
        { text: '不等于', value: 'NOT_EQ' },
        { text: '大于', value: 'GT' },
        { text: '大于等于', value: 'GTE' },
        { text: '小于', value: 'LT' },
        { text: '小于等于', value: 'LTE' },
        { text: '匹配', value: 'LIKE' },
        { text: '不匹配', value: 'NOT_LIKE' },
        { text: '范围', value: 'BETWEEN' },
        { text: '包含', value: 'IN' },
        { text: '不包含', value: 'NOT_IN' },
        { text: '为空', value: 'IS_NULL' },
        { text: '不为空', value: 'IS_NOT_NULL' }
      ],
      searchItems: []
    }
  },
  created () {
    this.initFieldData()
    this.addSearchItem()
  },
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    onSearch () {
      let searchParams = []; let searchItem = {}
      for (let i = 0, len = this.searchItems.length; i < len; i++) {
        let item = this.searchItems[i]
        if (!item.leftBracket && !item.rightBracket && !searchItem.Conditions) {
          // 单项查询
          searchItem = SearchUtil.getSearchItem(item)
          if (i !== 0) {
            searchItem.JoinType = this.searchItems[i - 1].joinType
          }
          searchParams.push(searchItem)
        } else {
          // 拼接查询
          if (item.leftBracket) {
            searchItem = { Conditions: [] }
            if (i !== 0) {
              searchItem.JoinType = this.searchItems[i - 1].joinType
            }
          }
          let conditionItem = SearchUtil.getSearchItem(item)
          if (i !== 0 && !item.leftBracket) {
            conditionItem.JoinType = this.searchItems[i - 1].joinType
          }
          searchItem.Conditions.push(conditionItem)
          if (item.rightBracket) {
            searchParams.push(searchItem)
            searchItem = {}
          }
        }
      }
      this.$emit('search', searchParams)
      this.$refs.dialog.close()
    },
    addSearchItem () {
      this.searchItems.push({
        field: this.options[0].field,
        findType: 'EQ',
        searchValue: '',
        searchOption: this.options[0],
        joinType: 'AND',
        leftBracket: false,
        rightBracket: false,
        instance: null
      })
    },
    initFieldData () {
      let fieldData = []
      this.options.forEach(item => {
        fieldData.push({
          value: item.field,
          text: item.text
        })
      })
      this.fieldData = fieldData
    },
    onFieldChange (item, index, event) {
      item.field = event.value
      for (let i = 0, len = this.options.length; i < len; i++) {
        if (this.options[i].field === item.field) {
          item.searchOption = this.options[i]
          break
        }
      }
      this.$nextTick(() => {
        item.instance = SearchUtil.createComponent({
          componentName: item.searchOption.component,
          propsData: Object.assign({ value: item.searchValue }, item.searchOption.propsData),
          parent: this.$refs['component' + index][0]
        })
        item.instance.$on('input', value => {
          item.searchValue = value
        })
      })
    },
    onRemoveClick (index) {
      let item = this.searchItems[index]
      if (item.leftBracket && !item.rightBracket) {
        let matchIndex = SearchUtil.hasMatchRightBracket(this.searchItems, index)
        if (matchIndex !== -1) {
          this.searchItems[matchIndex].rightBracket = false
        }
      } else if (!item.leftBracket && item.rightBracket) {
        let matchIndex = SearchUtil.hasMatchLeftBracket(this.searchItems, index)
        if (matchIndex !== -1) {
          this.searchItems[matchIndex].leftBracket = false
        }
      }
      this.searchItems.splice(index, 1)
    },
    onLeftBracketClick (item, index) {
      item.leftBracket = !item.leftBracket
      let matchIndex = SearchUtil.hasMatchRightBracket(this.searchItems, index)
      if (item.leftBracket) {
        // 选中左括号
        if (matchIndex !== -1) {
          // 取消前面无效的左括号
          SearchUtil.cancelInvalidLeftBracket(this.searchItems, index)
        } else {
          this.searchItems[index].rightBracket = true
        }
      } else {
        // 取消选中左括号
        if (matchIndex !== -1) {
          this.searchItems[matchIndex].rightBracket = false
        }
      }
    },
    onRightBracketClick (item, index) {
      item.rightBracket = !item.rightBracket
      let matchIndex = SearchUtil.hasMatchLeftBracket(this.searchItems, index)
      if (item.rightBracket) {
        // 选中右括号
        if (matchIndex !== -1) {
          // 取消无效的右括号
          SearchUtil.cancelInvalidRightBracket(this.searchItems, index)
        } else {
          this.searchItems[index].leftBracket = true
        }
      } else {
        // 取消选中右括号
        if (matchIndex !== -1) {
          this.searchItems[matchIndex].leftBracket = false
        }
      }
    }
  }
}
</script>

<style lang="less">
@import url('../../theme/css/base.less');
.search-list {
  padding: 5px;
  .search-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    .col {
      flex: 1;
      &.bracket {
        flex: none;
        width: 30px;
        text-align: center;
        div {
          width: 20px;
          height: 30px;
          line-height: 28px;
          box-sizing: border-box;
          text-align: center;
          margin: 0px auto;
          background-color: #e8e8e8;
          border: 1px solid #dddddd;
          color: #e8e8e8;
          border-radius: 3px;
          cursor: pointer;
          font-size: 16px;
          &.active {
            background-color: @info;
            border-color: @info-border;
            color: #ffffff;
          }
        }
      }
      &.field {
        width: 100px;
        flex: none;
        .textbox {
          width: 100%;
          border-radius: 3px 0px 0px 3px;
        }
      }
      &.findtype {
        width: 100px;
        flex: none;
        margin-left: -1px;
        .textbox {
          width: 100%;
          border-radius: 0px;
        }
      }
      &.value {
        margin-left: -1px;
        .textbox {
          width: 100%;
          border-radius: 0px 3px 3px 0px;
        }
      }
      &.delete {
        flex: none;
        width: 30px;
        text-align: center;
        line-height: 30px;
        span {
          padding: 3px;
          border-radius: 3px;
          cursor: pointer;
          color: @danger;
          transition: 0.5s;
          &:hover {
            background-color: @danger;
            color: #ffffff;
          }
          i {
            font-size: 14px;
          }
        }
      }
      &.join {
        width: 70px;
        flex: none;
        .textbox {
          width: 100%;
        }
      }
    }
    & + .search-list-item {
      margin-top: 8px;
    }
  }
}
</style>
