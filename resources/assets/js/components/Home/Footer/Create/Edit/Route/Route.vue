<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
                <el-step></el-step>
                <el-step></el-step>
                <el-step></el-step>
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-select v-model="form.route" @change="selectedRoute"
            placeholder="Select Route To Update..." class="el-delete-option">
                <el-option
                    v-for="route in routes.list"
                    :key="route.id"
                    :label="route.name"
                    :value="route.id">
                </el-option>
            </el-select>
            <information-edit-route-edit-route v-on:cancel="reset" v-on:step="next" v-if="active == 0"></information-edit-route-edit-route>
            <information-edit-route-edit-info v-on:cancel="reset" v-on:step="next" v-if="active == 1"></information-edit-route-edit-info>
            <information-edit-route-edit-detail v-on:cancel="reset" v-on:step="next" v-if="active == 2"></information-edit-route-edit-detail>
            <information-edit-route-edit-refuge v-on:cancel="reset" v-on:step="next" v-if="active == 3"></information-edit-route-edit-refuge>
            <information-edit-route-edit-story v-on:cancel="reset" v-on:step="next" v-if="active == 4"></information-edit-route-edit-story>
            <div v-if="active == 5">
                <h3>Edit Another Route?</h3>
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
                form: {
                    route: ''
                },
                route: {},
                information: {},
                description: {},
                refuge: {},
                story: {},
            }
        },
        computed: {
            /**
             * List of Routes
             */
            routes() {
                return {
                    list: this.$store.state.route.routes
                }
            },
            /**
             * Clear Selected Route
             */
            clear() {
                return this.$store.state.clear.clearInformation;
            }
        },
        watch: {
            /**
             * Clear selected values
             * > in computed (state) property
             * > reload clear event to be used again
             */
            clear() {
                this.form.route = '';
                this.$store.dispatch('CLEAR_SELECT_VALUES_INFORMATION');
            }
        },
        methods: {
            selectedRoute() {
                var data = {
                    route: this.form.route
                };
                this.$store.dispatch('GET_ROUTE', data)
            },
            reset() {
                this.active = 0;
                this.route = {};
                this.information = {};
                this.description = {};
                this.refuge = {};
                this.story = {};
                this.$store.dispatch('CLEAR_ROUTE');
            },
            next(form) {
                if (this.active++ > 4) {
                    this.active = 0;
                } else {
                    if (this.active == 1) {
                        this.route = Object.assign(form);
                    } else if(this.active == 2) {
                        this.information = Object.assign(form);
                    } else if(this.active == 3) {
                        this.description = Object.assign(form);
                    } else if(this.active == 4) {
                        this.refuge = Object.assign(form);
                    } else {
                        this.story = Object.assign(form);
                        this.updateRoute();
                    }
                }
            },
            updateRoute() {
                /**
                 * Update Route
                 */
                var data = {
                    route_id: this.form.route,
                    route: this.route,
                    information: this.information,
                    description: this.description,
                    refuge: this.refuge,
                    story: this.story,
                }

                this.$store.dispatch('UPDATE_ROUTE', data)
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_ROUTES', data);
                    })
                    .then(() => {
                        this.$store.dispatch('CLEAR_SELECT_VALUES_INFORMATION');
                    });
            },
        }

    }
</script>