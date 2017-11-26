<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-delete-refuge-delete-refuge v-on:step="next" v-if="active == 0"></information-delete-refuge-delete-refuge>
            <div v-if="active == 1">
                <h3>Delete Another Refuge?</h3>
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
                refuge: {}
            }
        },
        methods: {
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.refuge = Object.assign(form);
                    this.deleteRefuge();
                }
            },
            deleteRefuge() {
                this.$store.dispatch('DELETE_REFUGE', { data: this.refuge })
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_REFUGES', data);
                    });
            }
        }
    }
</script>