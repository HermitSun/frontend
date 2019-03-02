<template>
    <div>
        <div class="login">
            <div class="inputs">
                <div>
                    <el-tooltip :disabled="this.usernamePrompt" content="请输入邮箱" placement="right">
                        <p class="emailAddress">
                            <input type="text" placeholder="账号 AdminName" v-model="username">
                            <i></i>
                        </p>
                    </el-tooltip>
                    <el-tooltip :disabled="this.passwordPrompt" content="请输入密码" placement="right">
                        <p class="password">
                            <input type="password" placeholder="密码 Password" v-model="password">
                            <i></i>
                        </p>
                    </el-tooltip>
                    <p>
                        <button class="loginButton" @click="checkAndLogin()">登 录</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">
            <a href="javascript:void(0)" class="router3" @click="switchStudent">學生入口</a>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { getAdminToken, setAdminToken } from 'utils/token.ts'
  import { login } from 'utils/api'
  import { bus } from './bus.ts'

  @Component({})
  export default class AdminLogin extends Vue {

    showPrompt: boolean = false
    promptContent: string = ''
    username: string = ''
    password: string = ''
    token: string = ''

    usernamePrompt: boolean = true
    passwordPrompt: boolean = true

    mounted () {
      this.token = getAdminToken()
    }

    @Watch('username')
    onEmailChange (newVal: string, oldVal: string) {
      if (newVal !== '' && oldVal === '') {
        this.usernamePrompt = true
      } else if (newVal === '' && oldVal !== '') {
        this.usernamePrompt = false
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
      if (this.username === '') {
        alert("请输入账号")
      } else if (this.password === '') {
        alert("请输入密码")
      } else {
        login({
          'username': this.username,
          'password': this.password
        }).then((response) => {
          if (response.data.token) {
            this.showPrompt = false
            setAdminToken(response.data.token)
            setTimeout(function () {
              this.$router.push('/admin')
            }.bind(this), 1000)
          } else {
            if (response.data.msg === LoginErrors.OTHERS) {
              this.promptContent = "登录失败"
              this.showPrompt = true
            } else if (response.data.msg === LoginErrors.PASSWORD_WRONG) {
              this.promptContent = "密码错误"
              this.showPrompt = true
            }
          }
          if (this.showPrompt) {
            this.username = ''
            this.password = ''
            bus.$emit('switch-page', LoginPages.PROMPT)
            bus.$emit('prompt-content', this.promptContent)
            bus.$emit('simplified', true)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }

    private switchStudent () {
      this.username = ''
      this.password = ''
      bus.$emit('switch-page', LoginPages.STUDENT)
    }
  }

  enum LoginErrors {
    PASSWORD_WRONG = '密码错误',
    CAPTCHA_WRONG = '验证码错误',
    OTHERS = '登录失败'
  }

  enum LoginPages {STUDENT = '1', ADMIN = '2', REGISTER = '3', PROMPT = '4'}
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
        cursor: pointer;
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
        margin-top: 10px;
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

    .footer .router3 {
        text-align: right;
        float: right;
        width: 30%
    }

    .footer a:hover {
        color: #ccc;
    }
</style>
