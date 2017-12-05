<template>
    <div class="map-type">
        <el-switch
            v-model="value"
            @change="mapType"
            active-color="#0f75bc"
            inactive-color="#4799c5"
            active-text="Detail"
            inactive-text="Basic">
        </el-switch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                 value: false,
            }
        },
        methods: {
            mapType() {
                this.$store.dispatch('GOOGLE_MAPS_TYPE')
            }
        }
    }
</script>