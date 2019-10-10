<template>
  <Form
    ref="form"
    :model="model"
    :rules="rules"
    @validate="onValidate">
    <slot></slot>
  </Form>
</template>

<script>
import Emitter from '../mixins/emitter'
export default {
  name: 'FormEx',
  mixins: [Emitter],
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    onValidate (errors) {
      this.$emit('validate', errors)
      this.dispatch('DialogPage', 'validate', errors)
    },
    validate (fn) {
      this.$refs.form.validate(fn)
    }
  }
}
</script>

<style lang="less">
form {
  display: block;
  margin: 10px;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    .textbox-label {
      width: 100px;
      text-align: right;
      box-sizing: border-box;
      padding: 0px 5px;
    }
    .f-field {
      flex: 1;
    }
    & + .row {
      margin-top: 8px;
    }
  }
}
</style>
