<template>
    <div>
        <div class="total">
            <div class="content">
                <div class="foo">
                    <div class="head clearFix">
                        <img class="leftHead" src="./img/NJULogo.png" @click="straightLogin"/>
                        <div class="rightHead">台灣免試生系統</div>
                    </div>
                    <StudentLoginInputs v-if="showStudentLogin"></StudentLoginInputs>
                    <AdminLogin v-else-if="showAdminLogin"></AdminLogin>
                </div>
                <div class="background"></div>
            </div>
        </div>
        <div class="mainBackground"></div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import {bus} from "./bus.ts"
  import {getCookie, setCookie} from '../../assets/utils/cookie.ts'
  import StudentLoginInputs from './StudentLoginInputs.vue'
  import AdminLogin from './AdminLogin.vue'

  @Component({
    components: {
      StudentLoginInputs,
      AdminLogin
    }
  })
  export default class StudentLogin extends Vue {

    showStudentLogin: boolean = true
    showRegister: boolean = false
    showAdminLogin: boolean = false

    created () {
      bus.$on('switch-page', (page) => {
        if (page === LoginPages.STUDENT) {
          this.showStudentLogin = true
          this.showRegister = false
          this.showAdminLogin = false
        } else if (page === LoginPages.ADMIN) {
          this.showAdminLogin = true
          this.showStudentLogin = false
          this.showRegister = false
        } else if (page === LoginPages.REGISTER) {
          this.showRegister = true
          this.showStudentLogin = false
          this.showAdminLogin = false
        }
      })
    }

    mounted () {
      /*如果存在cookie，则转到主页*/
      if (getCookie('emailAddress') && getCookie('username')) {
        this.$router.push('/home')
      }
    }

    straightLogin () {
      setCookie('username', "admin", 1000 * 60)
      setCookie('actualName', "WenSun", 1000 * 60)
      this.$router.push('/admin')
    }
  }

  enum LoginPages {STUDENT = '1', ADMIN = '2', REGISTER = '3'}
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

    .clearFix:after {
        clear: both;
        content: ".";
        display: block;
        height: 0;
        visibility: hidden;
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

    .total {
        height: 433px;
        position: absolute;
        top: 25%;
        left: 0;
        right: 0;
        z-index: 1000;
        overflow: hidden;
        text-align: center;
    }

    .total .background {
        width: 459px;
        height: 433px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #000;
        opacity: .6;
        filter: Alpha(opacity=60);
        border-radius: 31px;
    }

    .content {
        width: 419px;
        margin: 0 auto;
        padding: 19px 20px 30px;
        position: relative;
    }

    .content .foo {
        width: 419px;
        margin: 10px auto;
    }

    .content .head {
        padding: 15px 0;
        margin-bottom: 33px;
        border-bottom: 1px solid #fff;
    }

    .content .head .leftHead {
        float: left;
        margin-left: 18px;
        width: 187px;
        height: 66px;
        background: no-repeat;
    }

    .content .head .rightHead {
        float: left;
        line-height: 30px;
        margin-top: 25px;
        margin-left: 18px;
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        vertical-align: bottom;
    }

    .mainBackground {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background-size: cover;
        background: url(./img/bg1.jpg) center center;
    }
</style>
