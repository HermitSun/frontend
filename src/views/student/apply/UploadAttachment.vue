<template>
    <el-card class="wrapper">
        <el-steps :active="active" finish-status="success">
            <el-step title="檢查申請表"></el-step>
            <el-step title="身份證明"></el-step>
            <el-step title="學測成績單"></el-step>
            <el-step title="教師推薦信"></el-step>
            <el-step title="其他材料"></el-step>
        </el-steps>
        <!--檢查申請表-->
        <div class="checkApplication" v-show="active===0">
            <p v-if="hasFinishedUpload" style="color: #67C23A">您已完成附件上傳。</p>
            <p v-else>請檢查申請表是否填寫完整，確認後點擊進入下一步。</p>
            <div class="footer">
                <el-button @click="$router.push('/student/application')" v-if="!hasFinishedUpload">返回檢查</el-button>
                <el-button type="primary" @click="++active">
                    {{hasFinishedUpload?'重新上傳':'下一步'}}
                </el-button>
            </div>
        </div>
        <!--身份證明-->
        <div class="identity" v-show="active===1">
            <p>請在此上傳在台灣居住的有效身份證明和《台灣居民來往大陸通行證》。</p>
            <el-upload class="upload" drag :action="uploadServer" :file-list="identityList" :limit="2"
                       ref="identityUpload" :auto-upload="false" :headers="tokenHeader" :http-request="uploadIdentity"
                       :on-exceed="handleFileExceed" :on-success="handleUploadSuccess" :on-error="handleUploadError"
                       :before-upload="beforeFileUpload" :on-remove="handleIdentityRemove"
                       :on-change="handleIdentityChanges">
                <i class="el-icon-upload"></i>
                <div style="color: #909399">將文件拖到此處，或
                    <b style="color: #409EFF">點擊上傳</b>
                </div>
                <div slot="tip" style="color: #909399; font-size: 12px;">
                    只能上傳不超過<span class="mark">兩個PDF</span>文件，且大小不超過<span class="mark">20M</span>
                    {{hasFinishedUpload?'；':''}}
                    <span class="mark">{{hasFinishedUpload?'為確保準確，如需修改，請重新上傳':''}}</span>
                </div>
            </el-upload>
            <div class="footer">
                <el-button type="primary" @click="identityUpload">確認上傳</el-button>
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="++active" :disabled="!canSkipIdentity">下一步</el-button>
            </div>
        </div>
        <!--學測成績單-->
        <div class="transcript" v-show="active===2">
            <p>請在此上傳2019年學測成績單。</p>
            <el-upload class="upload" drag :action="uploadServer" :file-list="transcriptList" :limit="1"
                       ref="transcriptUpload" :auto-upload="false" :headers="tokenHeader"
                       :http-request="uploadTranscript" :on-exceed="handleFileExceed" :on-success="handleUploadSuccess"
                       :before-upload="beforeFileUpload" :on-error="handleUploadError"
                       :on-remove="handleTranscriptRemove" :on-change="handleTranscriptChanges">
                <i class="el-icon-upload"></i>
                <div style="color: #909399">將文件拖到此處，或
                    <b style="color: #409EFF">點擊上傳</b>
                </div>
                <div slot="tip" style="color: #909399; font-size: 12px;">
                    只能上傳不超過<span class="mark">兩個PDF</span>文件，且大小不超過<span class="mark">20M</span>
                    {{hasFinishedUpload?'；':''}}
                    <span class="mark">{{hasFinishedUpload?'為確保準確，如需修改，請重新上傳':''}}</span>
                </div>
            </el-upload>
            <div class="footer">
                <el-button type="primary" @click="transcriptUpload">確認上傳</el-button>
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="++active" :disabled="!canSkipTranscript">下一步</el-button>
            </div>
        </div>
        <!--教師推薦信-->
        <div class="recommend" v-show="active===3">
            <p>請在此上傳由兩位熟悉本人的中學資深教師出具的推薦信。</p>
            <el-upload class="upload" drag :action="uploadServer" :file-list="recommendList" :limit="2"
                       ref="recommendUpload" :auto-upload="false" :headers="tokenHeader" :http-request="uploadRecommend"
                       :on-exceed="handleFileExceed" :on-success="handleUploadSuccess"
                       :before-upload="beforeFileUpload" :on-error="handleUploadError"
                       :on-remove="handleRecommendRemove" :on-change="handleRecommendChanges">
                <i class="el-icon-upload"></i>
                <div style="color: #909399">將文件拖到此處，或
                    <b style="color: #409EFF">點擊上傳</b>
                </div>
                <div slot="tip" style="color: #909399; font-size: 12px;">
                    只能上傳不超過<span class="mark">兩個PDF</span>文件，且大小不超過<span class="mark">20M</span>
                    {{hasFinishedUpload?'；':''}}
                    <span class="mark">{{hasFinishedUpload?'為確保準確，如需修改，請重新上傳':''}}</span>
                </div>
            </el-upload>
            <div class="footer">
                <el-button type="primary" @click="recommendUpload">確認上傳</el-button>
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="++active" :disabled="!canSkipRecommend">下一步</el-button>
            </div>
        </div>
        <!--其他材料-->
        <div class="others" v-show="active===4">
            <p>請在此上傳其他相關材料。</p>
            <el-upload class="upload" drag :action="uploadServer" :file-list="othersList" :limit="3"
                       ref="othersUpload" :auto-upload="false" :headers="tokenHeader" :http-request="uploadOthers"
                       :on-exceed="handleFileExceed" :on-success="handleUploadSuccess" :on-change="handleOthersChanges"
                       :before-upload="beforeFileUpload" :on-error="handleUploadError" :on-remove="handleOthersRemove">
                <i class="el-icon-upload"></i>
                <div style="color: #909399">將文件拖到此處，或
                    <b style="color: #409EFF">點擊上傳</b>
                </div>
                <div slot="tip" style="color: #909399; font-size: 12px;">
                    只能上傳不超過<span class="mark">兩個PDF</span>文件，且大小不超過<span class="mark">20M</span>
                    {{hasFinishedUpload?'；':''}}
                    <span class="mark">{{hasFinishedUpload?'為確保準確，如需修改，請重新上傳':''}}</span>
                </div>
            </el-upload>
            <div class="footer">
                <el-button type="primary" @click="othersUpload">確認上傳</el-button>
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="finishUpload" :disabled="!canSkipOthers">完成</el-button>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { getStudentToken } from 'utils/token.ts'
  import { checkAttachmentUpload, getAttachmentNames, sendAttachment } from 'utils/api'
  import { isArray } from 'utils/common'

  @Component({})
  export default class UploadAttachment extends Vue {
    active: number = 0
    hasFinishedUpload: boolean = false

    uploadServer: string = 'http://localhost:3141/application/attachment'

    identityList: any = []
    identityNames: any = []
    identityFileData: any = new FormData()
    hasFinishedIdentity: boolean = false

    transcriptList: any = []
    transcriptNames: any = []
    transcriptFileData: any = new FormData()
    hasFinishedTranscript: boolean = false

    recommendList: any = []
    recommendNames: any = []
    recommendFileData: any = new FormData()
    hasFinishedRecommend: boolean = false

    othersList: any = []
    othersNames: any = []
    othersFileData: any = new FormData()
    hasFinishedOthers: boolean = false

    mounted () {
      // 获取附件上传状态
      checkAttachmentUpload({
        types: ['身份证明', '学测成绩单', '推荐信', '其他材料']
      }).then((res) => {
        this.hasFinishedUpload = res.data.hasUploaded
        if (this.hasFinishedUpload) {
          this.hasFinishedIdentity = true
          this.hasFinishedTranscript = true
          this.hasFinishedRecommend = true
          this.hasFinishedOthers = true
        }
      }).catch((err) => {
        this.hasFinishedUpload = false
      })
    }

    get tokenHeader () {
      let token = getStudentToken()
      return {
        Authorization: `Bearer ${token}`
      }
    }

    get canSkipIdentity () {
      return this.hasFinishedUpload || (this.identityNames.length > 0 && this.hasFinishedIdentity)
    }

    get canSkipTranscript () {
      return this.hasFinishedUpload || (this.transcriptNames.length > 0 && this.hasFinishedTranscript)
    }

    get canSkipRecommend () {
      return this.hasFinishedUpload || (this.recommendNames.length > 0 && this.hasFinishedRecommend)
    }

    get canSkipOthers () {
      return this.hasFinishedUpload || (this.othersNames.length > 0 && this.hasFinishedOthers)
    }

    // 身份證明
    identityUpload () {
      let upload: any = this.$refs.identityUpload
      upload.submit()
      let header: any = {
        headers: { "Content-Type": "multipart/form-data" }
      }
      if (this.identityFileData.getAll('file').length === 0) {
        this.$message.error('請按照要求上傳附件')
      } else {
        this.identityFileData.append('type', '身份证明')
        this.identityFileData.getAll('file').forEach(file => {
          if (this.identityNames.indexOf(file.name) < 0) {
            this.identityNames.push(file.name)
          }
        })
        sendAttachment(this.identityFileData, header)
          .then(res => {
            if (res.data.succeed) {
              this.$message.success("上傳成功")
              this.hasFinishedIdentity = true
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }

    uploadIdentity (file) {
      this.identityFileData.append('file', file.file)
    }

    handleIdentityRemove (file, fileList) {
      let uploads = this.identityFileData.getAll('file')
      if (isArray(uploads)) { // 不止一個文件
        uploads = uploads.filter(upload => {
          return upload.uid !== file.uid
        })
        this.identityFileData.delete('file')
        this.identityNames = []
        uploads.forEach(upload => {
          this.identityFileData.append('file', upload)
          this.identityNames.push(upload.name)
        })
      } else {
        this.identityFileData.delete('file')
      }
    }

    handleIdentityChanges (file, fileList) {
      let names = []
      fileList.forEach(file => {
        names.push(file.name)
      })
      let index = names.indexOf(file.name)
      if (index !== fileList.length - 1) {
        this.identityList = fileList.slice(-1)
      }
    }

    // 學測成績單
    transcriptUpload () {
      let upload: any = this.$refs.transcriptUpload
      upload.submit()
      let header: any = {
        headers: { "Content-Type": "multipart/form-data" }
      }
      if (this.transcriptFileData.getAll('file').length === 0) {
        this.$message.error('請按照要求上傳附件')
      } else {
        this.transcriptFileData.append('type', '学测成绩单')
        this.transcriptFileData.getAll('file').forEach(file => {
          if (this.transcriptNames.indexOf(file.name) < 0) {
            this.transcriptNames.push(file.name)
          }
        })
        sendAttachment(this.transcriptFileData, header)
          .then(res => {
            if (res.data.succeed) {
              this.$message.success("上傳成功")
              this.hasFinishedTranscript = true
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }

    uploadTranscript (file) {
      this.transcriptFileData.append('file', file.file)
    }

    handleTranscriptRemove (file, fileList) {
      let uploads = this.transcriptFileData.getAll('file')
      if (isArray(uploads)) { // 不止一個文件
        uploads = uploads.filter(upload => {
          return upload.uid !== file.uid
        })
        this.transcriptFileData.delete('file')
        this.transcriptNames = []
        uploads.forEach(upload => {
          this.transcriptFileData.append('file', upload)
          this.transcriptNames.push(upload.name)
        })
      } else {
        this.transcriptFileData.delete('file')
      }
    }

    handleTranscriptChanges (file, fileList) {
      let names = []
      fileList.forEach(file => {
        names.push(file.name)
      })
      let index = names.indexOf(file.name)
      if (index !== fileList.length - 1) {
        this.transcriptList = fileList.slice(-1)
      }
    }

    // 推薦信
    recommendUpload () {
      let upload: any = this.$refs.recommendUpload
      upload.submit()
      let header: any = {
        headers: { "Content-Type": "multipart/form-data" }
      }
      if (this.recommendFileData.getAll('file').length === 0) {
        this.$message.error('請按照要求上傳附件')
      } else {
        this.recommendFileData.append('type', '推荐信')
        this.recommendFileData.getAll('file').forEach(file => {
          if (this.recommendNames.indexOf(file.name) < 0) {
            this.recommendNames.push(file.name)
          }
        })
        sendAttachment(this.recommendFileData, header)
          .then(res => {
            if (res.data.succeed) {
              this.$message.success("上傳成功")
              this.hasFinishedRecommend = true
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }

    uploadRecommend (file) {
      this.recommendFileData.append('file', file.file)
    }

    handleRecommendRemove (file, fileList) {
      let uploads = this.recommendFileData.getAll('file')
      if (isArray(uploads)) { // 不止一個文件
        uploads = uploads.filter(upload => {
          return upload.uid !== file.uid
        })
        this.recommendFileData.delete('file')
        this.recommendNames = []
        uploads.forEach(upload => {
          this.recommendFileData.append('file', upload)
          this.recommendNames.push(upload.name)
        })
      } else {
        this.recommendFileData.delete('file')
      }
    }

    handleRecommendChanges (file, fileList) {
      let names = []
      fileList.forEach(file => {
        names.push(file.name)
      })
      let index = names.indexOf(file.name)
      if (index !== fileList.length - 1) {
        this.recommendList = fileList.slice(-1)
      }
    }

    // 其他材料
    othersUpload () {
      let upload: any = this.$refs.othersUpload
      upload.submit()
      let header: any = {
        headers: { "Content-Type": "multipart/form-data" }
      }
      if (this.othersFileData.getAll('file').length === 0) {
        this.$message.error('請按照要求上傳附件')
      } else {
        this.othersFileData.append('type', '其他材料')
        this.othersFileData.getAll('file').forEach(file => {
          if (this.othersNames.indexOf(file.name) < 0) {
            this.othersNames.push(file.name)
          }
        })
        sendAttachment(this.othersFileData, header)
          .then(res => {
            if (res.data.succeed) {
              this.$message.success("上傳成功")
              this.hasFinishedOthers = true
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }

    uploadOthers (file) {
      this.othersFileData.append('file', file.file)
    }

    handleOthersRemove (file, fileList) {
      let uploads = this.othersFileData.getAll('file')
      if (isArray(uploads)) { // 不止一個文件
        uploads = uploads.filter(upload => {
          return upload.uid !== file.uid
        })
        this.othersFileData.delete('file')
        this.othersNames = []
        uploads.forEach(upload => {
          this.othersFileData.append('file', upload)
          this.othersNames.push(upload.name)
        })
      } else {
        this.othersFileData.delete('file')
      }
    }

    handleOthersChanges (file, fileList) {
      let names = []
      fileList.forEach(file => {
        names.push(file.name)
      })
      let index = names.indexOf(file.name)
      if (index !== fileList.length - 1) {
        this.othersList = fileList.slice(-1)
      }
    }

    beforeFileUpload (file) {
      const isPDF = file.type === 'application/pdf'
      const underLimit = file.size / 1024 / 1024 <= 20
      return isPDF && underLimit
    }

    handleFileExceed () {
      this.$message.warning('文件數量超過限制')
    }

    handleUploadSuccess (response) {
      if (response.succeed) {
        this.$message.success('上傳成功')
      } else {
        this.$message.error('上傳失敗')
      }
    }

    handleUploadError (err) {
      this.$message.error(err)
    }

    finishUpload () {
      this.$message.success('附件上傳完成')
      this.hasFinishedUpload = true
      this.active = 0
      this.identityList = []
      this.identityFileData = new FormData()
      this.transcriptList = []
      this.transcriptFileData = new FormData()
      this.recommendList = []
      this.recommendFileData = new FormData()
      this.othersList = []
      this.othersFileData = new FormData()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 30px 80px;
        width: 1000px;

        .checkApplication {
            margin-top: 30px;
        }

        .identity {
            margin-top: 30px;
        }

        .transcript {
            margin-top: 30px;
        }

        .footer {
            float: right;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .mark {
            font-weight: bold;
            color: #F56C6C;
        }
    }
</style>
