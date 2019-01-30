<template>
    <div>
        <div class="total">
            <div class="content">
                <div class="foo">
                    <div class="head clearFix">
                        <img class="leftHead" src="./img/NJULogo.png"/>
                        <div class="rightHead">台灣免試生系統</div>
                    </div>
                    <StudentLoginInputs v-if="showLogin"></StudentLoginInputs>
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
  import StudentLoginInputs from './StudentLoginInputs.vue'
  import AdminLogin from './AdminLogin.vue'
  import {setCookie, getCookie} from '../../assets/js/cookie.ts'
  import axios from 'axios'

  @Component({
    components: {
      StudentLoginInputs,
      AdminLogin
    }
  })
  export default class StudentLogin extends Vue {

    showLogin: boolean = false
    showRegister: boolean = false
    showAdminLogin: boolean = true

    mounted () {
      /*如果存在cookie，则跳到主页*/
      if (getCookie('emailAddress') && getCookie('username')) {
        this.$router.push('/home')
      }
    }
  }
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

    .content .login {
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
