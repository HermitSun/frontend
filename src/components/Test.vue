<template>
    <div>
        <input v-model="msg">
        <p>prop: {{ propMessage }}</p>
        <p>msg: {{ msg }}</p>
        <p>helloMsg: {{ helloMsg }}</p>
        <p>computed msg: {{ computedMsg }}</p>
        <HelloWorld/>
        <p>
            <button @click="greet">Greet</button>
        </p>
        <p>
            Clicked: {{ count }} times
            <button @click="increment">+</button>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component'
    import HelloWorld from "./HelloWorld.vue";

    @Component({
        components:{
            HelloWorld
        }
    })
    export default class Test extends Vue{
        msg: number = 123
        // use prop values for initial data
        helloMsg: string = 'Hello, World!'
        // annotate refs type
        // additional declaration is needed
        // when you declare some properties in `Component` decorator
        count!: number
        increment!: () => void
        // lifecycle hook
        mounted () {
            this.greet()
        }
        // computed
        get computedMsg () {
            return 'computed ' + this.msg
        }
        // method
        greet () {
            alert('greeting: ' + this.msg)
        }
    }
</script>

<style scoped>

</style>
