<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import HelloWorld from '../../components/HelloWorld.vue'
  import Header from '../../components/Header.vue'
  import Footer from '../../components/Footer.vue'

  @Component({
    components: {
      HelloWorld,
      Header,
      Footer
    }
  })
  export default class App extends Vue {
    counter: number = 0

    handleClick () {
      this.counter++
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
