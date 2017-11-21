<template>
    <el-tabs v-model="activeName" class="el-info-tabs">
        <el-tab-pane label="Database" name="database">
            <information-database></information-database>
        </el-tab-pane>
        <el-tab-pane label="Create" name="create">
            <information-main></information-main>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'database'
            }
        }
    }
</script>