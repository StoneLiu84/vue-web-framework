<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>所属系统：</LabelEx>
        <TextBoxEx name="systemId" v-model="model.systemId" v-Tooltip="getErrorTip('systemId')"></TextBoxEx>
        <LabelEx>所属类型：</LabelEx>
        <TextBoxEx name="ddictType" v-model="model.ddictType" v-Tooltip="getErrorTip('ddictType')"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>成员值：</LabelEx>
        <TextBoxEx name="ddictMember" v-model="model.ddictMember" v-Tooltip="getErrorTip('ddictMember')"></TextBoxEx>
        <LabelEx>成员名称：</LabelEx>
        <TextBoxEx name="ddictMemberName" v-model="model.ddictMemberName" v-Tooltip="getErrorTip('ddictMemberName')"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>成员名称（英）：</LabelEx>
        <TextBoxEx name="ddictMemberNameFl" v-model="model.ddictMemberNameFl"></TextBoxEx>
        <LabelEx>自定义1：</LabelEx>
        <TextBoxEx name="udf1" v-model="model.udf1"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>自定义2：</LabelEx>
        <TextBoxEx name="udf2" v-model="model.udf2"></TextBoxEx>
        <LabelEx>自定义3：</LabelEx>
        <TextBoxEx name="udf3" v-model="model.udf3"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>图标：</LabelEx>
        <TextBoxEx name="ddictIconPath" v-model="model.ddictIconPath"></TextBoxEx>
      </div>
    </FormEx>
  </Page>
</template>

<script>
import DialogPageBase from '../../components/mixins/dialog-page-base'
export default {
  name: 'DataDictionaryEdit',
  mixins: [DialogPageBase],
  data () {
    return {
      model: {
        ddictIconPath: '',
        ddictMember: '',
        ddictMemberName: '',
        ddictMemberNameFl: '',
        ddictType: '',
        systemId: '',
        udf1: '',
        udf2: '',
        udf3: ''
      },
      rules: {
        systemId: 'required',
        ddictType: 'required',
        ddictMember: 'required',
        ddictMemberName: 'required'
      }
    }
  }
}
</script>

<style lang="less">
</style>
