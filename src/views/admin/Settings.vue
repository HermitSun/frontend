<template>
    <div class="wrapper">
        <el-card>
            <el-form :model="emailForm" :rules="rules" ref="emailForm">
                <el-form-item label="电子邮箱" :label-width="this.emailFormWidth" prop="email">
                    <el-input type="email" v-model="emailForm.email"></el-input>
                </el-form-item>
                <el-form-item label="邮箱授权码" :label-width="this.emailFormWidth" prop="password">
                    <el-input type="text" v-model="emailForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveAdminEmail">
                        <i class="el-icon-upload2"></i>
                        <span>保存</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { getAdminEmail, setAdminEmail } from 'utils/api'

  @Component({})
  export default class Settings extends Vue {
    emailForm: any = {
      email: '',
      password: ''
    }
    rules: any = {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入邮箱授权码', trigger: 'blur' }
      ]
    }
    emailFormWidth: string = '100px'

    mounted () {
      getAdminEmail()
        .then((res) => {
          if (res.data.email === 'No admin' || res.data.admission === 'No admin') {
            this.$message({
              message: '数据不存在',
              type: 'error'
            })
          } else {
            this.emailForm.email = res.data.email
            this.emailForm.password = res.data.admission
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    }

    saveAdminEmail () {
      setAdminEmail({
        emailAddress: this.emailForm.email,
        admission: this.emailForm.password
      }).then((res) => {
        if (res.data.succeed) {
          this.$message({
            message: '设置成功',
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
          message: err,
          type: 'error'
        })
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .el-card {
            width: 600px;
            position: relative;
            top: 150px;
            left: 280px;

            .el-button {
                float: right;
                margin-right: 20px;
            }
        }
    }
</style>
