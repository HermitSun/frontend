<template>
    <div class="wrapper">
        <el-card>
            <div slot="header">
                <span class="bold">忘記密碼</span>
            </div>
            <el-steps :active="active" finish-status="success">
                <el-step title="填寫信息"></el-step>
                <el-step title="驗證郵箱"></el-step>
                <el-step title="重置密碼"></el-step>
            </el-steps>
            <!--填寫信息-->
            <el-form :model="infoForm" :rules="infoRules" ref="infoForm" v-if="active===0">
                <el-form-item label="電子郵箱" :label-width="this.infoFormWidth" prop="email">
                    <el-input type="email" v-model="infoForm.email" placeholder="電郵"></el-input>
                </el-form-item>
                <el-form-item label="台灣身份證號" :label-width="this.infoFormWidth" prop="idCardNumber">
                    <el-input v-model="infoForm.idCardNumber" placeholder="身份證號"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="this.infoFormWidth" prop="name">
                    <el-input v-model="infoForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="$router.push('/')">取消</el-button>
                    <el-button type="primary" @click="checkInfo">下一步</el-button>
                </el-form-item>
            </el-form>
            <!--驗證郵箱-->
            <el-form :model="verifyForm" :rules="verifyRules" ref="verifyForm" v-else-if="active===1">
                <el-form-item>
                    <span>我們已經向您的電子郵箱發送了驗證郵件，請在下方填寫您收到的驗證碼。</span>
                    <el-button @click="sendVerifyCodeAgain" style="float: right">
                        <span v-if="hasSendVerifyCode">{{sendCodeInterval}}s後重發</span>
                        <span v-else>重新發送</span>
                    </el-button>
                </el-form-item>
                <el-form-item label="驗證碼" :label-width="this.verifyFormWidth" prop="emailVerifyCode">
                    <el-input v-model="emailVerifyCode" placeholder="驗證碼"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="$router.push('/')">取消</el-button>
                    <el-button type="primary" @click="verifyEmail">下一步</el-button>
                </el-form-item>
            </el-form>
            <!--重置密碼-->
            <el-form :model="resetForm" :rules="resetRules" ref="resetForm" v-if="active===2">
                <el-form-item label="新密碼" :label-width="this.resetFormWidth" prop="password">
                    <el-input type="password" v-model="resetForm.password" placeholder="密碼"></el-input>
                </el-form-item>
                <el-form-item label="確認密碼" :label-width="this.resetFormWidth" prop="confirmPassword">
                    <el-input type="password" v-model="resetForm.confirmPassword" placeholder="確認密碼"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="$router.push('/')">取消</el-button>
                    <el-button type="primary" @click="finishReset">完成</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { sendVerifyEmail } from 'utils/api'

  @Component({})
  export default class ForgetPassword extends Vue {
    active: number = 0

    infoForm: any = {
      email: '',
      idCardNumber: '',
      name: ''
    }
    infoRules: any = {
      email: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('請輸入郵箱'))
            } else if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) {
              callback(new Error('郵箱格式錯誤'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ],
      idCardNumber: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('請輸入身份證號'))
            } else if (!/^[A-Z][0-9]{9}$/.test(value)) {
              callback(new Error('請檢查身份證是否正確'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '請輸入姓名', trigger: 'change' }
      ]
    }
    infoFormWidth: string = '120px'

    verifyForm: any = {
      emailVerifyCode: ''
    }
    verifyRules: any = {
      emailVerifyCode: [
        { required: true, message: '請輸入驗證碼', trigger: 'blur' }
      ]
    }
    verifyFormWidth: string = '100px'
    hasSendVerifyCode: boolean = false
    sendCodeInterval: number = 60

    resetForm: any = {
      password: '',
      confirmPassword: ''
    }
    resetRules: any = {
      password: [
        { required: true, message: '請輸入密碼', trigger: 'change' }
      ],
      confirmPassword: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('請再次輸入密碼'))
            } else if (value !== this.resetForm.password) {
              callback(new Error('兩次輸入密碼不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ],
    }
    resetFormWidth: string = '100px'

    sendVerifyCodeAgain () {
      sendVerifyEmail().then((res) => {
        this.hasSendVerifyCode = true
        this.sendCodeInterval = 60
        let countDown = window.setInterval(() => {
          --this.sendCodeInterval
          if (this.sendCodeInterval < 0) {
            window.clearInterval(countDown)
            this.hasSendVerifyCode = false
            this.sendCodeInterval = 60
          }
        }, 1000)
      }).catch((err) => {
        this.$message({
          message: '發送失敗',
          type: 'error'
        })
      })
    }

    checkInfo () {
      // let form: any = this.$refs.infoForm
      // form.validate((valid) => {
      //   if (valid) {
      //     ++this.active
      //   } else {
      //     this.$message({
      //       message: '內容有誤，請重新填寫',
      //       type: 'error'
      //     })
      //     return false
      //   }
      // })
      ++this.active
    }

    verifyEmail () {
      // let form: any = this.$refs.verifyForm
      // form.validate((valid) => {
      //   if (valid) {
      //     ++this.active
      //   } else {
      //     this.$message({
      //       message: '驗證碼錯誤',
      //       type: 'error'
      //     })
      //     return false
      //   }
      // })
      ++this.active
    }

    finishReset () {
      let form: any = this.$refs.resetForm
      form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '密碼重置成功',
            type: 'success'
          })
          setTimeout(function () {
            this.$router.push('/')
          }.bind(this), 1000)
        } else {
          this.$message({
            message: '驗證碼錯誤',
            type: 'error'
          })
          return false
        }
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .el-card {
            width: 640px;
            position: relative;
            top: 160px;
            left: 400px;

            .bold {
                font-size: 18px;
                font-weight: bold;
            }

            .el-form {
                margin-top: 30px;
                margin-right: 20px;

                .footer {
                    float: right;
                }
            }
        }
    }
</style>
