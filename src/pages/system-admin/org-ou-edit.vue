<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>部门名称(中)：</LabelEx>
        <TextBoxEx name="ouName" v-model="model.ouName" v-Tooltip="getErrorTip('ouName')"></TextBoxEx>
        <LabelEx>部门名称(英)：</LabelEx>
        <TextBoxEx name="ouNameFl" v-model="model.ouNameFl"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>所属部门：</LabelEx>
        <TextBoxEx name="parentOuId" v-model="model.parentOuId"></TextBoxEx>
        <LabelEx>状态：</LabelEx>
        <TextBoxEx name="orgStatus" v-model="model.orgStatus"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>联系电话：</LabelEx>
        <TextBoxEx name="phoneNumber" v-model="model.phoneNumber"></TextBoxEx>
        <LabelEx>传真：</LabelEx>
        <TextBoxEx name="fax" v-model="model.fax"></TextBoxEx>
      </div>
      <div class="row" style="width:50%;">
        <LabelEx>联系人：</LabelEx>
        <TextBoxEx name="contact" v-model="model.contact"></TextBoxEx>
        <!--<LabelEx>地址：</LabelEx>
        <TextBoxEx name="portalTitleFl" v-model="model.portalTitleFl"></TextBoxEx>-->
      </div>
      <div class="row">
        <LabelEx>描述：</LabelEx>
        <TextBoxEx name="description" v-model="model.description" :multiline="false" :height="60"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>描述：</LabelEx>
        <ComboGridEx name="test" v-model="model.test" valueField="ddictType" textField="ddictTypeName" :multiple="true" url="/api/admin/system/basicDataDictionaryType/loadlist">
          <GridColumn field="ddictType" title="类型"></GridColumn>
          <GridColumn field="ddictTypeName" title="类型名称"></GridColumn>
        </ComboGridEx>
      </div>
    </FormEx>
  </Page>
</template>

<script>
import DialogPageBase from '../../components/mixins/dialog-page-base'
export default {
  name: 'OrgOuEdit',
  mixins: [DialogPageBase],
  data () {
    return {
      model: {
        contact: '',
        description: '',
        fax: '',
        orgStatus: '',
        orgType: '',
        ouId: '',
        ouName: '',
        ouNameFl: '',
        parentOuId: '',
        phoneNumber: '',
        systemId: '',
        test: null
      },
      rules: {
        ouName: 'required',
        test: 'required'
      }
    }
  }
}
</script>

<style lang="less">
</style>
