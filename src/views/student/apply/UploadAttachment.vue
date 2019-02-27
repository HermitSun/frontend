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
        <div class="checkApplication">
            <p>請檢查申請表是否填寫完整，確認後點擊進入下一步。</p>
            <div class="footer">
                <el-button @click="$router.push('/student/application')">返回檢查</el-button>
                <el-button type="primary" @click="checkApplication">下一步</el-button>
            </div>
        </div>
        <!--身份證明-->
        <!--學測成績單-->
        <!--教師推薦信-->
        <!--其他材料-->
    </el-card>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class UploadAttachment extends Vue {
    active: number = 0

    checkApplication () {

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

        .footer {
            float: right;
            margin-bottom: 20px;
        }
    }
</style>
