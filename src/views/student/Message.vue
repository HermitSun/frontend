<template>
    <div class="wrapper">
        <div v-if="hasFinished">
            <p style="color: #67C23A">您已完成申請，請耐心等待回復。</p>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { checkAttachmentUpload, getApplicationStatus } from 'utils/api'

  @Component({})
  export default class Message extends Vue {
    messages: any = []
    hasFinished: boolean = false

    mounted () {
      getApplicationStatus()
        .then((res) => {
          this.hasFinished = !!res.data.hasUploaded
        })
        .catch((err) => {
          this.hasFinished = false
        })
      checkAttachmentUpload({
        types: ['身份证明', '学测成绩单', '推荐信', '其他材料']
      }).then((res) => {
        this.hasFinished = !!res.data.hasUploaded
      }).catch((err) => {
        this.hasFinished = false
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 30px 20px 0 20px;
    }
</style>

