<template>
    <div v-if="showRefuge">
        <hr>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <p>Route id: {{ fullRefuge.refuge[0].id }}</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                <p>Created at: {{ fullRefuge.refuge[0].created_at }}</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                <p>Updated at: {{ fullRefuge.refuge[0].updated_at }}</p>
            </el-col>
        </el-row>
        <el-input type="text" placeholder="Enter New Refuge Name" v-model="fullRefuge.refuge[0].name"
            v-validate="'required|alpha_spaces|min:2|max:60'" data-vv-delay="1000"
            data-vv-name="name" data-vv-as="name"
            @blur="$validator.validate('name', fullRefuge.refuge[0].name)"
            :class="errors.has('name')">
        </el-input>
        <span v-show="errors.has('name')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('name') }}
        </span>
        <el-input type="text" placeholder="Enter GPS Latitude ..." v-model="fullRefuge.refuge[0].latitude"
            v-validate="'required|between:-180.999999,180.999999'" data-vv-delay="1000"
            data-vv-name="latitude" data-vv-as="latitude"
            @blur="$validator.validate('latitude', fullRefuge.refuge[0].latitude)"
            :class="errors.has('latitude')">
        </el-input>
        <span v-show="errors.has('latitude')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('latitude') }}
        </span>


        <el-input type="text" placeholder="Enter GPS Longitude..." v-model="fullRefuge.refuge[0].longitude"
            v-validate="'required|between:-180.999999,180.999999'" data-vv-delay="1000"
            data-vv-name="longitude" data-vv-as="longitude"
            @blur="$validator.validate('longitude', fullRefuge.refuge[0].longitude)"
            :class="errors.has('longitude')">
        </el-input>
        <span v-show="errors.has('longitude')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('longitude') }}
        </span>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Refuge</el-button>
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
                    name: '',
                    latitude: '',
                    longitude: '',
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
                            this.form.name = this.fullRefuge.refuge[0].name;
                            this.form.latitude = this.fullRefuge.refuge[0].latitude;
                            this.form.longitude = this.fullRefuge.refuge[0].longitude;

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>