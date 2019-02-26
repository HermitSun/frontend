<template>
    <div class="wrapper">
        <el-card>
            <div slot="header">
                <span class="bold">忘記密碼</span>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class ForgetPassword extends Vue {
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .el-card {
            width: 600px;
            position: relative;
            top: 60px;
            left: 420px;

            .bold {
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>
