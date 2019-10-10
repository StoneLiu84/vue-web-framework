<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>页面名称：</LabelEx>
        <TextBoxEx name="pageName" v-model="model.pageName" v-Tooltip="getErrorTip('pageName')"></TextBoxEx>
        <LabelEx>页面标识：</LabelEx>
        <TextBoxEx name="pageSign" v-model="model.pageSign"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>所属模块：</LabelEx>
        <TextBoxEx name="moduleId" v-model="model.moduleId"></TextBoxEx>
        <LabelEx>页面编号：</LabelEx>
        <TextBoxEx name="pageNameCode" v-model="model.pageNameCode"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>页面图标：</LabelEx>
        <TextBoxEx name="pageIcon" v-model="model.pageIcon"></TextBoxEx>
        <LabelEx>显示分隔线：</LabelEx>
        <ComboBoxEx name="showSeparator" v-model="model.showSeparator" :data="yesNoOptions"></ComboBoxEx>
      </div>
      <div class="row">
        <LabelEx>页面地址：</LabelEx>
        <TextBoxEx name="pageUrl" v-model="model.pageUrl"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>快速菜单：</LabelEx>
        <ComboBoxEx name="quickmenu" v-model="model.quickmenu" :data="moduleModeOptions"></ComboBoxEx>
        <LabelEx>是否可见：</LabelEx>
        <ComboBoxEx name="visible" v-model="model.visible" :data="yesNoOptions"></ComboBoxEx>
      </div>
      <div class="row">
        <LabelEx>系统配置：</LabelEx>
        <ComboBoxEx name="systemConfig" v-model="model.systemConfig" :data="yesNoOptions"></ComboBoxEx>
        <LabelEx>打开方式：</LabelEx>
        <ComboBoxEx name="urlTarget" v-model="model.urlTarget" :data="yesNoOptions"></ComboBoxEx>
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
  name: 'SystemModuleEdit',
  mixins: [DialogPageBase],
  data () {
    return {
      model: {
        defaultExpand: false,
        description: '',
        moduleId: '',
        pageIcon: '',
        pageId: '',
        pageName: '',
        pageNameCode: '',
        pageSign: '',
        pageUrl: '',
        quickmenu: false,
        showSeparator: false,
        systemConfig: false,
        urlTarget: '',
        visible: true
      },
      moduleModeOptions: [
        { value: '0', text: '树' }
      ],
      yesNoOptions: [
        { value: 1, text: '是' },
        { value: 0, text: '否' }
      ],
      rules: {
        pageName: 'required',
        moduleId: 'required'
      }
    }
  }
}
</script>

<style lang="less">
</style>
