<template>
    <div id="app">
        <img src="./img/logo.png" alt="logo" class="img-circle"/>
        <input type="email" placeholder="Your email: " class="form-control" v-model="userEmail"/>
        <input type="password" placeholder="Your password: " class="form-control" v-model="userPassword"/>
        <button @click="logIn()" class="btn btn-primary">Submit</button>
        <button @click="handleClick()" class="btn btn-default">{{counter}}</button>
        <div v-show="logInStatus">
            <div v-if="checkInformation()">Login Successfully.</div>
            <div v-else>Login Failed.</div>
        </div>
        <p>{{userEmail}}</p>
        <p>{{userPassword}}</p>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class Test extends Vue {
    userEmail: String = ''
    userPassword: String = ''
    logInStatus: boolean = false
    counter: number = 0

    logIn () {
      this.logInStatus = true
    }

    checkInformation () {
      if ((this.userEmail === 'syl1887415157@126.com') && (this.userPassword === '123')) {
        return true
      } else {
        return false
      }
    }

    handleClick () {
      this.counter++
    }
  }
</script>

<style>

</style>
