<template>
  <TreeGrid
    :style="gridStyle"
    :data="componentData"
    :idField="idField"
    :treeField="treeField"
    :loading="loading"
    :selectionMode="selectionMode"
    :checkbox="checkbox"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    @rowCheck="onRowCheck"
    @rowUncheck="onRowUncheck">
    <GridColumn ref="operation" field="operation" title="操作" :width="operationColumnWidth" align="center" v-if="operationVisible">
      <div slot="body" class="grid-operation-column" slot-scope="scope">
        <slot name="operation" :row="scope.row"></slot>
      </div>
    </GridColumn>
    <slot></slot>
  </TreeGrid>
</template>

<script>
export default {
  name: 'TreeGridEx',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    url: {
      type: String
    },
    params: {
      type: Array
    },
    lazy: {
      type: Boolean,
      default: false
    },
    idField: {
      type: String,
      default: 'id'
    },
    treeField: {
      type: String,
      default: 'name'
    },
    height: {
      type: [Number, String],
      default: 250
    },
    selectionMode: {
      type: String,
      default: ''
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    operationColumnWidth: {
      type: String,
      default: '60px'
    }
  },
  data () {
    return {
      componentData: [],
      loading: false
    }
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
  created () {
    this.componentData = this.data
    this.load()
  },
  methods: {
    load (row) {
      if (!this.url) return
      this.loading = true
      let params = Object.assign({}, this.params)
      let url = this.url
      if (row) {
        url = this.$utility.getUrl(this.url, {
          rootId: row[this.idField]
        }, false)
      }
      this.$http.post(url, params).then(result => {
        let data = result.data
        if (this.lazy) {
          data.forEach(item => {
            if (!item.state) {
              if (item.ouId !== '8fd24184e05949c3b353b0269cc48aa5') {
                item.state = 'closed'
              }
            }
          })
        }
        if (row) {
          if (!row.children) {
            this.$set(row, 'children', data)
          }
        } else {
          this.componentData = data
        }
        this.loading = false
        this.$emit('loadSuccess', data)
      }).catch(() => {
        this.loading = false
      })
    },
    reload () {
      this.load()
    },
    remove ({url, row} = {}) {
      this.$confirm('您确定要删除数据吗？').then(() => {
        let ids = [row[this.idField]]
        this.loading = true
        this.$http.post(url, ids).then(() => {
          this.reload()
        }).catch(() => {
          this.loading = false
        })
      })
    },
    onRowExpand (row) {
      if (this.lazy && !row.children) {
        this.load(row)
      }
      this.$emit('rowExpand', row)
    },
    onRowCollapse (row) {
      this.$emit('rowCollapse', row)
    },
    onRowCheck (row) {
      this.$emit('rowCheck', row)
    },
    onRowUncheck (row) {
      this.$emit('rowUncheck', row)
    }
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.reload()
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
