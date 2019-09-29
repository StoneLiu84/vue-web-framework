<template>
  <TreeGrid
    :style="gridStyle"
    :data="componentData"
    :idField="idField"
    :treeField="treeField"
    :loading="loading"
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
      if (row) {
        params.parent = row[this.idField]
      }
      this.$http.post(this.url, params).then(result => {
        if (row) {
          row.children = result
          row.loaded = true
        } else {
          this.componentData = result
        }
        this.loading = false
        this.$emit('loadSuccess', this.componentData)
      }).catch(() => {
        this.loading = false
      })
    },
    reload () {
      this.load()
    },
    remove ({url, row} = {}) {

    },
    onRowExpand (row) {
      if (this.lazy && !row.loaded) {
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
