<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
    </div>
    <div slot-scope="scope" style="margin:5px;">
      <!--数据列表-->
      <DataGridEx
        ref="datagrid"
        :height="scope.height"
        url="/api/admin/system/basicoperationLog/loadlist"
        :checkbox="false"
        :params="searchParams">
        <GridColumn field="userName" title="用户名" :width="100"></GridColumn>
        <GridColumn field="pageName" title="页面名称" :width="120"></GridColumn>
        <GridColumn field="ip" title="IP地址" :width="120"></GridColumn>
        <GridColumn field="createTime" title="日志时间" :width="150"></GridColumn>
        <GridColumn field="operationName" title="操作" :width="80"></GridColumn>
        <GridColumn field="record" title="记录" :width="150"></GridColumn>
        <GridColumn field="description" title="描述"></GridColumn>
      </DataGridEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  data () {
    return {
      searchOptions: [
        { field: 'systemName', text: '系统名称', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} }
      ],
      searchParams: []
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
