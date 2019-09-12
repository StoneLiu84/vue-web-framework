<template>
  <div class="page-path">
    <i class="iconfont icon-icon_signin"></i>
    <span>系统管理</span>
    <span>系统配置</span>
    <span>系统信息</span>
  </div>
</template>

<script>
export default {
  name: 'PagePath'
}
</script>

<style lang="less" scope>
.page-path {
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
  line-height: 39px;
  font-size: 12px;
  padding: 0px 10px;
  box-sizing: border-box;
  i {
    color: #5cb85c;
    margin-right: 5px;
  }
  span {
    &::after {
      content: '>';
      display: inline-block;
      margin: 0px 5px 0px 8px;
      color: #888888;
      font-size: 14px;
    }
    &:last-of-type::after {
      display: none;
    }
  }
}
</style>
