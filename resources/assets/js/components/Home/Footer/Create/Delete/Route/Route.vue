<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-delete-route-delete-route v-on:step="next" v-if="active == 0"></information-delete-route-delete-route>
            <div v-if="active == 1">
                <h3>Delete Another Route?</h3>
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
                route: {}
            }
        },
        methods: {
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.route = Object.assign(form);
                    this.deleteRoute();
                }
            },
            deleteRoute() {
                this.$store.dispatch('DELETE_ROUTE', { data: this.route })
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_ROUTES', data)
                            .catch((error) => {
                                if (error.response.status == 401) {
                                    this.$router.push('/login');
                                }
                            });
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