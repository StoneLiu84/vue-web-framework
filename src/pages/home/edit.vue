<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <Label for="systemId">系统ID：</Label>
        <TextBox name="systemId" v-model="model.systemId" disabled></TextBox>
      </div>
      <div class="row">
        <Label for="systemName">系统名称：</Label>
        <TextBox name="systemName" v-model="model.systemName" v-Tooltip="getErrorTip('systemName')"></TextBox>
      </div>
    </FormEx>
  </Page>
</template>

<script>
import DialogPageBase from '../../components/mixins/dialog-page-base'
export default {
  name: 'Edit',
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
</style>
