<template>
    <div>
        <h3>欢迎 {{username}}</h3>
        <a href="#" @click="quit()">注销登录</a>
    </div>
</template>


<script lang="ts">
  import {setCookie, getCookie, deleteCookie} from '../../assets/js/cookie.ts'
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class Home extends Vue {
    username: string = ''

    mounted () {
      /*获取cookie*/
      this.username = getCookie('username')
      /*如果cookie不存在，则跳转到登录页*/
      if (this.username == '') {
        this.$router.push('/')
      }
    }

    quit () {
      deleteCookie('emailAddress')
      deleteCookie('username')
      this.$router.push('/')
    }
  }
</script>

<style scoped>

</style>
