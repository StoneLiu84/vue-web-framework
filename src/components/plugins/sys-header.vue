<template>
  <header>
    <div class="logo">Vue Web Framework</div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
@import '../../theme/css/base.less';
header {
  background-color: @header-background-color;
  height: 50px;
  color: #ffffff;
  overflow: hidden;
  .logo {
    font-size: 22px;
    margin: 5px 50px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
