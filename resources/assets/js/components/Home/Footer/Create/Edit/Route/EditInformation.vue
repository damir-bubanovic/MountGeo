<template>
    <div v-if="showRoute">
        <hr>
        <div class="block">
            <span class="demonstration">Edit Route Difficulty</span>
            <el-rate
                v-model="fullRoute.difficulty"
                :texts="['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert']"
                show-text>
            </el-rate>
        </div>
        <hr>
        <el-row>
            <el-col :span="24">
                <span class="demonstration">Enter Days/Hours/Minutes</span>
            </el-col>
            <el-col :span="24">
                <el-input-number type="number" size="small" v-model="form.day" :min="0" :max="30"
                    v-validate="'numeric|min_value:0|max_value:30'" data-vv-delay="1000"
                    data-vv-name="day" data-vv-as="day"
                    @blur="$validator.validate('day', fullRoute.day)"
                    :class="errors.has('day')"
                ></el-input-number>
                <span v-show="errors.has('day')" class="help is-danger">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    {{ errors.first('day') }}
                </span>
            </el-col>
            <el-col :span="24">
                <el-input-number type="number" size="small" v-model="form.hour" :min="0" :max="23"
                    v-validate="'numeric|min_value:0|max_value:23'" data-vv-delay="1000"
                    data-vv-name="hour" data-vv-as="hour"
                    @blur="$validator.validate('hour', form.hour)"
                    :class="errors.has('hour')"
                ></el-input-number>
                <span v-show="errors.has('hour')" class="help is-danger">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    {{ errors.first('hour') }}
                </span>
            </el-col>
            <el-col :span="24">
                <el-input-number type="number" size="small" v-model="form.min" :min="0" :max="59"
                    v-validate="'numeric|min_value:0|max_value:59'" data-vv-delay="1000"
                    data-vv-name="min" data-vv-as="min"
                    @blur="$validator.validate('min', form.min)"
                    :class="errors.has('min')"
                ></el-input-number>
                <span v-show="errors.has('min')" class="help is-danger">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    {{ errors.first('min') }}
                </span>
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
                    difficulty: null,
                    day: '',
                    hour: '',
                    min: ''
                }
            }
        },
        computed: {
            /**
             * Route Information Data
             */
            fullRoute() {
                var duration = this.$store.state.route.route.route[0].duration;
                var days = Math.floor(duration / 86400);
                var hours = Math.floor((duration - (days * 86400)) / 3600);
                var minutes = Math.floor((duration - (days * 86400) - (hours * 3600)) / 60);

                this.form.day = days;
                this.form.hour = hours;
                this.form.min = minutes;

                return this.$store.state.route.route.route[0]
            },
            /**
             * Show Route
             */
            showRoute() {
                return this.$store.state.route.showRoute
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
                            this.form.difficulty = this.fullRoute.difficulty;

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>