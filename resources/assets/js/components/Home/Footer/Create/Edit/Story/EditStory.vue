<template>
    <div>
        <el-select v-model="form.story" @change="selectedStory"
        placeholder="Select Story To Edit..." class="el-delete-option">
            <el-option
                v-for="story in stories.list"
                :key="story.id"
                :label="story.title"
                :value="story.id">
            </el-option>
        </el-select>
        <div v-if="showStory">
            <hr>
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <p>Story id: {{ fullStory.id }}</p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                    <p>Created at: {{ fullStory.created_at }}</p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                    <p>Updated at: {{ fullStory.updated_at }}</p>
                </el-col>
            </el-row>
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
        </div>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Story</el-button>
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
                    story: '',
                    title: '',
                    detail: ''
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
        computed: {
            stories() {
                return {
                    list: this.$store.state.story.stories
                }
            },
            /**
             * Story Information Data
             */
            fullStory() {
                return this.$store.state.story.story[0]
            },
            /**
             * Show Story
             */
            showStory() {
                return this.$store.state.story.showStory
            },
            /**
             * Clear Selected Story
             */
            clear() {
                return this.$store.state.clear.clearInformation;
            }
        },
        watch: {
            /**
             * Clear selected values
             * > in computed (state) property
             * > reload clear event to be used again
             */
            clear() {
                this.form.story = '';
                this.$store.dispatch('CLEAR_SELECT_VALUES_INFORMATION');
            }
        },
        methods: {
            selectedStory() {
                var data = {
                    story: this.form.story
                };
                this.$store.dispatch('GET_STORY', data)
                    .then(() => {
                        this.form.title = this.fullStory.title;
                        this.content = this.fullStory.description;
                    });
            },
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