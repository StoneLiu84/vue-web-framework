<template>
  <DataGrid
    :pagination="pagination"
    :data="componentData"
    :total="total"
    :pageSize="pageSize"
    :lazy="lazy"
    :loading="loading"
    :rowCss="rowCss"
    :style="gridStyle"
    :selectionMode="selectionMode"
    :border="border"
    @pageChange="onPageChange"
    @sortChange="onSortChange"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @rowDblClick="onRowDblClick">
    <GridColumn field="checkbox" width="30px" align="center" v-if="checkbox">
      <div slot="body" slot-scope="scope" @click.stop="onRowChecked(scope.row)">
        <CheckBox v-model="scope.row.checked"></CheckBox>
      </div>
    </GridColumn>
    <GridColumn ref="operation" field="operation" title="操作" :width="operationColumnWidth" align="center" v-if="operationVisible">
      <div slot="body" class="grid-operation-column" slot-scope="scope">
        <slot name="operation" :row="scope.row"></slot>
      </div>
    </GridColumn>
    <slot></slot>
  </DataGrid>
</template>

<script>
export default {
  name: 'DataGridEx',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 30
    },
    pagePosition: {
      type: String,
      default: 'bottom'
    },
    pagination: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    selectionMode: {
      type: String
    },
    url: {
      type: String
    },
    params: {
      type: Array
    },
    rowCss: {
      type: [Object, Function]
    },
    checkbox: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 250
    },
    border: {
      type: Boolean,
      default: true
    },
    operationColumnWidth: {
      type: String,
      default: '60px'
    }
  },
  data () {
    return {
      total: 0,
      componentData: [],
      pageIndex: 1,
      loading: false
    }
  },
  created () {
    this.componentData = this.data
    this.load()
  },
  computed: {
    operationVisible () {
      return this.$slots.operation || this.$scopedSlots.operation
    },
    gridStyle () {
      if (this.height) {
        if (typeof this.height === 'number') {
          return {
            height: this.height + 'px'
          }
        } else {
          return {
            height: this.height
          }
        }
      } else {
        return null
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
    reload () {
      this.load(this.pageIndex)
    },
    remove ({url, valueField, row} = {}) {
      let rows = this.getCheckedRows()
      if (!rows.length && !row) {
        this.$alert('请选择要删除的数据')
        return
      }
      this.$confirm('您确定要删除数据吗？').then(() => {
        let ids = []
        if (row) {
          ids.push(row[valueField])
        } else {
          rows.forEach(row => {
            ids.push(row[valueField])
          })
        }
        this.loading = true
        this.$http.post(url, ids).then(() => {
          this.reload()
        }).catch(() => {
          this.loading = false
        })
      })
    },
    getCheckedRows () {
      let rows = []
      this.componentData.forEach(item => {
        if (item.checked) {
          rows.push(item)
        }
      })
      return rows
    },
    onPageChange (e) {
      this.load(e.pageNumber)
      this.$emit('pageChange', e)
    },
    onSortChange (sorts) {
      this.$emit('sortChange', sorts)
    },
    onRowSelect (row) {
      this.$emit('rowSelect', row)
    },
    onRowUnselect (row) {
      this.$emit('rowUnselect', row)
    },
    onRowDblClick (row) {
      this.$emit('rowDblClick', row)
    },
    onRowChecked (row) {}
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.load()
      }
    },
    data (newValue) {
      this.componentData = newValue
    }
  }
}
</script>

<style lang="less">
</style>
