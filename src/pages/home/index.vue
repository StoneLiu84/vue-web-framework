<template>
  <div class="page">
    <div class="head">
      <PagePath></PagePath>
      <SearchBar></SearchBar>
      <div class="button-bar">
        <LinkButton iconCls="iconfont icon-add" btnCls="btn-primary" @click="buttonClick">新建</LinkButton>
        <LinkButton iconCls="iconfont icon-delete" btnCls="btn-danger">删除</LinkButton>
        <LinkButton iconCls="iconfont icon-export" btnCls="btn-info">导出</LinkButton>
        <LinkButton iconCls="iconfont icon-import" btnCls="btn-default">导入</LinkButton>
        <LinkButton iconCls="iconfont icon-share" btnCls="btn-success">分享</LinkButton>
        <LinkButton iconCls="iconfont icon-setting" btnCls="btn-warning">设置</LinkButton>
      </div>
    </div>
    <div class="body">
      <DataGrid style="margin: 5px;" :style="{'height': (bodyHeight - 87) + 'px'}"
        :pagination="true"
        :data="data"
        :total="total"
        :pageSize="pageSize"
        :pagePosition="pagePosition">
        <GridColumn field="inv" title="Inv No"></GridColumn>
        <GridColumn field="name" title="Name"></GridColumn>
        <GridColumn field="amount" title="Amount" align="right"></GridColumn>
        <GridColumn field="price" title="Price" align="right"></GridColumn>
        <GridColumn field="cost" title="Cost" align="right"></GridColumn>
        <GridColumn field="note" title="Note"></GridColumn>
      </DataGrid>
    </div>
    <DialogEx ref="d1" title="详细信息">
      <p style="text-align:center;margin:20px 0;font-size:16px">The Dialog Content.</p>
    </DialogEx>
  </div>
</template>

<script>
import PagePath from '../../components/plugins/page-path'
import SearchBar from '../../components/plugins/search-bar'
import DialogEx from '../../components/extend/dialog'
export default {
  name: 'HomeIndex',
  components: {
    PagePath,
    SearchBar,
    DialogEx
  },
  data () {
    return {
      total: 10000,
      pageSize: 20,
      data: [],
      pagePosition: 'bottom',
      pageOptions: [
        { value: 'bottom', text: 'Bottom' },
        { value: 'top', text: 'Top' },
        { value: 'both', text: 'Both' }
      ]
    }
  },
  created () {
    this.data = this.getData(this.total)
  },
  methods: {
    getData (total) {
      let data = []
      console.log(total)
      for (let i = 1; i <= total; i++) {
        let amount = Math.floor(Math.random() * 1000)
        let price = Math.floor(Math.random() * 1000)
        data.push({
          inv: 'Inv No ' + i,
          name: 'Name ' + i,
          amount: amount,
          price: price,
          cost: amount * price,
          note: 'Note ' + i
        })
      }
      return data
    },
    buttonClick () {
      this.$refs.d1.open()
    }
  },
  computed: {
    bodyHeight () {
      return this.$parent.height
    }
  },
  watch: {
    bodyHeight (newValue) {
      console.log(newValue)
    }
  }
}
</script>

<style lang="less" scope>
.page {
  .head {
    .button-bar {
      border-bottom: 1px solid #e8e8e8;
      box-sizing: border-box;
      padding: 5px 10px;
    }
  }
}
</style>
