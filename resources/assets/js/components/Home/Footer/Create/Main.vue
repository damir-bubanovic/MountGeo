<template>
    <div v-loading="loading" element-loading-text="Loading...">
        <el-row type="flex" justify="center" class="el-create-edit-delete-info">
            <el-col :span="6">
                <p>Create</p>
            </el-col>
            <el-col :span="6" class="el-edit">
                <p>Edit</p>
            </el-col>
            <el-col :span="6" class="el-delete">
                <p>Delete</p>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-slider
                    v-model="value"
                    :step="50"
                    :format-tooltip="formatTooltip"
                    show-stops>
                </el-slider>
            </el-col>
        </el-row>
        <information-create-selected-mountain></information-create-selected-mountain>
        <information-create v-if="value == 0"></information-create>
        <information-edit v-if="value == 50"></information-edit>
        <information-delete v-if="value == 100"></information-delete>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 0,
            }
        },
        computed: {
            /**
             * Loading Spinner
             */
            loading() {
                return this.$store.state.loading.loading;
            },
        },
        methods: {
            formatTooltip(val) {
                if(val == 0) {
                    return 'Create'
                } else if(val == 50) {
                    return 'Edit'
                } else {
                    return 'Delete'
                }
            }
        }
    }
</script>