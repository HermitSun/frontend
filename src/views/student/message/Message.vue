<template>
    <el-form :model="keyValues.a" :rules="keyRules">
        <el-form-item prop="keyName">
            <el-input v-model="keyValues.a.keyName"></el-input>
        </el-form-item>
        <p>{{keyValues.a.keyName}}</p>
    </el-form>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class Message extends Vue {
    keyValues: any = {
      a: {
        keyName: "",
        keyValue: ""
      },
      b: {
        keyName: "",
        keyValue: ""
      }
    }
    outerRules: any = {
      keyTest: [
        { required: true, message: 'outer', trigger: 'blur' }
      ]
    }
    keyRules: any = {
      keyName: [
        { required: true, message: 'inner', trigger: 'blur' }
      ]
    }
  }
</script>

<style scoped>

</style>
