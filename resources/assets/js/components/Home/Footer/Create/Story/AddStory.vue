<template>
    <div>
        <el-input type="text" placeholder="Enter New Story Title" v-model="form.title"
            v-validate="'required|alpha_spaces|min:2|max:60'" data-vv-delay="1000"
            data-vv-name="title" data-vv-as="title"
            @blur="$validator.validate('title', form.title)"
            :class="errors.has('title')">
        </el-input>
        <span v-show="errors.has('title')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('title') }}
        </span>
        <el-input
            type="textarea"
            :rows="8"
            placeholder="Enter Story Detail"
            v-model="form.detail">
        </el-input>
        <el-button type="primary" v-on:click="step">Add Story</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    detail: '',
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
                            /**
                             * Setup mountain_id & append it to info selected
                             */
                            var mountain_id = this.$store.state.mountain.mountain_id;
                            this.form.mountain = mountain_id;

                            /**
                             * Send objects with array
                             */
                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>