<template>
    <div class="wrapper">
        <p>這是導航頁</p>
        <router-link to="/admin/start-enroll">開啓本次招生</router-link>
        <router-link to="/admin/set-profess">設置招生專業</router-link>
        <router-link to="/admin/end-enroll">結束本次招生</router-link>
        <router-link to="/admin/not-pass-stu">未通過</router-link>
        <router-link to="/admin/passed-stu">已通過</router-link>
        <router-link to="/admin/all-stu">全部</router-link>
        <router-link to="/admin/edit-msg">編輯消息</router-link>
        <router-link to="/admin/edit-email">編輯郵件</router-link>
        <router-link to="/admin/pub-res">發佈結果</router-link>
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
