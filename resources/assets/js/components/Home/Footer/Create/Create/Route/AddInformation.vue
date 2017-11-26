<template>
    <div>
        <div class="block">
            <span class="demonstration">Enter Route Difficulty</span>
            <el-rate
                v-model="form.difficulty"
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
                    @blur="$validator.validate('day', form.day)"
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
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Information</el-button>
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
        methods: {
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>