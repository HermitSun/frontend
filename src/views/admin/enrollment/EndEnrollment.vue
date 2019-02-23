<template>
    <el-button type="primary" @click="endEnroll">结束本次招生</el-button>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class EndEnrollment extends Vue {
    endEnroll () {
      // 结束招生
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .el-button {
        width: 98*3px;
        height: 40*3px;
        position: relative;
        top: 200px;
        left: 400px;
    }
</style>
