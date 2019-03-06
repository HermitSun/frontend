<template>
    <div class="wrapper">
        <el-button type="primary" @click="dialogVisible=true" class="checkResult">點擊查看面試結果</el-button>
        <el-dialog title="面試結果" :visible.sync="dialogVisible" :before-close="handleClose">
            <div v-if="!hasReleased">面試結果尚未發佈</div>
            <div v-else-if="hasReleased&&hasPassed">恭喜您，您已通過面試</div>
            <div v-else-if="hasReleased&&!hasPassed">很遺憾，您沒有通過面試</div>
            <div slot="footer" class="footer">
                <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="dialogVisible = false">確 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class SeniorCheck extends Vue {
    dialogVisible: boolean = false
    hasReleased: boolean = false
    hasPassed: boolean = false

    handleClose () {
      this.$confirm('確認關閉？')
        .then(_ => {
          this.dialogVisible = false
        })
        .catch(_ => {
        })
    }
  }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .checkResult {
            margin-top: 50px;
            margin-left: 100px;
        }
    }
</style>
