<template>
    <div class="map-chart">
        <el-row :gutter="24" class="map-chart-container">
            <el-col :span="8">
                <div class="distance-container" v-bind:style="{ width: distanceKm.width + 'px' }">
                    <p>{{ distanceKm.kilometers }}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="distance-travel-container" v-if="showMapInfo">
                    <p><i class="fa fa-globe" aria-hidden="true"></i> 5.7km(fake)</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="distance-travel-container" v-if="showMapInfo">
                    <p><i class="fa fa-clock-o" aria-hidden="true"></i> {{ getDuration(routeInfo.duration) }}</p>
                </div>
            </el-col>
            <el-col :span="24">
                <div v-if="showMapInfo">
                    <el-row :gutter="24">
                        <el-col :xs="14" :sm="19" :md="20" :lg="21" :xl="22">
                            <div id="elevationChart" style="width: 100%; height: 150px"></div>
                        </el-col>
                        <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="2">
                            <img src="img/compass.jpg">
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        mounted() {
            window.addEventListener('resize', this.resizeChart);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeChart);
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
             * > stored as seconds in database (could be simpler)
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
            }
        }
    }
</script>