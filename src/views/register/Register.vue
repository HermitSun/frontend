<template>
    <div class="wrapper">
        <el-card>
            <div slot="header">
                <span class="bold">註冊</span>
            </div>
            <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
                <el-form-item label="郵箱" :label-width="this.registerFormWidth" prop="email">
                    <el-input type="email" placeholder="請輸入郵箱" v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="台灣身份證號" :label-width="this.registerFormWidth" prop="idCardNumber">
                    <el-input placeholder="請輸入身份證號" v-model="registerForm.idCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="密碼" :label-width="this.registerFormWidth" prop="password">
                    <el-input type="password" placeholder="請確認密碼" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="確認密碼" :label-width="this.registerFormWidth" prop="confirmPassword">
                    <el-input type="password" placeholder="請確認密碼" v-model="registerForm.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="this.registerFormWidth" prop="name">
                    <el-input placeholder="請輸入姓名" v-model="registerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="this.registerFormWidth">
                    <el-date-picker v-model="registerForm.birthDate" type="date" value-format="yyyy-MM-dd"
                                    placeholder="可選"></el-date-picker>
                </el-form-item>
                <el-form-item label="聯繫電話" :label-width="this.registerFormWidth">
                    <el-input placeholder="可選" v-model="registerForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="家庭地址" :label-width="this.registerFormWidth">
                    <el-input placeholder="可選" v-model="registerForm.address"></el-input>
                </el-form-item>
                <el-form-item label="就讀高中" :label-width="this.registerFormWidth">
                    <el-cascader expand-trigger="hover" :options="schoolOptions" v-model="registerForm.highSchool"
                                 placeholder="可選" filterable clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="$router.push('/')">返回登錄</el-button>
                    <el-button type="primary" @click="registerStudent">立即註冊</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { registerUser } from 'utils/api'
  import highSchools from '@/views/student/apply/highSchools.ts'

  @Component({})
  export default class Register extends Vue {
    schoolOptions: any = highSchools
    registerForm: any = {
      name: '',
      idCardNumber: '',
      password: '',
      confirmPassword: '',
      email: '',
      tel: '',
      birthDate: '',
      address: '',
      highSchool: []
    }
    registerRules: any = {
      name: [
        { required: true, message: '請輸入姓名', trigger: 'change' }
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
      password: [
        { required: true, message: '請輸入密碼', trigger: 'change' },
        { min: 9, message: '長度至少為9位', trigger: 'blur' }
      ],
      confirmPassword: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('請再次輸入密碼'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('兩次輸入密碼不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ],
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
      ]
    }
    registerFormWidth: string = '120px'

    registerStudent () {
      let form: any = this.$refs.registerForm
      form.validate((valid) => {
        if (valid) {
          let form: any = (<any> Object).assign({}, this.registerForm)
          form.highSchool = this.registerForm.highSchool.toString()
          console.log(form)
          registerUser(form)
            .then((res) => {
              if (res.data.succeed) {
                this.$message({
                  message: '註冊成功',
                  type: 'success'
                })
                this.$router.push('/')
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
                form.resetFields()
              }
            })
            .catch((err) => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
        } else {
          this.$message({
            message: '內容不符合要求，請重新填寫',
            type: 'error'
          })
          form.resetFields()
        }
      })

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .el-card {
            width: 600px;
            position: relative;
            top: 60px;
            left: 420px;

            .bold {
                font-size: 18px;
                font-weight: bold;
            }

            .footer {
                float: right;
                margin-right: 10px;
            }
        }
    }
</style>
