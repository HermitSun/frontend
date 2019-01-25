<template>
    <div>
        <img src="../views/index/img/logo.png" alt="logo"/>
        <router-link to="/list">Go to List</router-link>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class Body extends Vue {
  }
</script>

<style scoped>

</style>
