<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
      <ButtonBar :buttons="buttons" @buttonClick="onButtonClick"></ButtonBar>
    </div>
    <div slot-scope="scope" style="margin:5px;">
      <!--数据列表-->
      <DataGridEx
        ref="datagrid"
        :height="scope.height"
        url="/api/admin/system/system/loadlist"
        :params="searchParams">
        <template slot="operation" slot-scope="scope">
          <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit(scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
        </template>
        <GridColumn field="systemId" title="系统ID" :width="300"></GridColumn>
        <GridColumn field="systemName" title="系统名称"></GridColumn>
      </DataGridEx>
      <!--编辑页面-->
      <DialogEx ref="dialog" title="系统信息">
        <SystemInfoEdit
          :params="pageParams"
          url="/api/admin/system/system/loadedit"
          post="/api/admin/system/system/savedata"
          @submitSuccess="onSubmitSuccess">
        </SystemInfoEdit>
      </DialogEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import SystemInfoEdit from './system-info-edit'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  components: {
    SystemInfoEdit
  },
  data () {
    return {
      searchOptions: [
        { field: 'systemName', text: '系统名称', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} }
      ],
      buttons: [ 'add', 'delete' ],
      searchParams: [],
      pageParams: { id: '' }
    }
  },
  methods: {
    onSearch (params) {
      this.searchParams = params
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
      this.pageParams.id = ''
      this.$refs.dialog.open(false)
    },
    onDelete () {
      this.$refs.datagrid.remove({
        url: '/api/admin/system/system/deletedata',
        valueField: 'systemId'
      })
    },
    onEdit (row) {
      this.pageParams.id = row.systemId
      this.$refs.dialog.open()
    },
    onSubmitSuccess () {
      this.$refs.datagrid.reload()
    }
  }
}
</script>

<style lang="less">

</style>
