<template>
  <ComboTree
    v-model="componentValue"
    :name="name"
    :data="componentData"
    :valueField="valueField"
    :textField="textField"
    :multiple="multiple"
    :textFormatter="textFormatter">
    <tree
      slot="tree"
      @nodeExpand="onNodeExpand"
      @nodeCollapse="onNodeCollapse"
      @checkChange="onCheckChange"
      @nodeCheck="onNodeCheck"
      @nodeUncheck="onNodeUncheck"></tree>
  </ComboTree>
</template>

<script>
export default {
  name: 'ComboTreeEx',
  props: {
    value: {
      type: [String, Number, Array]
    },
    name: {
      type: String
    },
    data: {
      type: Array,
      default: () => []
    },
    valueField: {
      type: String,
      default: 'id'
    },
    textField: {
      type: String,
      default: 'text'
    },
    url: {
      type: String
    },
    lazy: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    textFormatter: {}
  },
  data () {
    return {
      componentValue: null,
      componentData: [
        {
          id: 1,
          text: 'My Documents',
          children: [
            {
              id: 11,
              text: 'Photos',
              state: 'closed',
              children: [
                {
                  id: 111,
                  text: 'Friend'
                },
                {
                  id: 112,
                  text: 'Wife'
                },
                {
                  id: 113,
                  text: 'Company'
                }
              ]
            },
            {
              id: 12,
              text: 'Program Files',
              children: [
                {
                  id: 121,
                  text: 'Intel'
                },
                {
                  id: 122,
                  text: 'Java'
                },
                {
                  id: 123,
                  text: 'Microsoft Office'
                },
                {
                  id: 124,
                  text: 'Games'
                }
              ]
            },
            {
              id: 13,
              text: 'index.html'
            },
            {
              id: 14,
              text: 'about.html'
            },
            {
              id: 15,
              text: 'welcome.html'
            }
          ]
        }
      ]
    }
  },
  created () {
    /* this.load().then(data => {
      this.componentData = data
    }) */
  },
  methods: {
    load (node) {
      if (!this.url) return
      return new Promise((resolve, reject) => {
        this.$http.post(this.url).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    onNodeExpand (node) {
      this.$emit('nodeExpand', node)
      if (!node.children && this.lazy) {
        this.load(node).then(data => {
          this.$set(node, 'children', data)
        })
      }
    },
    onNodeCollapse (node) {
      this.$emit('nodeCollapse', node)
    },
    onCheckChange (nodes) {
      this.$emit('checkChange', nodes)
    },
    onNodeCheck (node) {
      this.$emit('nodeCheck', node)
    },
    onNodeUncheck (node) {
      this.$emit('nodeUncheck', node)
    }
  },
  watch: {
    value (newValue) {
      this.componentValue = newValue
    },
    componentValue (newValue) {
      this.$emit('input', newValue)
    },
    data (newValue) {
      this.componentData = newValue
    }
  }
}
</script>

<style lang="less">

</style>
