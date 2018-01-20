<template>
    <div>
        <el-select v-model="form.route" @change="selectedRoute"
        placeholder="Select Route To Delete..." class="el-delete-option">
            <el-option
                v-for="route in routes.list"
                :key="route.id"
                :label="route.name"
                :value="route.id">
            </el-option>
        </el-select>
        <el-collapse accordion v-if="showRoute">
            <el-collapse-item v-bind:title="'Review of - ' + fullRoute.name" name="1" class="el-collapse-item-title">
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <p>Route id: {{ fullRoute.id }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                        <p>Created at: {{ fullRoute.created_at }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                        <p>Updated at: {{ fullRoute.updated_at }}</p>
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <el-rate
                            v-model="fullRoute.difficulty"
                            :texts="['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert']"
                            show-text>
                        </el-rate>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                        <p>Duration: {{ getDuration(fullRoute.duration) }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                        <p>Distance: {{ fullRoute.distance }}</p>
                    </el-col>
                </el-row>
                <br>
                <div class="el-collapse-item-story" v-html="fullRoute.description"></div>
            </el-collapse-item>
        </el-collapse>

        <el-button class="el-button-route" type="primary" v-on:click="step">Delete Route</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    route: ''
                }
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
             * Route Information Data
             */
            fullRoute() {
                return this.$store.state.route.route.route[0]
            },
            /**
             * Show Route
             */
            showRoute() {
                return this.$store.state.route.showRoute
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
                this.$store.dispatch('GET_ROUTE', data);
            },
            /**
             * Get Duration
             * > stored as seconds in database (could be simpler)
             */
            getDuration(number) {
                var days = Math.floor(number / 86400);
                var hours = Math.floor((number - (days * 86400)) / 3600);
                var minutes = Math.floor((number - (days * 86400) - (hours * 3600)) / 60);

                return days + ' d / ' + hours + ' h / ' + minutes + ' m';
            },
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            if(this.$store.state.mountain.mountain.mountain_id == null) {
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Please Select Mountain',
                                    type: 'warning'
                                });
                            } else {
                                this.$emit('step', this.form);
                            }
                        }
                    });
            }
        }
    }
</script>