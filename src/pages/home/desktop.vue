<template>
  <div class="desktop">
    <SysHeader ref="header"></SysHeader>
    <div class="body" :style="{height: height + 'px'}" :class="{'max': this.isMenuCollapse}">
      <router-view/>
    </div>
    <NavMenu ref="menu" :height="height" @collapse="onMenuCollapse"></NavMenu>
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
      height: 300,
      isMenuCollapse: false
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
    },
    onMenuCollapse (value) {
      this.isMenuCollapse = value
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  }
}
</script>

<style lang="less" scoped>
@import '../../theme/css/base.less';
.desktop {
  .body {
    padding-left: @menu-width;
    position: relative;
    box-sizing: border-box;
    transition: padding-left 0.5s;
    &.max {
      padding-left: @menu-collapse-width;
    }
  }
}
</style>
