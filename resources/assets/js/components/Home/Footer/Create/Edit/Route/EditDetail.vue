<template>
    <div v-if="showRoute">
        <hr>
        <tinymce id="edit-route" v-model="form.detail" :content='content' :options='options'></tinymce>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Detail</el-button>
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
                    detail: ''
                },
                content: this.$store.state.route.route.route[0].description,
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
                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>