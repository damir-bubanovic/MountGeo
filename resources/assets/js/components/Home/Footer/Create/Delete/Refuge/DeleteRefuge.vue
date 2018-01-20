<template>
    <div>
        <el-select v-model="form.refuge" @change="selectedRefuge"
        placeholder="Select Refuge To Delete..." class="el-delete-option">
            <el-option
                v-for="refuge in refuges.list"
                :key="refuge.id"
                :label="refuge.name"
                :value="refuge.id">
            </el-option>
        </el-select>
        <el-collapse accordion v-if="showRefuge">
            <el-collapse-item v-bind:title="'Review of - ' + fullRefuge.refuge[0].name" name="1" class="el-collapse-item-title">
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <p>Refuge id: {{ fullRefuge.refuge[0].id }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                        <p>Created at: {{ fullRefuge.refuge[0].created_at }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                        <p>Updated at: {{ fullRefuge.refuge[0].updated_at }}</p>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :xs="12" :sm="4" :md="4" :lg="4" :xl="4" class="el-full-route">
                        <h5 class="el-full-route-title">Open:</h5>
                        <p>{{ fullRefuge.refuge_information[0].open }}</p>
                    </el-col>
                    <el-col :xs="12" :sm="4" :md="4" :lg="4" :xl="4" class="el-full-route">
                        <h5 class="el-full-route-title">Close:</h5>
                        <p>{{ fullRefuge.refuge_information[0].close }}</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-full-route">
                        <h5 class="el-full-route-title">Essentials:</h5>
                        <el-checkbox v-model="fullRefuge.refuge_information[0].water == 1">Water</el-checkbox>
                        <el-checkbox v-model="fullRefuge.refuge_information[0].food == 1">Food</el-checkbox>
                        <el-tag>{{ fullRefuge.refuge_information[0].beds }} Beds</el-tag>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-full-route">
                        <h5 class="el-full-route-title">Access Route:</h5>
                        <el-checkbox v-model="fullRefuge.refuge_road[0].road == 1">Road</el-checkbox>
                        <el-checkbox v-model="fullRefuge.refuge_road[0].macadam == 1">Macadam</el-checkbox>
                        <el-checkbox v-model="fullRefuge.refuge_road[0].foot == 1">Foot</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-row>
                            <span v-for="contact in fullRefuge.refuge_contacts">
                                <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" class="el-full-route">
                                    <h5 class="el-full-route-title">Person:</h5>
                                    <p>{{ contact.person }}</p>
                                </el-col>
                                <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" class="el-full-route">
                                    <h5 class="el-full-route-title">Phone:</h5>
                                    <p>{{ contact.phone }}</p>
                                </el-col>
                                <el-col :xs="8" :sm="8" :md="6" :lg="8" :xl="8" class="el-full-route">
                                    <h5 class="el-full-route-title">Email:</h5>
                                    <p>{{ contact.email }}</p>
                                </el-col>
                            </span>
                        </el-row>
                    </el-col>
                </el-row>
                <br>
            </el-collapse-item>
        </el-collapse>

        <el-button class="el-button-route" type="primary" v-on:click="step">Delete Refuge</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    refuge: ''
                }
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
            /**
             * Refuge Information Data
             */
            fullRefuge() {
                return this.$store.state.refuge.refuge
            },
            /**
             * Show Refuge
             */
            showRefuge() {
                return this.$store.state.refuge.showRefuge
            },
            /**
             * Clear Selected Refuge
             */
            clear() {
                return this.$store.state.clear.clearInformation;
            }
        },
        watch: {
            /**
             * Clear selected values
             * > in computed (state) property
             * > reload clear event to be used again
             */
            clear() {
                this.form.refuge = '';
                this.$store.dispatch('CLEAR_SELECT_VALUES_INFORMATION');
            }
        },
        methods: {
            selectedRefuge() {
                var data = {
                    refuge: this.form.refuge
                };
                this.$store.dispatch('GET_REFUGE', data)
            },
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            if(this.$store.state.mountain.mountain.mountain_id == null) {
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Please Select Mountain',
                                    type: 'warning'
                                });
                            } else {
                                this.$emit('step', this.form);
                            }
                        }
                    });
            }
        }
    }
</script>