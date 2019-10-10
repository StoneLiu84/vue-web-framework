<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>模块名称：</LabelEx>
        <TextBoxEx name="moduleName" v-model="model.moduleName" v-Tooltip="getErrorTip('moduleName')"></TextBoxEx>
        <LabelEx>模块编号：</LabelEx>
        <TextBoxEx name="moduleNameCode" v-model="model.moduleNameCode"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>所属模块：</LabelEx>
        <ComboTreeEx name="moduleParentId" v-model="model.moduleParentId" url="/api/admin/system/systemmenu/loadlist"></ComboTreeEx>
        <LabelEx>显示分隔线：</LabelEx>
        <ComboBoxEx name="showSeparator" v-model="model.showSeparator" :data="yesNoOptions"></ComboBoxEx>
      </div>
      <div class="row">
        <LabelEx>默认展开：</LabelEx>
        <ComboBoxEx name="defaultExpand" v-model="model.defaultExpand" :data="yesNoOptions"></ComboBoxEx>
        <LabelEx>模块图标：</LabelEx>
        <TextBoxEx name="moduleIcon" v-model="model.moduleIcon"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>显示模式：</LabelEx>
        <ComboBoxEx name="moduleMode" v-model="model.moduleMode" :data="moduleModeOptions"></ComboBoxEx>
        <LabelEx>是否可见：</LabelEx>
        <ComboBoxEx name="visible" v-model="model.visible" :data="yesNoOptions"></ComboBoxEx>
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
        moduleIcon: '',
        moduleId: '',
        moduleMode: '0',
        moduleName: '',
        moduleNameCode: '',
        moduleParentId: '',
        showSeparator: false,
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
        moduleName: 'required'
      }
    }
  }
}
</script>

<style lang="less">
</style>
