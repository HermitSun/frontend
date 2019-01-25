<template>

    <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showPrompt">{{promptContent}}</p>
        <input type="email" placeholder="请输入注册邮箱" class="form-control" v-model="username"/>
        <input type="password" placeholder="请输入密码" class="form-control" v-model="password"/>
        <button @click="login()">登录</button>
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
    username: string = ''
    password: string = ''

    mounted () {
      /*如果存在username的cookie，则跳到主页*/
      if (getCookie('username')) {
        this.$router.push('/home')
      }
    }

    login () {
      if (this.username === '' || this.password === '') {
        alert("请输入邮箱或密码")
      } else if (this.username === 'admin' && this.password === '123') {
        this.promptContent = "登录成功"
        this.showPrompt = true
        setCookie('username', this.username, 1000 * 60)
        setTimeout(function () {
          this.$router.push('/home')
        }.bind(this), 1000)
      } else {
        let data = {'username': this.username, 'password': this.password}
        /*接口请求*/
        axios.post('127.0.0.1:3306', data)
          .then((response) => {
            console.log(response)
            if (response.data == LoginErrors.USER_NOT_EXIST) {
              this.promptContent = "用户不存在"
              this.showPrompt = true
            } else if (response.data == LoginErrors.PASSWORD_WRONG) {
              this.promptContent = "密码错误"
              this.showPrompt = true
            } else {
              this.promptContent = "登录成功"
              this.showPrompt = true
              setCookie('username', this.username, 1000 * 60)
              setTimeout(function () {
                this.$router.push('/home')
              }.bind(this), 1000)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    toRegister () {

    }

    adminLogin () {

    }

  }

  enum LoginErrors {USER_NOT_EXIST = -1, PASSWORD_WRONG = 0}
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
        margin: 0 auto;
        margin-bottom: 10px;
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
        margin: 0 auto;
        border: none;
        background-color: #41b883;
        color: #fff;
        font-size: 16px;
        margin-bottom: 5px;
    }

    span {
        cursor: pointer;
        display: block;
    }

    span:hover {
        color: #41b883;
    }
</style>
