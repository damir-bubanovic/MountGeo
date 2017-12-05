<template>
    <div v-if="showRefuge">
        <hr>
        <el-row>
            <el-col :span="12">
                <el-time-select
                    placeholder="Start time"
                    v-model="fullRefuge.refuge_information[0].open"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00'
                }">
                </el-time-select>
            </el-col>
            <el-col :span="12">
                <el-time-select
                    placeholder="End time"
                    v-model="fullRefuge.refuge_information[0].close"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00',
                      minTime: form.startTime
                }">
                </el-time-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-checkbox v-model="form.road" :checked="fullRefuge.refuge_road[0].road == 1">Road</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox v-model="form.macadam" :checked="fullRefuge.refuge_road[0].macadam == 1">Macadam</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox v-model="form.foot" :checked="fullRefuge.refuge_road[0].foot == 1">Foot</el-checkbox>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-checkbox v-model="form.water" :checked="fullRefuge.refuge_information[0].water == 1">Water</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox v-model="form.food" :checked="fullRefuge.refuge_information[0].food == 1">Food</el-checkbox>
            </el-col>
            <el-col :span="6">
                <p>Beds</p>
                <el-input-number v-model="fullRefuge.refuge_information[0].beds" size="small" :min="0" :max="50"></el-input-number>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Info</el-button>
            </el-col>
            <el-col :span="9">
                <el-button type="danger" v-on:click="cancel">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    startTime: '',
                    endTime: '',
                    road: 0,
                    macadam: 0,
                    foot: 0,
                    water: 0,
                    food: 0,
                    beds: 0
                }
            }
        },
        computed: {
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
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel');
            },
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            this.form.startTime = this.fullRefuge.refuge_information[0].open;
                            this.form.endTime = this.fullRefuge.refuge_information[0].close;
                            this.form.beds = this.fullRefuge.refuge_information[0].beds;

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>