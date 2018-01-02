<template>
    <el-footer class="el-navigation-bottom">
        <!-- ****** FOOTER HOME ****** -->
        <el-menu :default-active="activeIndex" mode="horizontal">
            <el-menu-item index="1" v-on:click="targetLocation" v-bind:class="{ targetLocationButton: targetLocationButton }"><i class="fa fa-flag" aria-hidden="true"></i> <span class="el-hidden-phone">Target Location</span></el-menu-item>
            <el-menu-item index="2" v-on:click="userLocation" v-bind:class="{ userLocationButton: userLocationButton }"><i class="fa fa-map-marker" aria-hidden="true"></i> <span class="el-hidden-phone">Current Location</span></el-menu-item>
            <el-menu-item index="3" v-on:click="information = true"><i class="fa fa-info-circle" aria-hidden="true"></i> <span class="el-hidden-phone">Information</span></el-menu-item>
        </el-menu>
        <el-dialog :visible.sync="information">
            <information></information>
        </el-dialog>
    </el-footer>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: null,
                information: false,
            }
        },
        computed: {
            userLocationButton() {
                return this.$store.state.maps.userLocationButton
            },
            targetLocationButton() {
                return this.$store.state.maps.targetLocationButton
            }
        },
        methods: {
            userLocation() {
                this.$store.dispatch('SHOW_USER_LOCATION');
            },
            targetLocation() {
                this.$store.dispatch('SHOW_TARGET_LOCATION');
            }
        }
    }
</script>