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
                <el-button type="primary" @click="checkApplication">
                    {{hasFinishedUpload?'檢查已上傳附件':'下一步'}}
                </el-button>
            </div>
        </div>
        <!--身份證明-->
        <div class="identity" v-show="active===1">
            <p>請在此上傳在台灣居住的有效身份證明和《台灣居民來往大陸通行證》。</p>
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/" drag multiple
                       :file-list="identityList" :limit="2" :disabled="this.identityDisabled"
                       :before-upload="beforeFileUpload" :on-remove="handleFileRemove" :on-exceed="handleFileExceed">
                <i class="el-icon-upload"></i>
                <div :style="this.identityDisabled?'color: #909399':''">將文件拖到此處，或
                    <b :style="this.identityDisabled?'color: #909399':'color: #409EFF'">點擊上傳</b>
                </div>
                <div slot="tip" style="color: #909399">只能上傳PDF文件，且不超過20M</div>
            </el-upload>
            <div class="footer">
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="checkIdentity">下一步</el-button>
            </div>
        </div>
        <!--學測成績單-->
        <div class="transcript" v-show="active===2">
            <p>請在此上傳2019年學測成績單。</p>
            <div class="footer">
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="checkTranscript">下一步</el-button>
            </div>
        </div>
        <!--教師推薦信-->
        <div class="recommend" v-show="active===3">
            <p>請在此上傳由兩位熟悉本人的中學資深教師出具的推薦信。</p>
            <div class="footer">
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="checkRecommend">下一步</el-button>
            </div>
        </div>
        <!--其他材料-->
        <div class="others" v-show="active===4">
            <p>請在此上傳其他相關材料。</p>
            <div class="footer">
                <el-button @click="--active">上一步</el-button>
                <el-button type="primary" @click="finishUpload">完成</el-button>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
  import { Vue, Component, Inject } from 'vue-property-decorator'

  @Component({})
  export default class UploadAttachment extends Vue {
    active: number = 0
    hasFinishedUpload: boolean = false

    identityList: any = [
      { name: 'test1.pdf', url: 'null' },
      { name: 'test2.pdf', url: 'null' }
    ]
    identityDisabled: boolean = this.identityList.length >= 2

    mounted () {
      // 獲取相應的內容
    }

    beforeFileUpload () {

    }

    handleFileRemove (file, fileList) {
      this.$confirm('將刪除該文件，是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('已刪除')
      }).catch(() => {
        this.$message.info('已取消')
      })
    }

    handleFileExceed () {
      this.$message.warning('至多上傳兩個文件')
    }

    checkApplication () {
      ++this.active
    }

    checkIdentity () {
      ++this.active
    }

    checkTranscript () {
      ++this.active
    }

    checkRecommend () {
      ++this.active
    }

    finishUpload () {
      this.$message.success('附件上傳完成')
      this.hasFinishedUpload = true
      this.active = 0
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 25px 80px;
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
    }
</style>
