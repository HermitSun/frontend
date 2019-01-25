<template>
    <div class="blog-footer">
        <p>版权所有 盗版必究.</p>
        <p>
            <a href="#">Back to top</a>
        </p>
        <p>{{foo}}</p>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component({})
  export default class Footer extends Vue {
    foo: String = '虽然没什么必要但用了TS就想写两句表示我会写TS';
  }
</script>

<style scoped>

</style>
