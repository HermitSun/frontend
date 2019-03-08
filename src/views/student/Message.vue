<template>
    <div class="wrapper">
        <div v-if="hasFinishedForm&&hasFinishedAttachment">
            <p style="color: #67C23A">您已完成申請，請耐心等待結果。</p>
        </div>
        <el-table :data="messages" style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ props.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息 MESSAGE" min-width="600" prop="title"></el-table-column>
            <el-table-column label="时间 TIME" min-width="120" prop="releasedTime"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { checkAttachmentUpload, getApplicationStatus, studentGetMessage } from 'utils/api'

  @Component({})
  export default class Message extends Vue {
    messages: any = []
    hasFinishedForm: boolean = false
    hasFinishedAttachment: boolean = false

    mounted () {
      getApplicationStatus()
        .then((res) => {
          this.hasFinishedForm = !!res.data.hasUploaded
        })
        .catch((err) => {
          this.hasFinishedForm = false
        })
      checkAttachmentUpload({
        types: ['身份证明', '学测成绩单', '推荐信', '考生照片', '其他材料']
      }).then((res) => {
        this.hasFinishedAttachment = !!res.data.hasUploaded
      }).catch((err) => {
        this.hasFinishedAttachment = false
      })
      studentGetMessage()
        .then((res) => {
          if (res.data.length > 0) {
            res.data.forEach(datum => {
              datum.releasedTime = datum.releasedTime.split('T')[0]
              this.messages.push(datum)
            })
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 30px 20px 0 20px;
        height: 100% !important;
    }
</style>

<style>
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
</style>

