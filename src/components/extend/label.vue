<template>
  <Label :align="align"><slot></slot></Label>
</template>

<script>
export default {
  name: 'LabelEx',
  props: {
    align: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style lang="less">

</style>
