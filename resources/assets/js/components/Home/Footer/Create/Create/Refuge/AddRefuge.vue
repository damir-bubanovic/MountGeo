<template>
    <div>
        <el-input type="text" placeholder="Enter New Refuge Name" v-model="form.name"
            v-validate="'required|alpha_spaces|min:2|max:60'" data-vv-delay="1000"
            data-vv-name="name" data-vv-as="name"
            @blur="$validator.validate('name', form.name)"
            :class="errors.has('name')">
        </el-input>
        <span v-show="errors.has('name')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('name') }}
        </span>


        <el-input type="text" placeholder="Enter GPS Latitude ..." v-model="form.latitude"
            v-validate="'required|between:-180.999999,180.999999'" data-vv-delay="1000"
            data-vv-name="latitude" data-vv-as="latitude"
            @blur="$validator.validate('latitude', form.latitude)"
            :class="errors.has('latitude')">
        </el-input>
        <span v-show="errors.has('latitude')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('latitude') }}
        </span>


        <el-input type="text" placeholder="Enter GPS Longitude..." v-model="form.longitude"
            v-validate="'required|between:-180.999999,180.999999'" data-vv-delay="1000"
            data-vv-name="longitude" data-vv-as="longitude"
            @blur="$validator.validate('longitude', form.longitude)"
            :class="errors.has('longitude')">
        </el-input>
        <span v-show="errors.has('longitude')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('longitude') }}
        </span>
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Refuge</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    latitude: '',
                    longitude: '',
                    mountain: ''
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
                            if(this.$store.state.mountain.mountain.mountain_id == null) {
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Please Select Mountain',
                                    type: 'warning'
                                });
                            } else {
                                /**
                                 * Setup mountain_id & append it to info selected
                                 */
                                var mountain_id = this.$store.state.mountain.mountain.mountain_id;
                                this.form.mountain = mountain_id;

                                this.$emit('step', this.form);
                            }
                        }
                    });
            }
        }
    }
</script>