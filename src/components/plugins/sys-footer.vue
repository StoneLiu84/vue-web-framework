<template>
  <footer>版权所有 © xxx有限公司</footer>
</template>

<script>
export default {
  name: 'SysFooter'
}
</script>

<style lang="less">
@import '../../theme/css/base.less';
footer {
  height: 31px;
  border-left: 0px;
  border-right: 0px;
  color: #848484;
  line-height: 30px;
  text-align: center;
  background-color: @footer-background;
  position: relative;
  border-top: 1px solid #d4d4d4;
  font-size: 12px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
