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
            <el-select v-model="form.refuge" @change="selectedRefuge"
            placeholder="Select Refuge To Edit..." class="el-delete-option">
                <el-option
                    v-for="refuge in refuges.list"
                    :key="refuge.id"
                    :label="refuge.name"
                    :value="refuge.id">
                </el-option>
            </el-select>
            <information-edit-refuge-edit-refuge v-on:cancel="reset" v-on:step="next" v-if="active == 0"></information-edit-refuge-edit-refuge>
            <information-edit-refuge-edit-info v-on:cancel="reset" v-on:step="next" v-if="active == 1"></information-edit-refuge-edit-info>
            <information-edit-refuge-edit-contact v-on:cancel="reset" v-on:step="next" v-if="active == 2"></information-edit-refuge-edit-contact>
            <div v-if="active == 3">
                <h3>Edit Another Refuge?</h3>
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
                form: {
                    refuge: ''
                },
                refuge: {},
                information: {},
                contact: []
            }
        },
        computed: {
            /**
             * List of Refuges
             */
            refuges() {
                return {
                    list: this.$store.state.refuge.refuges
                }
            },
        },
        methods: {
            selectedRefuge() {
                var data = {
                    refuge: this.form.refuge
                };
                this.$store.dispatch('GET_REFUGE', data)
            },
            reset() {
                // this.form.refuge = null;
                this.active = 0;
                this.refuge = {};
                this.information = {};
                this.contact = [];
                this.$store.dispatch('CLEAR_REFUGE');
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
                        this.editRefuge();
                    }
                }
            },
            editRefuge() {
                /**
                 * Edit Refuge Data
                 * - edit refuge info & contacts
                 */
                var data = {
                    refuge_id: this.form.refuge,
                    refuge: this.refuge,
                    information: this.information,
                    contact: this.contact
                }
                console.log(JSON.stringify(data));
                this.$store.dispatch('UPDATE_REFUGE', data)
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_REFUGES', data);
                    });
            },
        }

    }
</script>