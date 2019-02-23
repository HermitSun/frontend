<template>
    <el-button type="primary" @click="sendMessage">发布消息</el-button>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class PublishResult extends Vue {
    sendMessage () {
      // 发送消息
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
