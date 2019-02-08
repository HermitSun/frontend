<template>
    <el-card class="wrapper">
        <el-row>
            <el-col :span="1">
                <div class="title">主题</div>
            </el-col>
            <el-col :span="23">
                <el-input placeholder="请输入主题" v-model="emailSubject"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="1">
                <div class="title">附件</div>
            </el-col>
            <el-col :span="23" class="toolbar">
                <el-upload class="upload" action="http://localhost:3000/message/attachment"
                           :on-preview="handleUploadPreview" :on-remove="handleUploadRemove" :multiple="true"
                           :before-remove="beforeUploadRemove" :before-upload="beforeUpload" :limit="3"
                           :on-exceed="handleUploadExceed" :file-list="fileList">
                    <el-button type="primary" size="mini" icon="el-icon-upload2">添加附件</el-button>
                    <span slot="tip" class="el-upload-tip">最多添加3个附件，且附件总大小不能超过 1M</span>
                </el-upload>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="1">
                <div class="title">正文</div>
            </el-col>
            <el-col :span="23">
                <el-input type="textarea" placeholder="请输入内容" v-model="emailContent" class="emailContent"
                          :clearable="true"></el-input>
            </el-col>
        </el-row>
        <el-col :span="24">
            <div class="prompt">
                <i class="el-icon-info"></i>
                <span>消息会发送给通过的学生。</span>
            </div>
            <el-button type="primary" icon="el-icon-document" class="saveEmail">保存</el-button>
        </el-col>
    </el-card>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class EditEmail extends Vue {
    emailSubject: string = ''
    fileSize: number = 0
    fileList = [{
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }, {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }, {
      name: 'food3.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }]
    emailContent: string = ''

    mounted () {
      this.fileSize = 0
    }

    handleUploadRemove (file, fileList) {
      console.log(file, fileList)
    }

    handleUploadPreview (file) {
      console.log(file)
    }

    handleUploadExceed (files, fileList) {
      this.$message.warning(`不能超过 3 个文件`)
    }

    beforeUpload (file) {
      this.fileSize += file.size / 1024 / 1024
      let exceed = this.fileSize > 1
      if (exceed) {
        this.$message({
          message: '附件总大小不能超过1M!',
          type: 'warning'
        })
      }
      return exceed
    }

    beforeUploadRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 25px 20px;

        .el-row {
            margin: 10px auto;
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

        .saveEmail {
            float: right;
            margin-top: -25px;
            margin-bottom: 10px;
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
