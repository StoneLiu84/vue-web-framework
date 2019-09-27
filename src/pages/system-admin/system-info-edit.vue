<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <Label for="systemId" style="width:100%;color:#888888;">系统ID：{{model.systemId}}</Label>
      </div>
      <div class="row split-row">中文</div>
      <div class="row" style="margin-top:10px;">
        <LabelEx>系统名称：</LabelEx>
        <TextBoxEx name="systemName" v-model="model.systemName" v-Tooltip="getErrorTip('systemName')"></TextBoxEx>
        <LabelEx>版权所有：</LabelEx>
        <TextBoxEx name="copyright" v-model="model.copyright"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>后台标题：</LabelEx>
        <TextBoxEx name="adminTitle" v-model="model.adminTitle"></TextBoxEx>
        <LabelEx>门户标题：</LabelEx>
        <TextBoxEx name="portalTitle" v-model="model.portalTitle"></TextBoxEx>
      </div>
      <div class="row split-row">英文</div>
      <div class="row" style="margin-top:10px;">
        <LabelEx>系统名称：</LabelEx>
        <TextBoxEx name="systemNameFl" v-model="model.systemNameFl"></TextBoxEx>
        <LabelEx>版权所有：</LabelEx>
        <TextBoxEx name="copyrightFl" v-model="model.copyrightFl"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>后台标题：</LabelEx>
        <TextBoxEx name="adminTitleFl" v-model="model.adminTitleFl"></TextBoxEx>
        <LabelEx>门户标题：</LabelEx>
        <TextBoxEx name="portalTitleFl" v-model="model.portalTitleFl"></TextBoxEx>
      </div>

      <div class="row">
        <LabelEx>描述：</LabelEx>
        <TextBoxEx name="description" v-model="model.description" :multiline="true" :height="60"></TextBoxEx>
      </div>
    </FormEx>
  </Page>
</template>

<script>
import DialogPageBase from '../../components/mixins/dialog-page-base'
export default {
  name: 'SystemInfoEdit',
  mixins: [DialogPageBase],
  data () {
    return {
      model: {
        adminLogo: '',
        adminLogoFl: '',
        adminTitle: '',
        adminTitleFl: '',
        copyright: '',
        copyrightFl: '',
        description: '',
        portalLogo: '',
        portalLogoFl: '',
        portalTitle: '',
        portalTitleFl: '',
        systemId: '',
        systemName: '',
        systemNameCode: '',
        systemNameFl: '',
        visible: true
      },
      rules: {
        systemName: 'required'
      }
    }
  }
}
</script>

<style lang="less">
.split-row {
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
  border: 1px solid #e8e8e8;
  /* box-shadow: 0px 0px 3px rgba(0,0,0,0.1) inset; */
  background: #f8f8f8;
  border-radius: 3px;
}
</style>
