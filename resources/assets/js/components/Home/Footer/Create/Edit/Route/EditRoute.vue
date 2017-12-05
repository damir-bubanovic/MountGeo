<template>
    <div v-if="showRoute">
        <hr>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <p>Route id: {{ fullRoute.id }}</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                <p>Created at: {{ fullRoute.created_at }}</p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                <p>Updated at: {{ fullRoute.updated_at }}</p>
            </el-col>
        </el-row>
        <el-input type="text" placeholder="Edit Refuge Name" v-model="fullRoute.name"
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
                <el-button type="primary" v-on:click="step">Edit Route</el-button>
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
             * Route Information Data
             */
            fullRoute() {
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
                            this.form.name = this.fullRoute.name;

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>