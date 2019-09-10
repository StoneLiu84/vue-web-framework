<template>
  <header>
    <div class="logo">Vue Web Framework</div>
    <div class="user" @click="onUserClick">
      <div class="avatar"><i class="iconfont icon-icon_signal_fill"></i></div>
      <div class="name">
        <div class="main">张三</div>
        <div class="sub">zhangsan</div>
      </div>
      <i class="arrow iconfont icon-icon_down" :class="menuVisible ? 'extend' : ''"></i>
      <div class="menu-list" :style="{'height': (menuVisible ? 70 : 0) + 'px'}">
        <div class="menu-list-item" @click.stop="onMenuClick"><i class="iconfont icon-icon_signal"></i>个人信息</div>
        <div class="menu-list-item" @click.stop="onMenuClick"><i class="iconfont icon-icon_sport"></i> 注销</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menuVisible: false
    }
  },
  methods: {
    onUserClick () {
      this.menuVisible = !this.menuVisible
    },
    onMenuClick () {}
  }
}
</script>

<style lang="less" scoped>
@import '../../theme/css/base.less';
header {
  background-color: @header-background-color;
  height: 50px;
  color: #ffffff;
  z-index: 2;
  position: relative;
  .logo {
    font-size: 22px;
    margin: 5px 50px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .user {
    position: absolute;
    right: 20px;
    top: 5px;
    padding-left: 50px;
    padding-right: 25px;
    height: 40px;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 0px;
      top: 0px;
      border: 1px solid #ffffff;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      overflow: hidden;
      i {
          font-size: 36px;
          margin-top: 3px;
          display: block;
      }
    }
    .name {
      padding: 3px 0px;
      .main {
        line-height: 20px;
      }
      .sub {
        font-size: 12px;
        color: #e8e8e8;
        line-height: 10px;
      }
    }
    .arrow {
      position: absolute;
      right: 0px;
      top: 13px;
      font-size: 12px;
      transition: 0.5s;
      transform: rotate(-180deg);
      &.extend {
        transform: rotate(0deg);
      }
    }
    .menu-list {
      overflow: hidden;
      position: absolute;
      background-color: #ffffff;
      box-shadow: 0px 3px 9px rgba(0,0,0,0.2);
      color: #555555;
      left: 0px;
      width: 100%;
      box-sizing: border-box;
      top: 45px;
      font-size: 12px;
      border: 1px solid #e8e8e8;
      transition: 0.5s;
      .menu-list-item {
        line-height: 34px;
        box-sizing: border-box;
        height: 35px;
        padding: 0px 15px;
        border-bottom: 1px solid #e8e8e8;
        i {
          font-size: 12px;
          margin-right: 5px;
        }
        &:hover {
          background-color: #f5f5f5;
        }
        &:last-of-type {
          border-bottom: 0px;
        }
      }
    }
    &:hover {
      text-shadow: 0px 0px 5px rgba(255,255,255,0.5);
      .avatar {
        box-shadow: 0px 0px 5px rgba(255,255,255,0.5);
      }
    }
  }
}
</style>
