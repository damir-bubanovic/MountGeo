<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-create-mountain-add-mountain v-on:step="next" v-if="active == 0"></information-create-mountain-add-mountain>
            <div v-if="active == 1">
                <h3>Add Another Mountain?</h3>
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
                mountain: {}
            }
        },
        methods: {
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.mountain = Object.assign(form);
                    this.createMountain();
                }
            },
            createMountain() {
                this.$store.dispatch('CREATE_MOUNTAIN', { data: this.mountain })
                    .then(() => {
                        this.$store.dispatch('GET_MOUNTAINS')
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            this.$router.push('/login');
                        }
                    });
            }
        }
    }
</script>