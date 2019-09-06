<template>
  <div
    class="nav-menu"
    :style="{height: height + 'px'}"
    :class="{'collapse': collapse && !hover}"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut">
    <div class="body" v-scrollbar :style="{height: bodyHeight + 'px'}">
      <NavMenuItem
        v-for="item in dataList"
        :data="item"
        :key="item.id"
        :collapse="collapse && !hover"
        :extend="item.id === extendId"
        :selected-id="selectedId"
        :level="1"
        @node-click="onNodeClick"
        @select-node="onSelectNode">
      </NavMenuItem>
    </div>
    <div class="query">
      <input type="text" placeholder="输入关键字搜索" :value="keyword"/>
      <span class="iconfont" :class="collapseClass" @click="onCollapse"></span>
    </div>
  </div>
</template>

<script>
import NavMenuItem from './nav-menu-item'
import Menu from '../../scripts/menu'
export default {
  name: 'Menu',
  components: {
    NavMenuItem
  },
  props: {
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      extendId: '',
      selectedId: '',
      dataList: Menu,
      collapse: false,
      collapsing: false,
      hover: false,
      keyword: ''
    }
  },
  methods: {
    onNodeClick (id) {
      this.extendId = id === this.extendId ? '' : id
    },
    onSelectNode (id) {
      this.selectedId = id
    },
    onCollapse () {
      this.collapse = !this.collapse
      this.collapsing = true
      this.hover = false
      this.$emit('collapse', this.collapse)
      setTimeout(() => {
        this.collapsing = false
      }, 500)
    },
    onMouseOver () {
      this.hover = this.collapse && !this.collapsing
    },
    onMouseOut () {
      this.hover = false
    }
  },
  computed: {
    collapseClass () {
      return {
        'icon-icon_ding': this.collapse && this.hover,
        'extend': this.collapse && !this.hover,
        'icon-icon_left': !this.collapse || (this.collapse && !this.hover)
      }
    },
    bodyHeight () {
      return this.height - 40
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../theme/css/base.less';
.nav-menu {
  position: absolute;
  left: 0px;
  top: 50px;
  width: @menu-width;
  box-sizing: border-box;
  background-color: #262932;
  border-right: 1px solid #181c28;
  color: #c9d4f6;
  font-size: 12px;
  transition: width 0.5s;
  .body {
    position: relative;
  }
  .query {
    height: 40px;
    background-color: #1f2126;
    overflow: hidden;
    input {
      height: 26px;
      margin: 8px;
      background: none repeat scroll 0 0 #13151d;
      border: 1px solid #333333;
      padding-left: 5px;
      box-sizing: border-box;
      float: left;
      width: 170px;
      color: #999999;
      border-radius: 3px;
      font-size: 12px;
    }
    span {
      width: 25px;
      box-sizing: border-box;
      text-align: center;
      padding: 0px;
      height: 26px;
      border: 0px;
      font-size: 12px;
      background-color: #333;
      color: #fff;
      float: left;
      margin-top: 7px;
      cursor: pointer;
      padding-top: 5px;
      text-decoration: none;
      background: transparent;
      box-shadow: 1px 1px 0 rgba(255,255,255,0.1) inset;
      border: 1px solid rgba(0,0,0,0.25);
      border-radius: 2px;
    }
  }
  &.collapse {
    width: @menu-collapse-width;
    box-sizing: border-box;
    overflow: hidden;
    .query {
      input {
        display: none;
      }
      span {
        margin-left: 7.5px;
        transition: transform 0.5s;
        &.extend {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
