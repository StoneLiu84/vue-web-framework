<template>
  <div class="desktop">
    <SysHeader ref="header"></SysHeader>
    <div class="body" :style="{height: height + 'px'}" :class="{'max': this.isMenuCollapse}" v-scrollbar>
      <transition name="fade">
        <div class="page-loading" :style="{'width': loadingPrecent + '%'}" v-show="loadingVisible"></div>
      </transition>
      <transition name="fade">
        <router-view class="router-view"/>
      </transition>
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
      isMenuCollapse: false,
      loadingVisible: false,
      loadingPrecent: 30
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
  computed: {
    pageLoading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    pageLoading (newValue) {
      if (newValue) {
        this.loadingPrecent = 0
        this.loadingVisible = true
        this.$nextTick(() => {
          this.timeObject = setInterval(() => {
            if (this.loadingPrecent < 70) {
              this.loadingPrecent += 10
            } else {
              clearInterval(this.timeObject)
            }
          }, 80)
        })
      } else {
        this.loadingPrecent = 100
        setTimeout(() => {
          this.loadingVisible = false
        }, 300)
      }
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
    margin-left: @menu-width;
    position: relative;
    box-sizing: border-box;
    transition: margin-left 0.5s;
    overflow: hidden;
    &.max {
      margin-left: @menu-collapse-width;
    }
    .page-loading {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 3px;
      width: 0px;
      background-color: #5cb85c;
      transition: 0.1s;
    }
  }
}
.router-view {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.5s;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
} */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
