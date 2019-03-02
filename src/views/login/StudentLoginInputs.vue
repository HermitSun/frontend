<template>
    <div>
        <div class="login">
            <div class="inputs">
                <div>
                    <el-tooltip :disabled="this.emailPrompt" content="請輸入郵箱" placement="right">
                        <p class="emailAddress">
                            <input type="text" placeholder="電郵 Email" v-model="emailAddress">
                            <i></i>
                        </p>
                    </el-tooltip>
                    <el-tooltip :disabled="this.passwordPrompt" content="請輸入密碼" placement="right">
                        <p class="password">
                            <input type="password" placeholder="密碼 Password" v-model="password">
                            <i></i>
                        </p>
                    </el-tooltip>
                    <p>
                        <button class="loginButton" @click="checkAndLogin()">登 錄</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">
            <router-link to="/forget-password" class="router1">忘記密碼</router-link>
            <router-link to="/register" class="router2">沒有賬號？現在註冊</router-link>
            <a class="router3" @click="switchAdmin">管理员入口</a>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { getStudentToken, setStudentToken } from 'utils/token.ts'
  import { login } from 'utils/api'
  import { bus } from './bus.ts'

  @Component({})
  export default class StudentLoginInputs extends Vue {

    showPrompt: boolean = false
    promptContent: string = ''
    emailAddress: string = ''
    password: string = ''
    token: string = ''

    emailPrompt: boolean = true
    passwordPrompt: boolean = true

    mounted () {
      this.token = getStudentToken()
    }

    @Watch('emailAddress')
    onEmailChange (newVal: string, oldVal: string) {
      if (newVal !== '' && oldVal === '') {
        this.emailPrompt = true
      } else if (newVal === '' && oldVal !== '') {
        this.emailPrompt = false
      }
    }

    @Watch('password')
    onPasswordChange (newVal: string, oldVal: string) {
      if (newVal !== '' && oldVal === '') {
        this.passwordPrompt = true
      } else if (newVal === '' && oldVal !== '') {
        this.passwordPrompt = false
      }
    }

    private checkAndLogin () {
      if (this.emailAddress === '') {
        this.emailPrompt = false
      } else if (this.password === '') {
        this.passwordPrompt = false
      } else {
        /*接口请求*/
        login({
          'username': this.emailAddress,
          'password': this.password
        }).then((response) => {
          if (response.data.token) {
            this.showPrompt = false
            setStudentToken(response.data.token)
            setTimeout(function () {
              this.$router.push('/student')
            }.bind(this), 1000)
          } else {
            if (response.data.msg == LoginErrors.USER_DISABLED) {
              this.promptContent = "用戶被禁用"
              this.showPrompt = true
            } else if (response.data.msg == LoginErrors.PASSWORD_WRONG) {
              this.promptContent = "密碼錯誤"
              this.showPrompt = true
            } else if (response.data.msg == LoginErrors.OTHERS) {
              this.promptContent = "登錄失敗"
              this.showPrompt = true
            }
          }
          if (this.showPrompt) {
            this.emailAddress = ''
            this.password = ''
            bus.$emit('switch-page', LoginPages.PROMPT)
            bus.$emit('prompt-content', this.promptContent)
            bus.$emit('simplified', false)
          }
        }).catch((error) => {
          this.$message.error(error)
        })
      }
    }

    private switchAdmin () {
      this.emailAddress = ''
      this.password = ''
      bus.$emit('switch-page', LoginPages.ADMIN)
    }
  }

  enum LoginErrors {
    PASSWORD_WRONG = '密码错误',
    CAPTCHA_WRONG = '验证码错误',
    USER_DISABLED = '用户已被禁用',
    OTHERS = '登录失败'
  }

  enum LoginPages {STUDENT = '1', ADMIN = '2', REGISTER = '3', PROMPT = '4'}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    a, a:hover {
        text-decoration: none;
    }

    a {
        color: #fff;
        transition: all 0.4s ease-in-out;
        cursor: pointer;
    }

    a:hover {
        color: #00a65a;
    }

    body, input, button {
        font: 12px arial;
        color: #333333;
        outline: 0;
        vertical-align: middle;
    }

    body {
        background-color: #fff;

        p {
            font-family: "Microsoft Yahei", serif;
        }
    }

    .login {
        float: none;
        width: 364px;
        margin: 10px auto;

        .inputs {
            margin-left: 12px;
            line-height: 36px;

            p {
                margin-bottom: 15px;
                position: relative;
                width: 100%;
                background: #fff;
                text-align: left;
                border-radius: 4px;

                i {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                    background: url(./img/LoginIcons.png) no-repeat;
                    position: absolute;
                    right: 6px;
                    top: 7px;
                    z-index: 1000;
                }
            }

            input {
                width: 85%;
                height: 40px;
                line-height: 40px;
                margin-left: 16px;
                font-family: "Microsoft Yahei", serif;
                border: 0;
                font-size: 14px;
                color: #878787;
            }

            a {
                color: #b70e0e;
            }

            .verify .codeImg {
                width: 70px;
                height: 30px;
                vertical-align: top;
                position: absolute;
                right: 4px;
                top: 6px;
                z-index: 1000;
            }

            .loginButton {
                height: 40px;
                line-height: 40px;
                width: 100%;
                padding: 0;
                margin-left: 0;
                background: #90138b;
                border: 0;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                border-radius: 4px;
            }

            .loginButton:hover {
                opacity: .9;
                filter: Alpha(opacity=90);
            }
        }

    }

    .emailAddress i {
        background-position: 7px 6px !important;
    }

    .password i {
        background-position: 7px -50px !important;
    }

    .footer {
        display: inline-block;
        width: 88%;
        line-height: 25px;
        margin-top: 10px;

        a {
            float: left;
            font-size: 14px;
            color: #fff;
        }

        a:hover {
            color: #ccc;
        }

        .router1 {
            text-align: left;
            width: 30%
        }

        .router2 {
            width: 40%;
        }

        .router3 {
            text-align: right;
            width: 30%
        }
    }
</style>
