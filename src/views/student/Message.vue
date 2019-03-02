<template>
    <div class="wrapper">
        <div v-if="hasFinished">
            <p style="color: #67C23A">您已完成申請，請耐心等待回復。</p>
        </div>
        <el-table :data="messages" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ props.row.desc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息 MESSAGE" width="850" prop="title"></el-table-column>
            <el-table-column label="时间 TIME" prop="time"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { checkAttachmentUpload, getApplicationStatus } from 'utils/api'

  @Component({})
  export default class Message extends Vue {
    messages: any = [{
      title: '暂无新消息！'
    }, {
      title: 'message2',
      time: '2019.3.1',
      desc: 'message2\'message2\'message2\'message2\'message2\'message2\'message2\''
    }, {
      title: 'message1',
      time: '2019.3.1',
      desc: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻'
    }]
    hasFinished: boolean = false

    mounted () {
      getApplicationStatus()
        .then((res) => {
          this.hasFinished = !!res.data.hasUploaded
        })
        .catch((err) => {
          this.hasFinished = false
        })
      checkAttachmentUpload({
        types: ['身份证明', '学测成绩单', '推荐信', '其他材料']
      }).then((res) => {
        this.hasFinished = !!res.data.hasUploaded
      }).catch((err) => {
        this.hasFinished = false
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

