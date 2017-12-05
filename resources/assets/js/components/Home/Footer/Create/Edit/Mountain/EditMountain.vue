<template>
    <div v-if="showMountain">
        <hr>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <p>Mountain id: {{ fullMountain.mountain_id }}</p>
            </el-col>
        </el-row>
        <el-input type="text" placeholder="Edit Mountain Name" v-model="fullMountain.mountain_name"
            v-validate="'required|alpha_spaces|min:2|max:60'" data-vv-delay="1000"
            data-vv-name="name" data-vv-as="name"
            @blur="$validator.validate('name', form.name)"
            :class="errors.has('name')">
        </el-input>
        <span v-show="errors.has('name')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('name') }}
        </span>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Mountain</el-button>
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
                    name: ''
                }
            }
        },
        computed: {
            /**
             * Mountain Information Data
             */
            fullMountain() {
                return this.$store.state.mountain.mountain
            },
            /**
             * Show Mountain
             */
            showMountain() {
                return this.$store.state.mountain.showMountain
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
                            this.form.name = this.fullMountain.mountain_name;

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>