<template>
    <div>
        <el-tabs v-model="activeName" class="el-info-create-tabs">
            <el-tab-pane label="Mountain" name="mountain">
                <information-edit-mountain></information-edit-mountain>
            </el-tab-pane>
            <el-tab-pane label="Route" name="route">
                <information-edit-route></information-edit-route>
            </el-tab-pane>
            <el-tab-pane label="Refuge" name="refuge">
                <information-edit-refuge></information-edit-refuge>
            </el-tab-pane>
            <el-tab-pane label="Story" name="story">
                <information-edit-story></information-edit-story>
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