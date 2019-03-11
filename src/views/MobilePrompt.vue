<template>
    <p>請使用PC端訪問</p>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class MobilePrompt extends Vue {
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    p {
        width: 30px;
        margin-left: 700px;
        margin-top: 700px;
    }
</style>
