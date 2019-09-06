<template>
  <div class="desktop">
    <SysHeader ref="header"></SysHeader>
    <div class="body" :style="{height: height + 'px'}">
      <router-view/>
    </div>
    <NavMenu ref="menu" :height="height"></NavMenu>
    <SysFooter ref="footer"></SysFooter>
  </div>
</template>

<script>
import SysHeader from '@/components/plugins/sys-header'
import SysFooter from '@/components/plugins/sys-footer'
import NavMenu from '@/components/plugins/nav-menu'
export default {
  name: 'Desktop',
  components: {
    SysHeader,
    SysFooter,
    NavMenu
  },
  data () {
    return {
      height: 300
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.init)
  },
  methods: {
    init () {
      let windowHeight = window.document.documentElement.clientHeight
      let headerHeight = this.$refs.header.$el.offsetHeight
      let footerHeight = this.$refs.footer.$el.offsetHeight
      this.height = windowHeight - headerHeight - footerHeight
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  }
}
</script>

<style lang="less" scoped>
.desktop {
  .body {
    padding-left: 220px;
    position: relative;
    box-sizing: border-box;
  }
}
</style>
