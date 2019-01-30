<template>
    <div>
        <div class="login">
            <div class="inputs">
                <div>
                    <p class="emailAddress">
                        <input type="text" placeholder="電郵 Email">
                        <i></i>
                    </p>
                    <p class="password">
                        <input type="password" placeholder="密碼 Password">
                        <i></i>
                    </p>
                    <p class="verify">
                        <input type="text" placeholder="驗證碼 Verification code"/>
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
            <router-link to="#" class="router2">沒有賬號？現在註冊</router-link>
            <router-link to="/admin" class="router3">管理员入口</router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import {setCookie, getCookie} from '../../assets/js/cookie.ts'
  import axios from 'axios'

  @Component({})
  export default class StudentLoginInputs extends Vue {

    showPrompt: boolean = false
    promptContent: string = ''
    emailAddress: string = ''
    username: string = ''
    password: string = ''
    captcha: string = ''

    mounted () {
      /*如果存在cookie，则跳到主页*/
      if (getCookie('emailAddress') && getCookie('username')) {
        this.$router.push('/home')
      }
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
        axios.post('http://localhost:3000/login/student', {
          'emailAddress': this.emailAddress,
          'password': this.password,
          'captcha': this.captcha
        }).then((response) => {
          // console.log(response)
          console.log(response.data)
          if (response.data.isSucceed) {
            this.promptContent = "登錄成功"
            this.showPrompt = true
            setCookie('emailAddress', this.emailAddress, 1000 * 60)
            setCookie('username', response.data.information, 1000 * 60)
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
      axios.get('http://localhost:3000/login/captcha')
        .then((response) => {
          this.captcha = response.data.captchaImage
        })
        .catch((error) => {
          console.log((error))
        })
    }
  }

  enum LoginErrors {USER_NOT_EXIST = '-2', PASSWORD_WRONG = '-1', CAPTCHA_WRONG = '0'}
</script>

<style scoped>
    a, a:hover {
        text-decoration: none;
    }

    body, input, button {
        font: 12px arial;
        color: #333333;
        outline: 0;
        vertical-align: middle;
    }

    body {
        background-color: #fff;
    }

    body, p {
        font-family: "Microsoft Yahei", serif;
    }

    a {
        color: #fff;
        transition: all 0.4s ease-in-out;
    }

    a:hover {
        color: #00a65a;
    }

    .login {
        float: none;
        width: 364px;
        margin: 0 auto;
    }

    .login .inputs p {
        margin-bottom: 15px;
        position: relative;
        width: 100%;
        background: #fff;
        text-align: left;
        border-radius: 4px;
    }

    .login .inputs p i {
        display: inline-block;
        width: 28px;
        height: 28px;
        background: url(./img/LoginIcons.png) no-repeat;
        position: absolute;
        right: 6px;
        top: 7px;
        z-index: 1000;
    }

    .emailAddress i {
        background-position: 7px 6px !important;
    }

    .password i {
        background-position: 7px -50px !important;
    }

    .login .inputs input {
        width: 85%;
        height: 40px;
        line-height: 40px;
        margin-left: 16px;
        font-family: "Microsoft Yahei", serif;
        border: 0;
        font-size: 14px;
        color: #878787;
    }

    .login .inputs .verify .codeImg {
        width: 70px;
        height: 30px;
        vertical-align: top;
        position: absolute;
        right: 4px;
        top: 6px;
        z-index: 1000;
    }

    .login .inputs {
        margin-left: 12px;
        line-height: 36px;
    }

    .login .inputs a {
        color: #b70e0e;
    }

    .login .inputs .loginButton {
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

    .login .inputs .loginButton:hover {
        opacity: .9;
        filter: Alpha(opacity=90);
    }

    .footer {
        display: inline-block;
        width: 88%;
        line-height: 25px;
    }

    .footer a {
        float: left;
        font-size: 14px;
        color: #fff;
    }

    .footer .router1 {
        text-align: left;
        width: 30%
    }

    .footer .router2 {
        width: 40%;
    }

    .footer .router3 {
        text-align: right;
        width: 30%
    }

    .footer a:hover {
        color: #ccc;
    }
</style>
