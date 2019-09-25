<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
      <ButtonBar :buttons="buttons" @buttonClick="onButtonClick"></ButtonBar>
    </div>
    <template slot-scope="scope">
      <DataGridEx style="margin:5px;" :style="{'height': scope.height + 'px'}" ref="datagrid">
        <template slot="operation" slot-scope="scope">
          <LinkButtonEx iconCls="icon-edit" btnCls="btn-warning" @click="onEdit(scope.row)"></LinkButtonEx>
          <LinkButtonEx iconCls="icon-attestation" btnCls="btn-info"></LinkButtonEx>
        </template>
        <GridColumn field="inv" title="序号" :sortable="true"></GridColumn>
        <GridColumn field="name" title="名称"></GridColumn>
        <GridColumn field="amount" title="数量" align="right"></GridColumn>
        <GridColumn field="price" title="价格" align="right"></GridColumn>
        <GridColumn field="cost" title="总额" align="right"></GridColumn>
        <GridColumn field="note" title="备注"></GridColumn>
      </DataGridEx>
      <DialogEx ref="dialog" title="详细信息" :height="200" :width="400">
        <EditPage :params="pageParams" dataUrl="" postUrl=""></EditPage>
      </DialogEx>
    </template>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import EditPage from './edit'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  components: {
    EditPage
  },
  data () {
    return {
      searchOptions: [
        { field: 'Id', text: '序号', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} },
        { field: 'Name', text: '名称', component: 'ComboBoxEx', propsData: {data: [{value: '1', text: '123'}]} }
      ],
      buttons: ['add', 'delete', 'import', 'export', { text: '编辑', iconCls: 'icon-scan', btnCls: 'btn-success', handler: this.onEdit }],
      pageParams: { id: '' }
    }
  },
  methods: {
    onSearch (params) {
      console.log(params)
    },
    onButtonClick (type) {
      switch (type) {
        case 'add':
          this.onAdd()
          break
        case 'delete':
          this.onDelete()
          break
        default:
          break
      }
    },
    onAdd () {
      this.pageParams = { id: 'test' }
      this.$refs.dialog.open()
    },
    onDelete () {
      console.log(this.$refs.datagrid.getCheckedRows())
    },
    onEdit (row) {
      console.log(row)
      this.pageParams = { id: 'test123' }
      this.$refs.dialog.open()
    }
  }
}
</script>

<style lang="less">

</style>
