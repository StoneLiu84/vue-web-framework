<template>
  <div class="nav-menu-item">
    <div class="menu-node" @click="onExtend" :class="{'active': selectedId === componentValue.id, 'top': level === 1}">
      <span v-if="level === 1" class="icon" :class="iconCls"></span>
      <span v-else class="blank" v-for="i in level" :key="i"></span>
      <span class="text">{{componentValue.text}}</span>
      <span class="arrow iconfont icon-icon_left" :class="{'extend': extend}" v-if="hasChildren"></span>
    </div>
    <div class="menu-children" :style="{'height': (extend ? childrenHeight : 0) + 'px'}" v-if="hasChildren">
      <NavMenuItem
        v-for="item in componentValue.children"
        :key="item.id"
        :data="item"
        :level="level + 1"
        :extend="extendChildrenId === item.id"
        :selected-id="selectedId"
        @node-click="onNodeClick"
        @select-node="onSelectNode"
        @offset-height="onOffsetHeight">
      </NavMenuItem>
    </div>
  </div>
</template>

<script>
import NavMenuItem from './nav-menu-item'
export default {
  name: 'NavMenuItem',
  components: {
    NavMenuItem
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    extend: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    },
    itemHeight: {
      type: Number,
      default: 34
    },
    selectedId: {
      type: String
    }
  },
  data () {
    return {
      componentValue: null,
      childrenHeight: 0,
      extendChildrenId: ''
    }
  },
  created () {
    this.componentValue = this.data
    this.childrenHeight = this.componentValue.children.length * this.itemHeight
  },
  methods: {
    onExtend () {
      if (this.hasChildren) {
        this.$emit('node-click', this.componentValue.id)
      } else {
        this.$emit('select-node', this.componentValue.id)
      }
    },
    onNodeClick (id) {
      this.extendChildrenId = id === this.extendChildrenId ? '' : id
    },
    onSelectNode (id) {
      this.$emit('select-node', id)
    },
    onOffsetHeight (height) {
      this.childrenHeight += height
      this.$emit('offset-height', height)
    }
  },
  computed: {
    iconCls () {
      return this.componentValue.iconCls || 'iconfont icon-icon_threeline_fill'
    },
    hasChildren () {
      return this.componentValue.children && this.componentValue.children.length
    }
  },
  watch: {
    data (newValue) {
      this.componentValue = newValue
    },
    extend (newValue) {
      this.$emit('offset-height', (newValue ? 1 : -1) * this.childrenHeight)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-menu-item {
  .menu-node {
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-left: 2px solid transparent;
    padding-right: 25px;
    cursor: pointer;
    position: relative;
    &.active {
      border-color: #2494f2;
      background-color: #333333;
    }
    .blank {
      display: block;
      width: 15px;
      height: 100%;
      float: left;
    }
    &.top {
      height: 40px;
      line-height: 38px;
      position: relative;
      cursor: pointer;
      border-top: 1px solid #32353e;
      border-bottom: 1px solid #1a1c20;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      text-overflow: ellipsis;
      padding-right: 25px;
    }
    &.top:hover {
      background-color: #292c35;
    }
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 14px;
      text-align: center;
      margin: -2px 5px 0px 10px;
      font-size: 14px;
      line-height: 14px;
    }
    .arrow {
      font-size: 10px;
      right: 5px;
      position: absolute;
      top: 9px;
      border-radius: 4px;
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-align: center;
      transition: 0.5s;
      transform: scale(0.8);
      &:hover {
        background-color: #47546f;
      }
      &.extend {
        transform: scale(0.8) rotate(-90deg);
      }
    }
  }
  .menu-children {
    overflow: hidden;
    transition: 0.5s;
    height: 100px;
    background-color: #1a1c20;
    position: relative;
    &::after {
      content: '';
      background-color: #181c28;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 1px;
    }
  }
}
</style>
