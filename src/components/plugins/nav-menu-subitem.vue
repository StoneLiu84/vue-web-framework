<template>
  <div class="nav-menu-subitem">
    <div class="menu-node" @click="onExtend" :class="{'active': selectedId === componentValue.id}">
      <span class="blank" v-for="i in level" :key="i"></span>
      <span class="name">{{componentValue.text}}</span>
      <span class="arrow iconfont icon-icon_left" :class="{'extend': extend}" v-if="hasChildren"></span>
    </div>
    <div class="menu-children" :style="{'height': (extend ? childrenHeight : 0) + 'px'}" v-if="hasChildren">
      <NavMenuSubitem
        v-for="item in componentValue.children"
        :key="item.id"
        :data="item"
        :level="level + 1"
        :extend="item.id === extendChildrenId"
        :selected-id="selectedId"
        @node-click="onNodeClick"
        @select-node="onSelectNode"
        @offset-height="onOffsetHeight">
      </NavMenuSubitem>
    </div>
  </div>
</template>

<script>
import NavMenuSubitem from './nav-menu-subitem'
export default {
  name: 'NavMenuSubitem',
  components: {
    NavMenuSubitem
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    itemHeight: {
      type: Number,
      default: 34
    },
    level: {
      type: Number,
      default: 2
    },
    extend: {
      type: Boolean,
      default: false
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
.nav-menu-subitem {
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
    .arrow {
      font-size: 10px;
      right: 5px;
      position: absolute;
      top: 7px;
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
    position: relative;
  }
}
</style>
