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
        <tinymce id="create-story" v-model="form.detail" :content='content' :options='options'></tinymce>
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
                },
                content: '',
                options: {
                    plugins: "textcolor colorpicker lists",
                    toolbar: [
                        'undo redo | formatselect | bold italic underline strikethrough | numlist bullist',
                        'indent outdent | alignleft aligncenter alignright alignnone | cut copy paste | forecolor backcolor',
                    ],
                    branding: false,
                    elementpath: false,
                    menubar: false,
                    height : 300,
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
                            if(this.$store.state.mountain.mountain_id == null) {
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Please Select Mountain',
                                    type: 'warning'
                                });
                            } else {
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
                        }
                    });
            }
        }
    }
</script>