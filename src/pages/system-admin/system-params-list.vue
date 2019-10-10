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
        url="/api/admin/system/basicSystemParameter/loadlist"
        :params="searchParams">
        <template slot="operation" slot-scope="scope">
          <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit(scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
        </template>
        <GridColumn field="paramKey" title="参数主键" :width="200"></GridColumn>
        <GridColumn field="paramName" title="参数名称" :width="200"></GridColumn>
        <GridColumn field="paramValue" title="参数值" :width="120"></GridColumn>
        <GridColumn field="statusName" title="状态" :width="80" align="center"></GridColumn>
        <GridColumn field="description" title="描述"></GridColumn>
      </DataGridEx>
      <!--编辑页面-->
      <DialogEx ref="dialog" title="详细信息" :height="225">
        <SystemParamsEdit
          :params="pageParams"
          url="/api/admin/system/basicSystemParameter/loadedit"
          post="/api/admin/system/basicSystemParameter/savedata"
          @submitSuccess="onSubmitSuccess">
        </SystemParamsEdit>
      </DialogEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import SystemParamsEdit from './system-params-edit'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  components: {
    SystemParamsEdit
  },
  data () {
    return {
      searchOptions: [
        { field: 'systemId', text: '系统名称', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} }
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
        url: '/api/admin/system/basicSystemParameter/deletedata',
        valueField: 'paramKey'
      })
    },
    onEdit (row) {
      this.pageParams.id = row.paramKey
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
