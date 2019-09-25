<template>
  <div class="page">
    <div class="header" ref="header">
      <slot name="header"></slot>
    </div>
    <div class="body" ref="body">
      <slot :height="bodyHeight"></slot>
    </div>
    <div class="footer" ref="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data () {
    return {
      bodyHeight: null
    }
  },
  computed: {
    height () {
      let parent = this.$parent
      let height = 0
      while (parent) {
        if (parent.$options.componentName === 'Desktop') {
          height = parent.height
          break
        } else if (parent.$options.componentName === 'DialogEx') {
          height = parent.bodyHeight
          break
        } else {
          parent = parent.$parent
        }
      }
      return height
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let headerHeight = this.$refs.header ? this.$refs.header.offsetHeight : 0
      let footerHeight = this.$refs.footer ? this.$refs.footer.offsetHeight : 0
      this.bodyHeight = this.height - headerHeight - footerHeight - 10
    }
  },
  watch: {
    height () {
      this.init()
    }
  }
}
</script>

<style lang="less">

</style>
