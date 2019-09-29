<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
      <ButtonBar :buttons="[]">
        <MenuButtonEx text="新增" icon-cls="icon-add" btn-cls="btn-primary">
          <Menu @itemClick="onAdd">
            <menu-item value="module" text="模块" iconCls="iconfont icon-newgroup"></menu-item>
            <menu-item value="page" text="页面" iconCls="iconfont icon-doc"></menu-item>
          </Menu>
        </MenuButtonEx>
        <LinkButtonEx iconCls="icon-refresh" btnCls="btn-success" text="刷新" @click="onRefresh"></LinkButtonEx>
        <LinkButtonEx iconCls="icon-setting" btnCls="btn-warning" text="设置页面权限"></LinkButtonEx>
      </ButtonBar>
    </div>
    <div slot-scope="scope" style="margin:5px;">
      <!--数据列表-->
      <TreeGridEx
        ref="treeGrid"
        :height="scope.height"
        url="/api/admin/system/systemmenu/loadlist"
        :params="searchParams">
        <template slot="operation" slot-scope="scope">
          <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit(scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
          <LinkButtonEx iconCls="icon-delete" btnCls="btn-danger" @click="onDelete(scope.row)" :disabled="!getRight('delete')"></LinkButtonEx>
        </template>
        <GridColumn field="name" title="名称" width="300px"></GridColumn>
        <GridColumn field="isVisible" title="是否可见" width="80px" align="center"></GridColumn>
        <GridColumn field="systemConfig" title="是否系统配置" width="90px" align="center"></GridColumn>
        <GridColumn field="description" title="描述"></GridColumn>
      </TreeGridEx>
      <!--编辑页面-->
      <DialogEx ref="moduleDialog" title="模块信息">
        <SystemModuleEdit
          :params="pageParams"
          url="/api/admin/system/system/loadedit"
          post="/api/admin/system/system/savedata"
          @submitSuccess="onSubmitSuccess">
        </SystemModuleEdit>
      </DialogEx>
      <DialogEx ref="pageDialog" title="页面信息">
        <SystemPageEdit
          :params="pageParams"
          url="/api/admin/system/system/loadedit"
          post="/api/admin/system/system/savedata"
          @submitSuccess="onSubmitSuccess">
        </SystemPageEdit>
      </DialogEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import SystemModuleEdit from './system-module-edit'
import SystemPageEdit from './system-page-edit'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  components: {
    SystemModuleEdit,
    SystemPageEdit
  },
  data () {
    return {
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
    onAdd (value) {
      this.$refs[value + 'Dialog'].open()
    },
    onDelete (row) {
      /* this.$refs.datagrid.remove({
        url: '/api/admin/system/system/deletedata',
        valueField: 'systemId'
      }) */
    },
    onEdit (row) {
      this.pageParams.id = row.systemId
      this.$refs.moduleDialog.open()
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
.tree-file {
  .treeIconBase;
  &::before {
    content: '\eba7';
  }
}
</style>
