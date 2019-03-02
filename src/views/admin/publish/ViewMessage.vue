<template>
    <div class="wrapper">
        <el-table :data="messages" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class ViewMessage extends Vue {
    messages: any = []
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
