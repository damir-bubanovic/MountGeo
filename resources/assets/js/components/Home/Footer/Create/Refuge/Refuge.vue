<template>
    <el-row class="el-information-create">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step title="Add Refuge"></el-step>
                <el-step title="Add Info"></el-step>
                <el-step title="Add Contact"></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="16" :sm="16" :md="14" :lg="12" :xl="12">
            <information-create-refuge-add-refuge v-on:step="next" v-if="active == 0"></information-create-refuge-add-refuge>
            <information-create-refuge-add-info v-on:step="next" v-if="active == 1"></information-create-refuge-add-info>
            <information-create-refuge-add-contact v-on:step="next" v-if="active == 2"></information-create-refuge-add-contact>
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
                this.$store.dispatch('CREATE_REFUGE', data);
            },
        }

    }
</script>