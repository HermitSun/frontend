<template>
    <el-card class="wrapper">
        <el-row>
            <el-col :span="1">
                <div class="title">主题</div>
            </el-col>
            <el-col :span="23">
                <el-input placeholder="请输入主题" v-model="msgSubject"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="1">
                <div class="title">正文</div>
            </el-col>
            <el-col :span="23">
                <el-input type="textarea" placeholder="请输入内容" v-model="msgContent" class="emailContent"
                          :clearable="true"></el-input>
            </el-col>
        </el-row>
        <el-col :span="24">
            <!--<div class="prompt">-->
            <!--<el-checkbox v-model="sendEmailConcurrently">同时发送邮件（默认只发送站内消息）</el-checkbox>-->
            <!--</div>-->
            <el-button type="primary" icon="el-icon-share" class="publishMsg" @click="publishMsg">发布</el-button>
        </el-col>
    </el-card>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { adminSendMessage } from 'utils/api'

  @Component({})
  export default class EditEmail extends Vue {
    msgSubject: string = ''
    msgContent: string = ''
    sendEmailConcurrently: boolean = false

    publishMsg () {
      adminSendMessage({
        title: this.msgSubject,
        content: this.msgContent
      }).then((res) => {
        if (res.data.succeed) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err.toString(),
          type: 'error'
        })
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 50px 20px;

        .el-row {
            margin: 20px auto;
        }

        .title {
            padding-top: 10px;
            font-weight: bold;
        }

        .toolbar {
            margin: 0;
            padding: 8px 5px;
            border-radius: 4px;
            background: white;

            .el-upload-tip {
                margin-left: 10px;
                color: #a6a9ad;
            }
        }

        .publishMsg {
            float: right;
            margin-bottom: 10px;
            margin-right: 20px;
        }

        .prompt {
            margin-top: 8px;
            margin-left: 20px;
            color: #a6a9ad;
        }
    }
</style>

<style>
    .el-textarea__inner {
        resize: none !important;
        width: 100%;
        height: 390px;
    }
</style>
