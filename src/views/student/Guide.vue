<template>
    <div class="wrapper">
        <p>消息（公告）写这里好吧，位置是Guide.vue</p>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class Guide extends Vue {
    messages: any = []
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
