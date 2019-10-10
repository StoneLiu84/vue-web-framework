<template>
  <Page>
    <div slot="header">
      <PagePath></PagePath>
      <SearchBar :options="searchOptions" @search="onSearch"></SearchBar>
      <ButtonBar :buttons="buttons" @buttonClick="onButtonClick">
        <MenuButtonEx text="新增" icon-cls="icon-add" btn-cls="btn-primary">
          <Menu @itemClick="onAdd">
            <menu-item value="type" text="类型" iconCls="iconfont icon-newgroup"></menu-item>
            <menu-item value="member" text="成员" iconCls="iconfont icon-doc"></menu-item>
          </Menu>
        </MenuButtonEx>
      </ButtonBar>
    </div>
    <div slot-scope="scope" style="margin:5px;">
      <!--数据列表-->
      <div class="data-row">
        <div class="left">
          <DataGridEx
            ref="typeGrid"
            :height="scope.height"
            url="/api/admin/system/basicDataDictionaryType/loadlist"
            :params="searchParams"
            :checkbox="false"
            operationColumnWidth="60px">
            <template slot="operation" slot-scope="scope">
              <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit('type', scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
              <LinkButtonEx iconCls="icon-delete" btnCls="btn-danger" @click="onDelete('type', scope.row)" :disabled="!getRight('delete')"></LinkButtonEx>
            </template>
            <GridColumn field="ddictType" title="类型" :width="220"></GridColumn>
            <GridColumn field="ddictTypeName" title="名称"></GridColumn>
          </DataGridEx>
        </div>
        <div class="right">
          <DataGridEx
            ref="memberGrid"
            :height="scope.height"
            url="/api/admin/system/basicDataDictionary/loadlist"
            :params="searchParams"
            :checkbox="false"
            operationColumnWidth="60px">
            <template slot="operation" slot-scope="scope">
              <LinkButtonEx iconCls="icon-edit" btnCls="btn-info" @click="onEdit('member', scope.row)" :disabled="!getRight('edit')"></LinkButtonEx>
              <LinkButtonEx iconCls="icon-delete" btnCls="btn-danger" @click="onDelete('member', scope.row)" :disabled="!getRight('delete')"></LinkButtonEx>
            </template>
            <GridColumn field="ddictMember" title="成员值" :width="220"></GridColumn>
            <GridColumn field="ddictMemberName" title="成员名称"></GridColumn>
          </DataGridEx>
        </div>
      </div>
      <!--编辑页面-->
      <DialogEx ref="typeDialog" title="字典类型" :height="235" :width="500">
        <DataDictionaryTypeEdit
          :params="pageParams"
          url="/api/admin/system/basicDataDictionaryType/loadedit"
          post="/api/admin/system/basicDataDictionaryType/savedata"
          @submitSuccess="onTypeSubmitSuccess">
        </DataDictionaryTypeEdit>
      </DialogEx>
      <DialogEx ref="memberDialog" title="字典成员" :height="235" :width="500">
        <DataDictionaryEdit
          :params="pageParams"
          url="/api/admin/system/basicDataDictionary/loadedit"
          post="/api/admin/system/basicDataDictionary/savedata"
          @submitSuccess="onMemberSubmitSuccess">
        </DataDictionaryEdit>
      </DialogEx>
    </div>
  </Page>
</template>

<script>
import ListPageBase from '../../components/mixins/list-page-base'
import DataDictionaryTypeEdit from './data-dictionary-type-edit'
import DataDictionaryEdit from './data-dictionary-edit'
export default {
  name: 'HomeIndex',
  mixins: [ListPageBase],
  components: {
    DataDictionaryTypeEdit,
    DataDictionaryEdit
  },
  data () {
    return {
      searchOptions: [
        { field: 'systemName', text: '系统名称', component: 'TextBox', propsData: {placeholder: '输入关键字搜索'} }
      ],
      buttons: [],
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
    onAdd (type) {
      this.pageParams.id = ''
      this.$refs[type + 'Dialog'].open(false)
    },
    onDelete (value, row) {
      if (value === 'type') {
        this.$refs.typeGrid.remove({
          url: '/api/admin/system/basicDataDictionaryType/deletedata',
          valueField: 'ddictType',
          row
        })
      } else {
        this.$refs.memberGrid.remove({
          url: '/api/admin/system/basicDataDictionary/deletedata',
          valueField: 'ddictMember',
          row
        })
      }
    },
    onEdit (type, row) {
      this.pageParams.id = row.ddictType
      this.$refs[type + 'Dialog'].open()
    },
    onTypeSubmitSuccess () {
      this.$refs.typeGrid.reload()
    },
    onMemberSubmitSuccess () {
      this.$refs.memberGrid.reload()
    }
  }
}
</script>

<style lang="less">
.data-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  .left {
    width: 50%;
  }
  .right {
    padding-left: 5px;
    width: 50%;
  }
}
</style>
