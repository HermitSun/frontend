<template>
    <div>
        <h3>欢迎 {{name}}</h3>
        <a href="#" @click="quit()">注销登录</a>
    </div>
</template>


<script lang="ts">
  import {setCookie, getCookie, deleteCookie} from '../../assets/js/cookie.ts'
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class Home extends Vue {
    name: string = ''

    mounted () {
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let username = getCookie('username')
      this.name = username
      /*如果cookie不存在，则跳转到登录页*/
      if (username == "") {
        this.$router.push('/')
      }
    }

    quit () {
      deleteCookie('username')
      this.$router.push('/')
    }
  }
</script>

<style scoped>

</style>
