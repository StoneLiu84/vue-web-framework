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
  font-size: 12px;
  color: #2c3e50;
}
.ps__thumb-y,
.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
  width: 4px;
  right: 1px;
}
.ps__rail-y {
  width: 6px;
}
.ps__thumb-x,
.ps__rail-x:hover > .ps__thumb-x,
.ps__rail-x:focus > .ps__thumb-x,
.ps__rail-x.ps--clicking .ps__thumb-x {
  height: 4px;
  bottom: 1px;
}
.ps__rail-x {
  height: 6px;
}

</style>
