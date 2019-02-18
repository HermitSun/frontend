<template>
    <div class="wrapper">
        <table align="center" width="95%">
            <tbody>
            <tr>
                <td>{{this.promptSimplifiedCharacters?'验证失败':'驗證失敗'}}</td>
            </tr>
            <tr>
                <td>{{this.promptContent}}</td>
            </tr>
            <tr>
                <td>
                    <a @click="switchLogin">{{this.promptSimplifiedCharacters?'返回至登录页面':'返回至登錄頁面'}}</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { bus } from './bus.ts'
  
  @Component({})
  export default class LoginPrompt extends Vue {

    promptSimplifiedCharacters: boolean = true
    promptContent: string = ''

    mounted () {
      bus.$on('prompt-content', (content) => {
        this.promptContent = content
      })
      bus.$on('simplified', (content) => {
        this.promptSimplifiedCharacters = content
      })
    }

    private switchLogin () {
      bus.$emit('switch-page', LoginPages.STUDENT)
    }
  }

  enum LoginPages {STUDENT = '1', ADMIN = '2', REGISTER = '3', PROMPT = '4'}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        height: 147px;
        margin-top: 60px;

        tr {
            height: 50px;

            td {
                color: white;
                font-size: 18px;
                font-family: 微软雅黑, serif;
            }
        }

        a, a:hover {
            text-decoration: none;
            cursor: pointer;
        }

        a {
            color: #fff;
            transition: all 0.4s ease-in-out;
        }

        a:hover {
            color: #00a65a;
        }
    }
</style>
