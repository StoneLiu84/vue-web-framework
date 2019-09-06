<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
  font-family: "Helvetica Neue", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  color: #2c3e50;
}
.ps__thumb-y {
  width: 4px;
  right: 1px;
}
.ps__thumb-x {
  height: 4px;
  bottom: 1px;
}
</style>
