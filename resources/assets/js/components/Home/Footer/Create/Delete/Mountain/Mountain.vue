<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-delete-mountain-delete-mountain v-on:step="next" v-if="active == 0"></information-delete-mountain-delete-mountain>
            <div v-if="active == 1">
                <h3>Delete Another Mountain?</h3>
                <el-button type="primary" v-on:click="next">Restart</el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                mountain: {}
            }
        },
        created() {
            if(this.$store.state.mountain.mountain.mountain_id == null) {
                this.$notify({
                    title: 'Warning',
                    message: 'Please Select Mountain',
                    type: 'warning',
                });
            }
        },
        methods: {
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.mountain = Object.assign(form);
                    this.deleteMountain();
                }
            },
            deleteMountain() {
                this.$store.dispatch('DELETE_MOUNTAIN', { data: this.mountain })
                    .then(() => {
                        this.$store.dispatch('GET_MOUNTAINS');
                    });
            }
        }
    }
</script>