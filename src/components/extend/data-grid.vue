<template>
  <DataGrid
    :pagination="pagination"
    :data="data"
    :total="total"
    :pageSize="pageSize"
    :lazy="lazy"
    :loading="loading"
    :rowCss="rowCss"
    @pageChange="onPageChange"
    @sortChange="onSortChange"
    @rowDblClick="onRowDblClick">
    <gridColumn field="checkbox" width="30px" align="center" v-if="checkbox">
      <div slot="body" slot-scope="scope" @click.stop="onRowChecked(scope.row)">
        <CheckBox v-model="scope.row.checked"></CheckBox>
      </div>
    </gridColumn>
    <gridColumn ref="operation" field="operation" title="操作" :width="operationColumnWidth" align="center" v-if="operationVisible">
      <div slot="body" class="grid-operation-column" slot-scope="scope">
        <slot name="operation" :row="scope.row"></slot>
      </div>
    </gridColumn>
    <slot></slot>
  </DataGrid>
</template>

<script>
export default {
  name: 'DataGridEx',
  props: {
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
    operationColumnWidth: {
      type: String,
      default: '60px'
    }
  },
  data () {
    return {
      total: 10000,
      data: [],
      pageIndex: 1,
      loading: false
    }
  },
  created () {
  },
  computed: {
    operationVisible () {
      return this.$slots.operation || this.$scopedSlots.operation
    }
  },
  methods: {
    load (pageIndex) {
      return new Promise((resolve, reject) => {
        this.pageIndex = pageIndex
        this.loading = true
        this.$http.post(this.url, {
          filter: {},
          page: pageIndex,
          size: this.pageSize
        }).then(result => {
          this.total = result.totalSize
          this.data = result.list
          this.loading = false
          this.$emit('loadSuccess', {
            data: this.data,
            total: this.total,
            page: this.pageIndex,
            size: this.pageSize
          })
          resolve(result)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    reload () {
      this.load(this.pageIndex)
    },
    remove ({url, valueField} = {}) {
      let rows = this.getCheckedRows()
      if (!rows.length) {
        this.$alert('请选择要删除的数据')
        return
      }
      this.$confirm('您确定要删除数据吗？').then(() => {
        let ids = []
        rows.forEach(row => {
          ids.push(row[valueField])
        })
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
      this.data.forEach(item => {
        if (item.checked) {
          rows.push(item)
        }
      })
      return rows
    },
    onPageChange (e) {
      this.load(e.pageNumber).then(result => {}).catch(() => {})
      this.$emit('pageChange', e)
    },
    onSortChange (sorts) {
      this.$emit('sortChange', sorts)
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
        this.load(1)
      }
    }
  }
}
</script>

<style lang="less">
.grid-operation-column {
  .l-btn {
    .l-btn-text {
      line-height: 18px;
      height: 18px;
      margin: 0px 2px;
    }
    .l-btn-icon-left {
      .l-btn-icon {
        left: 2px;
        font-size: 12px;
      }
    }
  }
}
</style>
