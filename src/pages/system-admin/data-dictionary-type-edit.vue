<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <LabelEx>所属系统：</LabelEx>
        <TextBoxEx name="systemId" v-model="model.systemId" v-Tooltip="getErrorTip('systemId')"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>字典类型：</LabelEx>
        <TextBoxEx name="ddictType" v-model="model.ddictType"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>类型名称：</LabelEx>
        <TextBoxEx name="ddictTypeName" v-model="model.ddictTypeName"></TextBoxEx>
      </div>
      <div class="row">
        <LabelEx>类型编码：</LabelEx>
        <TextBoxEx name="ddictTypeNameCode" v-model="model.ddictTypeNameCode"></TextBoxEx>
      </div>
    </FormEx>
  </Page>
</template>

<script>
import DialogPageBase from '../../components/mixins/dialog-page-base'
export default {
  name: 'DataDictionaryTypeEdit',
  mixins: [DialogPageBase],
  data () {
    return {
      model: {
        ddictType: '',
        ddictTypeName: '',
        ddictTypeNameCode: '',
        systemId: ''
      },
      rules: {
        systemName: 'required'
      }
    }
  }
}
</script>

<style lang="less">
</style>
