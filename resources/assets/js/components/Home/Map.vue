<template>
    <div id="map"></div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('GOOGLE_MAPS');
        }
    }
</script>