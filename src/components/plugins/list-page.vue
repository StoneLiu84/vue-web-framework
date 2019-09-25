<template>
  <Page>
    <div slot="header" ref="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions"></SearchBar>
      <div class="button-bar">
        <LinkButtonEx
          v-for="(btn, index) in buttons"
          :key="index"
          :iconCls="btn.iconCls"
          :btnCls="btn.btnCls"
          :text="btn.text"
          @click="btn.handler">
        </LinkButtonEx>
        <slot name="buttons"></slot>
      </div>
    </div>
    <div style="margin: 5px">
      <slot :height="bodyHeight"></slot>
    </div>
    <div slot="footer" ref="footer">
      <slot name="footer"></slot>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../mixins/list-page-base'
export default {
  name: 'ListPage',
  mixins: [ListPageBase],
  props: {
    searchOptions: {
      type: Array
    },
    buttons: {
      type: Array
    }
  },
  data () {
    return {
      bodyHeight: 300
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    height () {
      let count = 0
      let parent = this.$parent
      let height = 0
      while (count < 100 && parent) {
        if (parent.$options.name === 'Desktop') {
          height = parent.height
          break
        } else {
          parent = parent.$parent
        }
        count++
      }
      return height
    }
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
.page {
  .header {
    .search-bar {
      position: absolute;
      width: 400px;
      right: 10px;
      top: 5px;
    }
    .button-bar {
      border-bottom: 1px solid #e8e8e8;
      box-sizing: border-box;
      padding: 5px 10px;
      .l-btn + .l-btn {
        margin-left: 8px;
      }
    }
  }
}
</style>
