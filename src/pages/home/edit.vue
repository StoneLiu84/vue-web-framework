<template>
  <Page>
    <FormEx ref="form" :model="model" :rules="rules">
      <div class="row">
        <Label for="name">姓名：</Label>
        <TextBox name="name" v-model="model.name" v-Tooltip="getErrorTip('name')"></TextBox>
      </div>
      <div class="row">
        <Label for="email">邮箱：</Label>
        <TextBox name="email" v-model="model.email"  v-Tooltip="getErrorTip('email')"></TextBox>
      </div>
      <div class="row">
        <Label for="hero">英雄：</Label>
        <ComboBox name="hero" :data="heroes" v-model="model.hero" v-Tooltip="getErrorTip('hero')"></ComboBox>
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
      rules: {
        name: ['required', 'length[5,10]'],
        email: 'email',
        hero: 'required'
      },
      heroes: [
        { value: 11, text: 'Mr. Nice' },
        { value: 12, text: 'Narco' },
        { value: 13, text: 'Bombasto' },
        { value: 14, text: 'Celeritas' },
        { value: 15, text: 'Magneta' },
        { value: 16, text: 'RubberMan' },
        { value: 17, text: 'Dynama' },
        { value: 18, text: 'Dr IQ' },
        { value: 19, text: 'Magma' },
        { value: 20, text: 'Tornado' }
      ]
    }
  }
}
</script>

<style lang="less">
</style>
