<template>
    <div class="wrapper">
        <el-button type="primary" @click="dialogVisible=true" class="checkResult">點擊查看初審結果</el-button>
        <el-dialog title="初審結果" :visible.sync="dialogVisible" :before-close="handleClose">
            <div v-if="!hasReleased">初審結果尚未發佈！</div>
            <div v-else-if="hasReleased&&hasPassed" style="color: #67C23A">恭喜您，您已通過初審!</div>
            <div v-else-if="hasReleased&&!hasPassed" style="color: #909399">很遺憾，您沒有通過初審。</div>
            <div slot="footer" class="footer">
                <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="dialogVisible = false">確 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { getEmailAddress } from 'utils/token.ts'
  import { getResultMessage } from 'utils/api'

  @Component({})
  export default class JuniorCheck extends Vue {
    dialogVisible: boolean = false
    hasReleased: boolean = false
    hasPassed: boolean = false

    mounted () {
      const email = getEmailAddress()
      if (email) {
        getResultMessage({
          email: email
        }).then(res => {
          if (res.data.succ) {
            this.hasReleased = true
            this.hasPassed = res.data.from === 0;
          } else {
            this.$message({
              message: res.data.message === 'No such from' ? '結果尚未發佈' : res.data.message,
              type: res.data.message === 'No such from' ? 'info' : 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '獲取失敗',
            type: 'error'
          })
        })
      }
    }

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
