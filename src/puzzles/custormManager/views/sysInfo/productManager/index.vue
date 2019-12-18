<template>
    <div class="page">
        产品管理-productManager {{ moment().format("MMMM Do YYYY, h:mm:ss a") }}
        <el-button type="primary" size="small" icon="el-icon-plus" plain @click="clickAdd">新增
        </el-button>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        data() {
            return {
                moment: moment
            };
        },
        created() {
            console.log(moment);
        },
        methods: {
            clickAdd() {
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
                this.$router.push({ name: 'productManagerDetail', params: { id: 0 }});
            }
        }
    };
</script>
