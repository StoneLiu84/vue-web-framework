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
      type: Object
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
    load (pageNumber) {
      return new Promise((resolve, reject) => {
        let total = this.total
        let data = []
        let start = (pageNumber - 1) * this.pageSize
        for (let i = start + 1; i <= start + this.pageSize; i++) {
          let amount = Math.floor(Math.random() * 1000)
          let price = Math.floor(Math.random() * 1000)
          data.push({
            inv: 'Inv No ' + i,
            name: 'Name ' + i,
            amount: amount,
            price: price,
            cost: amount * price,
            note: 'Note ' + i
          })
        }
        setTimeout(() => {
          resolve({
            total: total,
            rows: data
          })
        }, 1000)
      })
    },
    remove () {},
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
      this.loading = true
      this.load(e.pageNumber).then(result => {
        this.total = result.total
        this.data = result.rows
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      this.$emit('pageChange', e)
    },
    onSortChange (sorts) {
      this.$emit('sortChange', sorts)
    },
    onRowDblClick (row) {
      this.$emit('rowDblClick', row)
    },
    onRowChecked (row) {}
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
