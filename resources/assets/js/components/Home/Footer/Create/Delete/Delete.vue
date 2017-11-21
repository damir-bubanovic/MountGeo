<template>
    <div>
        <el-tabs v-model="activeName" class="el-info-create-tabs">
            <el-tab-pane label="Mountain" name="mountain">
                <information-delete-mountain></information-delete-mountain>
            </el-tab-pane>
            <el-tab-pane label="Route" name="route">
                <information-delete-route></information-delete-route>
            </el-tab-pane>
            <el-tab-pane label="Refuge" name="refuge">
                <information-delete-refuge></information-delete-refuge>
            </el-tab-pane>
            <el-tab-pane label="Story" name="story">
                <information-delete-story></information-delete-story>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'mountain'
            }
        }
    }
</script>