<template>
    <el-footer style="height: 25px">
        <p v-on:click="logout"><i class="fa fa-copyright" aria-hidden="true"></i> Damir Bubanović, 2017.</p>
    </el-footer>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            logout() {
                this.$store.dispatch('LOGOUT')
            }
        }
    }
</script>