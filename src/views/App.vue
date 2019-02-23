<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class App extends Vue {
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    body {
        margin: 0;
        padding: 0;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }

    #app {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .el-submenu {
        vertical-align: baseline;
    }

    .el-menu-item {
        vertical-align: baseline;
        margin-left: 10px;
        margin-right: 10px;
    }

    .toolbar {
        background: #f2f2f2;
        padding: 10px;
        margin: 10px 0;

        .el-form-item {
            margin-bottom: 10px;
        }
    }
</style>
