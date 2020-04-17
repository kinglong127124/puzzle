<template>
    <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd">新增
    </el-button>
</template>

<script>
    export default {
        name: "detail",
        methods: {
            clickAdd() {
                this.$message({
                    message: '产品-新增成功',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>

</style>
