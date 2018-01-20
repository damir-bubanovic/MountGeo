<template>
    <div class="map-chart">
        <!-- ****** GOOGLE MAP CHART - VIEW ROUTE DATA ****** -->
        <el-row type="flex" justify="end" class="map-chart-container-clear">
            <el-col :xs="5" :sm="3" :md="2" :lg="2" :xl="2" v-if="showMapInfo">
                <el-button v-on:click="clearFullRoute">Clear <i class="fa fa-globe fa-lg" aria-hidden="true"></i></el-button>
            </el-col>
        </el-row>


        <el-row :gutter="24" class="map-chart-container">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="distance-container" v-bind:style="{ width: distanceKm.width + 'px' }">
                    <p>{{ distanceKm.kilometers }}</p>
                </div>
            </el-col>

            <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                <div class="distance-travel-container" v-if="showMapInfo">
                    <p><i class="fa fa-globe" aria-hidden="true"></i> 5.7km(fake)</p>
                </div>
            </el-col>

            <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                <div class="distance-travel-container" v-if="showMapInfo">
                    <p><i class="fa fa-clock-o" aria-hidden="true"></i> {{ getDuration(routeInfo.duration) }}</p>
                </div>
            </el-col>

            <el-col :span="24">
                <div v-if="showMapInfo">
                    <el-row :gutter="24">
                        <el-col :xs="18" :sm="19" :md="20" :lg="21" :xl="22">
                            <div id="elevationChart" style="width: 100%;" v-bind:style="{ height: chartHeight + 'px' }"></div>
                        </el-col>
                        <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="2">
                            <img v-bind:src="compassImage">
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                compassImage: '',
                width: '',
                chartHeight: ''
            }
        },
        mounted() {
            window.addEventListener('resize', this.resizeChart);
            this.resizeChartData();
            window.addEventListener('resize', this.resizeChartData);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeChart);
            window.removeEventListener('resize', this.resizeChartData);
        },
        computed: {
            distanceKm() {
                return this.$store.state.maps.distance
            },
            showMapInfo() {
                return this.$store.state.maps.showMapInfo
            },
            routeInfo() {
                return this.$store.state.maps.route
            }
        },
        methods: {
            /**
             * Get Duration
             * > stored as seconds in database
             */
            getDuration(number) {
                var days = Math.floor(number / 86400);
                var hours = Math.floor((number - (days * 86400)) / 3600);
                var minutes = Math.floor((number - (days * 86400) - (hours * 3600)) / 60);

                return days + ' d / ' + hours + ' h / ' + minutes + ' m';
            },
            /**
             * Resize Elevation Chart
             * > if chart already exists
             */
            resizeChart() {
                if(this.showMapInfo) {
                    this.$store.dispatch('ELEVATION_CHART');
                }
            },
            /**
             * Resize Elevation Chart Data & Compass Image
             * @return {[type]} [description]
             */
            resizeChartData() {
                this.width = window.innerWidth;
                if(this.width >= 992) {
                    this.compassImage = 'img/compass-150.jpg';
                    this.chartHeight = 150;
                } else if(this.width < 992 && this.width >= 768) {
                    this.compassImage = 'img/compass-100.jpg';
                    this.chartHeight = 100;
                } else {
                    this.compassImage = 'img/compass-75.jpg';
                    this.chartHeight = 75;
                }
            },
            clearFullRoute() {
                this.$store.dispatch('CLEAR_FULL_ROUTE_GPS')
                    .then(() => {
                        this.$store.dispatch('CLEAR_FULL_ROUTE');
                    })
                    .then(() => {
                        this.$store.dispatch('CLEAR_SELECT_VALUES_DATABASE');
                    });
            }
        }
    }
</script>