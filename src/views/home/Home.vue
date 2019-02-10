<template>
    <div>
        <h3>欢迎 {{username}}</h3>
        <a href="#" @click="quit()">注销登录</a>
    </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { delToken, getToken } from 'utils/token.ts'

  @Component({})
  export default class Home extends Vue {
    username: string = ''
    token: string = ''

    mounted () {
      /*获取cookie*/
      this.token = getToken()
      /*如果cookie不存在，则跳转到登录页*/
      if (this.token == '') {
        this.$router.push('/')
      }
    }

    quit () {
      delToken()
      this.$router.push('/')
    }
  }
</script>

<style scoped>

</style>
