<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-edit-mountain-edit-mountain v-on:cancel="reset" v-on:step="next" v-if="active == 0"></information-edit-mountain-edit-mountain>
            <div v-if="active == 1">
                <h3>Edit Another Mountain?</h3>
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
            reset() {
                this.active = 0;
                this.mountain = {};
                this.$store.dispatch('CLEAR_MOUNTAIN');
            },
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.mountain = Object.assign(form);
                    this.editMountain();
                }
            },
            editMountain() {
                var data = {
                    mountain_id: this.$store.state.mountain.mountain.mountain_id,
                    name: this.mountain.name
                };
                this.$store.dispatch('UPDATE_MOUNTAIN', data)
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_MOUNTAINS', data);
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            this.$router.push('/login');
                        }
                    });
            }
        }
    }
</script>