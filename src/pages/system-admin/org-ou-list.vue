<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
      <ButtonBar :buttons="buttons" @buttonClick="onButtonClick">
        <LinkButtonEx iconCls="icon-refresh" btnCls="btn-success" text="刷新" @click="onRefresh"></LinkButtonEx>
      </ButtonBar>
    </div>
    <div slot-scope="scope" style="margin:5px;">
      <!--数据列表-->
      <TreeGridEx
        ref="treeGrid"
        :height="scope.height"
        url="/api/admin/system/orgOu/loadlist"
        :lazy="true"
        idField="ouId"
        treeField="ouName"
        :params="searchParams">
        <template slot="operation" slot-scope="scope">
          <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit(scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
          <LinkButtonEx iconCls="icon-delete" btnCls="btn-danger" @click="onDelete(scope.row)" :disabled="!getRight('delete')"></LinkButtonEx>
        </template>
        <GridColumn field="ouName" title="部门名称" width="300px"></GridColumn>
        <GridColumn field="contact" title="联系人" width="120px" align="center"></GridColumn>
        <GridColumn field="fax" title="传真" width="130px" align="center"></GridColumn>
        <GridColumn field="orgStatusName" title="状态" width="90px" align="center"></GridColumn>
        <GridColumn field="description" title="描述"></GridColumn>
      </TreeGridEx>
      <!--编辑页面-->
      <DialogEx ref="dialog" title="组织信息" :height="302">
        <OrgOuEdit
          :params="pageParams"
          url="/api/admin/system/orgOu/loadedit"
          post="/api/admin/system/orgOu/savedata"
          @submitSuccess="onSubmitSuccess">
        </OrgOuEdit>
      </DialogEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import OrgOuEdit from './org-ou-edit'
export default {
  name: 'OrgOuList',
  mixins: [ListPageBase],
  components: {
    OrgOuEdit
  },
  data () {
    return {
      buttons: [ 'add' ],
      searchOptions: [
        { field: 'systemName', text: '系统名称', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} }
      ],
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
    onDelete (row) {
      this.$refs.treeGrid.remove({
        url: '/api/admin/system/orgOu/deletedata',
        row
      })
    },
    onEdit (row) {
      this.pageParams.id = row.ouId
      this.$refs.dialog.open()
    },
    onSubmitSuccess () {
      this.$refs.treeGrid.reload()
    },
    onRefresh () {
      this.$refs.treeGrid.reload()
    }
  }
}
</script>

<style lang="less">
@import url('../../theme/css/base.less');
.treeIconBase {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  background: none;
  color: @warning-border;
};
.tree-module {
  .treeIconBase;
  &::before {
    content: '\ebca';
  }
}
.tree-page {
  .treeIconBase;
  &::before {
    content: '\eba7';
  }
}
</style>
