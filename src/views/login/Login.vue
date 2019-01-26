<template>

    <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showPrompt">{{promptContent}}</p>
        <input type="email" placeholder="请输入注册邮箱" class="form-control" v-model="emailAddress"/>
        <input type="password" placeholder="请输入密码" class="form-control" v-model="password"/>
        <div>
            <input type="text" placeholder="请输入验证码" class="form-control" v-model="captcha"/>
            <img src="getCaptcha()" alt="captcha"/>
        </div>
        <button @click="studentLogin()">登录</button>
        <span @click="toRegister()">没有账号？</span>
        <span @click="adminLogin()">管理员入口</span>
    </div>

</template>

<script lang="ts">
  import {setCookie, getCookie} from '../../assets/js/cookie.ts'
  import {Vue, Component} from 'vue-property-decorator'
  import axios from 'axios'

  @Component({})
  export default class Login extends Vue {
    showLogin: boolean = true
    showRegister: boolean = false
    showPrompt: boolean = false
    showAdminLogin: boolean = false
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

    studentLogin () {
      if (this.emailAddress === '') {
        alert("请输入邮箱")
      } else if (this.password === '') {
        alert("请输入密码")
      } else if (this.captcha === '') {
        alert("请输入验证码")
      } else {
        /*接口请求*/
        axios.post('http://localhost:3000/LoginController/login', {
          'emailAddress': this.emailAddress,
          'password': this.password,
          'captcha': this.captcha
        }).then((response) => {
          // console.log(response)
          console.log(response.data)
          if (response.data.isSucceed) {
            this.promptContent = "登录成功"
            this.showPrompt = true
            setCookie('emailAddress', this.emailAddress, 1000 * 60)
            setCookie('username', response.data.information, 1000 * 60)
            setTimeout(function () {
              this.$router.push('/home')
            }.bind(this), 1000)
          } else {
            if (response.data.information === LoginErrors.USER_NOT_EXIST) {
              this.promptContent = "用户不存在"
              this.showPrompt = true
            } else if (response.data.information === LoginErrors.PASSWORD_WRONG) {
              this.promptContent = "密码错误"
              this.showPrompt = true
            } else if (response.data.information === LoginErrors.CAPTCHA_WRONG) {
              this.promptContent = "验证码错误"
              this.showPrompt = true
              this.getCaptcha()
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }

    getCaptcha () {
      axios.get('http://localhost:3000/LoginController/getCaptcha')
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log((error))
        })
    }

    toRegister () {

    }

    adminLogin () {

    }

  }

  enum LoginErrors {USER_NOT_EXIST = '-2', PASSWORD_WRONG = '-1', CAPTCHA_WRONG = '0'}
</script>

<style scoped>
    .login-wrap {
        text-align: center;
    }

    input {
        display: block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto 10px;
        outline: none;
        border: 1px solid #888;
        padding: 10px;
        box-sizing: border-box;
    }

    p {
        color: red;
    }

    button {
        display: block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        border: none;
        background-color: #41b883;
        color: #fff;
        font-size: 16px;
        margin: 0 auto 5px;
    }

    span {
        cursor: pointer;
        display: block;
    }

    span:hover {
        color: #41b883;
    }
</style>
