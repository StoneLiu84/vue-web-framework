<template>
  <div class="search-bar">
    <div class="col"><ComboBox inputId="c1" v-model="comboValue" :data="comboData"></ComboBox></div>
    <div class="col"><TextBox placeholder="输入关键字搜索"></TextBox></div>
    <div class="col"><LinkButton btnCls="btn-default">搜索</LinkButton></div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      comboValue: '',
      comboData: [
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

<style lang="less" scoped>
.search-bar {
  position: absolute;
  width: 400px;
  right: 10px;
  top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  .col {
    flex: 1;
    margin-left: -1px;
    &:first-of-type {
      margin-left: 0px;
      flex: none;
      width: 150px;
      .textbox {
        border-radius: 3px 0px 0px 3px;
      }
    }
    &:last-of-type {
      flex: none;
      width: 38px;
      .l-btn {
        border-radius: 0px 3px 3px 0px;
        .l-btn-text {
          line-height: 28px;
        }
      }
    }
  }
  .textbox {
    border-radius: 0px;
    width: 100%;
  }
}
</style>
