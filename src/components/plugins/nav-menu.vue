<template>
  <div class="nav-menu" :style="{height: height + 'px'}">
    <div class="body" v-scrollbar :style="{height: (height - 40) + 'px'}">
      <NavMenuItem
        v-for="item in dataList"
        :data="item"
        :key="item.id"
        :extend="item.id === extendId"
        :selected-id="selectedId"
        :level="1"
        @node-click="onNodeClick"
        @select-node="onSelectNode">
      </NavMenuItem>
    </div>
    <div class="query">
      <input type="text" placeholder="输入关键字搜索"/>
      <span class="iconfont icon-icon_left"></span>
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
      dataList: Menu
    }
  },
  methods: {
    onNodeClick (id) {
      this.extendId = id === this.extendId ? '' : id
    },
    onSelectNode (id) {
      this.selectedId = id
    }
  }
}
</script>

<style lang="less" scoped>
.nav-menu {
  position: absolute;
  left: 0px;
  top: 50px;
  width: 220px;
  box-sizing: border-box;
  background-color: #262932;
  border-right: 1px solid #181c28;
  color: #c9d4f6;
  font-size: 12px;
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
      font-size: 14px;
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
}
</style>
