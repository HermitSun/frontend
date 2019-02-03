<template>
    <div class="wrapper">
        <p>这是导航页</p>
        <router-link to="/admin/start-enroll">开启本次招生</router-link>
        <router-link to="/admin/set-profess">设置招生专业</router-link>
        <router-link to="/admin/end-enroll">结束本次招生</router-link>
        <router-link to="/admin/not-pass-stu">未通过</router-link>
        <router-link to="/admin/passed-stu">已通过</router-link>
        <router-link to="/admin/all-stu">全部</router-link>
        <router-link to="/admin/edit-msg">编辑消息</router-link>
        <router-link to="/admin/edit-email">编辑邮件</router-link>
        <router-link to="/admin/pub-res">发布结果</router-link>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({})
  export default class Guide extends Vue {
  }
</script>

<style scoped>

</style>
