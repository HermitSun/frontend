<template>
    <el-button type="text" @click="open">点击查看初审结果</el-button>
</template>


<script>
    export default {
        name: "JuniorCheck",
        methods: {
            open() {
                this.$alert('初审结果尚未发布', '初审结果', {
                    confirmButtonText: '确定'
                });
            }
        }
    }

</script>

<style scoped>

</style>
