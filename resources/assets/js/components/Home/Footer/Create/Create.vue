<template>
    <div>
        <information-create-selected-mountain></information-create-selected-mountain>
        <el-tabs v-model="activeName" class="el-info-create-tabs">
            <el-tab-pane label="Mountain" name="mountain">
                <information-create-mountain></information-create-mountain>
            </el-tab-pane>
            <el-tab-pane label="Route" name="route">
                <information-create-route></information-create-route>
            </el-tab-pane>
            <el-tab-pane label="Refuge" name="refuge">
                <information-create-refuge></information-create-refuge>
            </el-tab-pane>
            <el-tab-pane label="Story" name="story">
                <information-create-story></information-create-story>
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