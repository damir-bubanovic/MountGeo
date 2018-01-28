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
            <information-create-route-add-route v-on:step="next" v-if="active == 0"></information-create-route-add-route>
            <information-create-route-add-info v-on:cancel="reset" v-on:step="next" v-if="active == 1"></information-create-route-add-info>
            <information-create-route-add-detail v-on:cancel="reset" v-on:step="next" v-if="active == 2"></information-create-route-add-detail>
            <information-create-route-add-refuge v-on:cancel="reset" v-on:step="next" v-if="active == 3"></information-create-route-add-refuge>
            <information-create-route-add-story v-on:cancel="reset" v-on:step="next" v-if="active == 4"></information-create-route-add-story>
            <div v-if="active == 5">
                <h3>Add Another Route?</h3>
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
                route: {},
                customroute: [],
                information: {},
                description: {},
                refuge: {},
                story: {},
            }
        },
        methods: {
            reset() {
                this.active = 0;
                this.route = {};
                this.customroute = {};
                this.information = {};
                this.description = {};
                this.refuge = {};
                this.story = {};
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
                        this.postRoute();
                    }
                }
            },
            postRoute() {
                /**
                 * Post Route
                 * > save as data object all mountain, route, information data
                 * > get fileextension from saved GPS file
                 * > stora all data in database
                 */
                var data = {
                    route: this.route,
                    information: this.information,
                    description: this.description,
                    refuge: this.refuge,
                    story: this.story,
                    customroute: this.$store.state.maps.userPathMarkers.markers
                }

                var fileNameExtension = this.route.routeFileExt;

                if(this.$store.state.maps.userPathMarkers.markers[0] == null) {
                    if (fileNameExtension == 'kml') {
                        this.$store.dispatch('ROUTE_KML', data)
                            .then(() => {
                                var data = {
                                    mountain_id: this.$store.state.mountain.mountain.mountain_id
                                };
                                this.$store.dispatch('GET_ROUTES', data);
                            })
                            .catch((error) => {
                                if (error.response.status == 401) {
                                    this.$router.push('/login');
                                }
                            });
                    } else if(fileNameExtension == 'gpx') {
                        this.$store.dispatch('ROUTE_GPX', data)
                            .then(() => {
                                var data = {
                                    mountain_id: this.$store.state.mountain.mountain.mountain_id
                                };
                                this.$store.dispatch('GET_ROUTES', data);
                            })
                            .catch((error) => {
                                if (error.response.status == 401) {
                                    this.$router.push('/login');
                                }
                            });
                    } else {
                        this.$notify({
                            title: 'No Route Path',
                            message: 'Please Create Custom Route Path or Upload Path',
                            type: 'error'
                        });
                    }
                } else {
                    this.$store.dispatch('ROUTE_CUSTOM', data)
                        .then(() => {
                            var data = {
                                mountain_id: this.$store.state.mountain.mountain.mountain_id
                            };
                            this.$store.dispatch('GET_ROUTES', data);
                        })
                        .catch((error) => {
                            if (error.response.status == 401) {
                                this.$router.push('/login');
                            }
                        });
                }
            }
        }
    }
</script>