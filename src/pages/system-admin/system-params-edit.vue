<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>参数主键：</LabelEx>
        <TextBox name="paramKey" v-model="model.paramKey" v-Tooltip="getErrorTip('paramKey')"></TextBox>
        <LabelEx>参数名称：</LabelEx>
        <TextBoxEx name="paramName" v-model="model.paramName" v-Tooltip="getErrorTip('paramName')"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>参数值：</LabelEx>
        <TextBoxEx name="paramValue" v-model="model.paramValue" v-Tooltip="getErrorTip('paramValue')"></TextBoxEx>
        <LabelEx>状态：</LabelEx>
        <ComboBoxEx name="status" v-model="model.status" :data="yesNoOptions"></ComboBoxEx>
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
        description: '',
        paramKey: '',
        paramName: '',
        paramValue: '',
        status: true,
        systemId: ''
      },
      rules: {
        paramKey: 'required',
        paramName: 'required',
        paramValue: 'required'
      },
      yesNoOptions: [
        { value: 1, text: '启用' },
        { value: 0, text: '禁用' }
      ]
    }
  }
}
</script>

<style lang="less">

</style>
