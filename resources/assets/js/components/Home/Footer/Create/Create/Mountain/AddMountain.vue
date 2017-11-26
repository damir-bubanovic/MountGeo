<template>
    <div>
        <el-input type="text" placeholder="Enter New Mountain Name" v-model="form.name"
            v-validate="'required|alpha_spaces|min:2|max:60'" data-vv-delay="1000"
            data-vv-name="name" data-vv-as="name"
            @blur="$validator.validate('name', form.name)"
            :class="errors.has('name')">
        </el-input>
        <span v-show="errors.has('name')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('name') }}
        </span>
        <el-button type="primary" v-on:click="step">Add Mountain</el-button>
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