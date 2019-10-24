<template>
  <ComboGrid
    :name="name"
    :valueField="valueField"
    :textField="textField"
    :value="value"
    :data="componentData"
    :multiple="multiple"
    :textFormatter="textFormatter"
    :panelStyle="panelStyle">
    <div slot="grid" class="f-full f-column combo-grid-panel-ex">
      <div class="search">
        <SearchBox
          v-model="keyword"
          buttonIconCls="iconfont icon-search"
          placeholder="输入关键字搜索"
          @search="onSearch">
        </SearchBox>
      </div>
      <div class="grid f-full f-row" :style="{'height': multiple ? '201px' : '261px'}">
        <DataGrid
          ref="grid"
          class="combo-data-grid"
          :border="false"
          :total="total"
          :pageSize="pageSize"
          :lazy="lazy"
          :loading="loading"
          :pagination="pagination"
          :rowCss="rowCss"
          @pageChange="onPageChange"
          @rowSelect="onRowSelect"
          @rowUnselect="onRowUnselect"
          @rowClick="onRowClick">
          <slot></slot>
        </DataGrid>
      </div>
      <ul class="selections" v-scrollbar v-if="multiple">
        <li class="item" v-for="item in selectionRows" :key="item[valueField]">
          {{item[textField]}}
          <span class="remove" @click.stop="onRowClick(item)">
            <i class="iconfont icon-delete"></i>
          </span>
        </li>
      </ul>
    </div>
  </ComboGrid>
</template>

<script>
export default {
  name: 'ComboGridEx',
  props: {
    value: {},
    text: {
      type: String
    },
    name: {
      type: String
    },
    valueField: {
      type: String,
      default: 'id'
    },
    textField: {
      type: String,
      default: 'name'
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    },
    params: {},
    lazy: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      comboText: '',
      total: 0,
      pageIndex: 1,
      loading: false,
      keyword: '',
      selectionRows: [],
      selectionRowsMap: {},
      componentData: []
    }
  },
  created () {
    this.componentData = this.data
    this.load()
  },
  computed: {
    panelStyle () {
      return {
        'min-width': '700px',
        'height': '300px',
        'max-height': '300px',
        'border-color': '#999999'
      }
    }
  },
  methods: {
    load (pageIndex = 1) {
      if (!this.url) return
      this.pageIndex = pageIndex
      this.loading = true
      this.$http.post(this.url, {
        filter: {},
        page: pageIndex,
        size: this.pageSize
      }).then(result => {
        if (this.lazy) {
          this.total = result.totalSize
          this.componentData = result.list
        } else {
          this.total = result.length
          this.componentData = result
        }
        this.loading = false
        this.$emit('loadSuccess', {
          data: this.componentData,
          total: this.total,
          page: this.pageIndex,
          size: this.pageSize
        })
      }).catch(() => {
        this.loading = false
      })
    },
    onSearch () {
      this.load()
    },
    textFormatter (value) {
      let text = []
      for (let key in this.selectionRowsMap) {
        text.push(this.selectionRowsMap[key][this.textField])
      }
      return text.join(this.separator)
    },
    onPageChange (e) {
      // if (this.pageIndex === e.pageNumber) return
      this.load(e.pageNumber)
      this.$emit('pageChange', e)
    },
    emitInput () {
      let value = []
      let selectionRows = []
      for (let key in this.selectionRowsMap) {
        value.push(key)
        selectionRows.push(this.selectionRowsMap[key])
      }
      this.selectionRows = selectionRows
      if (this.multiple) {
        this.$emit('input', value)
      } else {
        this.$emit('input', value.length ? value[0] : '')
      }
    },
    onRowSelect (row) {},
    onRowUnselect (row) {},
    onRowClick (row) {
      if (!row) return
      let id = row[this.valueField]
      if (this.multiple) {
        if (this.selectionRowsMap[id]) {
          delete this.selectionRowsMap[id]
        } else {
          this.selectionRowsMap[id] = row
        }
      } else {
        this.selectionRowsMap = {
          [id]: row
        }
      }
      this.emitInput()
    },
    rowCss (row) {
      let id = row[this.valueField]
      return this.selectionRowsMap[id] ? 'datagrid-row-selected-ex' : null
    }
  },
  watch: {
    value (newValue) {
      // console.log(newValue)
    }
  }
}
</script>

<style lang="less">
@import url(../../theme/css/base.less);
.combo-data-grid {
  .datagrid-row-over {
    background: #fff9de;
    color: #333333;
  }
  .datagrid-row-selected {
    background-color: transparent;
    color: #333333;
    & > td {
      background-color: transparent;
      color: #333333;
    }
  }
  .datagrid-row-selected-ex {
    background-color: @info;
    color: #333333;
    & > td {
      background-color: @info;
      color: #333333;
    }
  }
}
.combo-grid-panel-ex {
  width: 100%;
  .search {
    padding: 3px;
    border-bottom: 1px solid #dddddd;
    .searchbox {
      width: 100%;
    }
    .icon-search {
      line-height: 28px;
      text-align: center;
    }
  }
  .grid {
    height: 201px;
  }
  .selections {
    height: 60px;
    position: relative;
    border-top: 1px solid #dddddd;
    margin: 0px;
    padding: 3px;
    overflow: hidden;
    .item {
      float: left;
      width: 90px;
      overflow: hidden;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      list-style: none;
      margin: 3px;
      padding: 0px 24px 0px 5px;
      box-sizing: border-box;
      height: 26px;
      border: 1px solid #dddddd;
      border-radius: 3px;
      line-height: 24px;
      background-color: #f8f8f8;
      .remove {
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0px;
        top: 0px;
        color: @danger;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        transition: 0.5s;
        border-radius: 0px 3px 3px 0px;
        &:hover {
          background-color: @warning;
          color: #ffffff;
        }
        i {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
