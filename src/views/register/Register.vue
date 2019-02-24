<template>
    <div class="wrapper">
        <p>REGISTER</p>
        <a class="router2" @click="switchStudent">已有賬號？現在登錄</a>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { bus } from '@/views/login/bus.ts'

  @Component({})
  export default class Register extends Vue {
    private switchStudent () {
      bus.$emit('switch-page', LoginPages.STUDENT)
    }
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

                /*i {*/
                /*display: inline-block;*/
                /*width: 28px;*/
                /*height: 28px;*/
                /*background: url(./img/LoginIcons.png) no-repeat;*/
                /*position: absolute;*/
                /*right: 6px;*/
                /*top: 7px;*/
                /*z-index: 1000;*/
                /*}*/
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
