<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
                <el-step></el-step>
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-create-refuge-add-refuge v-on:step="next" v-if="active == 0"></information-create-refuge-add-refuge>
            <information-create-refuge-add-info v-on:cancel="reset" v-on:step="next" v-if="active == 1"></information-create-refuge-add-info>
            <information-create-refuge-add-contact v-on:cancel="reset" v-on:step="next" v-if="active == 2"></information-create-refuge-add-contact>
            <div v-if="active == 3">
                <h3>Add Another Refuge?</h3>
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
                refuge: {},
                information: {},
                contact: []
            }
        },
        methods: {
            reset() {
                this.active = 0;
                this.refuge = {};
                this.information = {};
                this.contact = [];
            },
            next(form) {
                if (this.active++ > 2) {
                    this.active = 0;
                } else {
                    if (this.active == 1) {
                        this.refuge = Object.assign(form);
                    } else if (this.active == 2) {
                        this.information = Object.assign(form);
                    } else {
                        this.contact.push(form);
                        this.postRefuge();
                    }
                }
            },
            postRefuge() {
                /**
                 * Post Refuge Data
                 * - post refuge works without form submit
                 */
                var data = {
                    refuge: this.refuge,
                    information: this.information,
                    contact: this.contact
                }
                this.$store.dispatch('CREATE_REFUGE', data)
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_REFUGES', data);
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            this.$router.push('/login');
                        }
                    });
            },
        }

    }
</script>