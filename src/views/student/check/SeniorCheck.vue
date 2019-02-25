<template>
    <el-button type="text" @click="open">点击查看面试结果</el-button>
</template>

<script>
    export default {
        name: "SeniorCheck",
        methods: {
            open() {
                this.$alert('面试结果尚未发布', '面试结果', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
        }
    }
</script>


<style scoped>

</style>
