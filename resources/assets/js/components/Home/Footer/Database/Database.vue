<template>
    <div>
        <el-row type="flex" class="row-bg el-database-title">
            <el-col :span="6" :offset="9"><h4>Find Route</h4></el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :xs="23" :sm="23" :md="11" :lg="11" :xl="11">
                <el-select class="el-select-database" v-model="mountain_id"
                    @change="getRoutes"
                    placeholder="Select Mountain">
                    <el-option
                        v-for="mountain in mountains.list"
                        :key="mountain.id"
                        :label="mountain.name"
                        :value="mountain.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="23" :sm="23" :md="11" :lg="12" :xl="12">
                <el-select class="el-select-database" v-model="route_id"
                    @change="getFullRoute"
                    placeholder="Select Route">
                    <el-option
                        v-for="route in routes.list"
                        :key="route.id"
                        :label="route.name"
                        :value="route.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <information-database-full-route v-if="showRoute"></information-database-full-route>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mountain_id: '',
                route_id: '',
            }
        },
        mounted() {
            return this.$store.dispatch('GET_MOUNTAINS');
        },
        computed: {
            mountains() {
                return {
                    list: this.$store.state.mountain.mountains
                }
            },
            /**
             * Populate Route list
             */
            routes() {
                return {
                    list: this.$store.state.route.routes
                }
            },
            showRoute() {
                return this.$store.state.route.showFullRoute
            },
            clear() {
                console.log(this.$store.state.clear.clearDatabase);
                return this.$store.state.clear.clearDatabase;
            }
        },
        watch: {
            /**
             * Clear selected values - watch computed (state) property
             */
            clear(value) {
                // if (value) {
                //     console.log("Value is true and " + value);
                // } else {
                //     console.log("Value is false " + value);
                // }
                this.mountain_id = '';
                this.route_id = '';
            }
        },
        methods: {
            /**
             * Select mountain_id for route list
             */
            getRoutes() {
                var data = {
                    mountain_id: this.mountain_id
                };
                this.$store.dispatch('GET_ROUTES', data);
            },
            /**
             * Select route_id for full route
             */
            getFullRoute() {
                var data = {
                    route_id: this.route_id
                };
                this.$store.dispatch('GET_FULL_ROUTE', data)
                    .then(() => {
                            this.$store.dispatch('GET_FULL_ROUTE_GPS', data);
                        });
            }
        }
    }
</script>