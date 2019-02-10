<template>
    <div>
        <div class="login">
            <div class="inputs">
                <div>
                    <p class="emailAddress">
                        <input type="text" placeholder="電郵 Email" v-model="emailAddress">
                        <i></i>
                    </p>
                    <p class="password">
                        <input type="password" placeholder="密碼 Password" v-model="password">
                        <i></i>
                    </p>
                    <p class="verify">
                        <input type="text" placeholder="驗證碼 Verification code" v-model="captcha"/>
                        <img class="codeImg" :src="encodeURI(this.captcha)" alt="驗證碼" width="61" height="21"/>
                    </p>
                    <p>
                        <button class="loginButton" @click="checkAndLogin()">登 錄</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">
            <router-link to="#" class="router1">忘記密碼</router-link>
            <a class="router2" @click="switchRegister">沒有賬號？現在註冊</a>
            <a class="router3" @click="switchAdmin">管理员入口</a>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { setToken, getToken } from 'utils/token.ts'
  import { getCaptcha, studentLogin } from 'utils/api'
  import { bus } from './bus.ts'

  @Component({})
  export default class StudentLoginInputs extends Vue {

    showPrompt: boolean = false
    promptContent: string = ''
    emailAddress: string = ''
    username: string = ''
    password: string = ''
    captcha: string = ''
    token: string = ''

    mounted () {
      this.token = getToken()
    }

    private checkAndLogin () {
      if (this.emailAddress === '') {
        alert("請輸入郵箱")
      } else if (this.password === '') {
        alert("請輸入密碼")
      } else if (this.captcha === '') {
        alert("請輸入驗證碼")
      } else {
        /*接口请求*/
        studentLogin({
          'emailAddress': this.emailAddress,
          'password': this.password,
          'captcha': this.captcha
        }).then((response) => {
          console.log(response.data)
          if (response.data.isSucceed) {
            this.promptContent = "登錄成功"
            this.showPrompt = true
            setToken(response.data.token)
            setTimeout(function () {
              this.$router.push('/home')
            }.bind(this), 1000)
          } else {
            if (response.data.information === LoginErrors.USER_NOT_EXIST) {
              this.promptContent = "用戶不存在"
              this.showPrompt = true
            } else if (response.data.information === LoginErrors.PASSWORD_WRONG) {
              this.promptContent = "密碼錯誤"
              this.showPrompt = true
            } else if (response.data.information === LoginErrors.CAPTCHA_WRONG) {
              this.promptContent = "驗證碼錯誤"
              this.showPrompt = true
              this.getCaptcha()
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }

    private getCaptcha () {
      getCaptcha()
        .then((response) => {
          this.captcha = response.data.captchaImage
        })
        .catch((error) => {
          console.log((error))
        })
    }

    private switchRegister () {
      bus.$emit('switch-page', LoginPages.REGISTER)
    }

    private switchAdmin () {
      bus.$emit('switch-page', LoginPages.ADMIN)
    }
  }

  enum LoginErrors {USER_NOT_EXIST = '-2', PASSWORD_WRONG = '-1', CAPTCHA_WRONG = '0'}

  enum LoginPages {STUDENT = '1', ADMIN = '2', REGISTER = '3'}
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
        margin: 0 auto;

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
