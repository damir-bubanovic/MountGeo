<template>
    <div>
        <el-select v-model="form.story" @change="selectedStory"
        placeholder="Select Story To Delete..." class="el-delete-option">
            <el-option
                v-for="story in stories.list"
                :key="story.id"
                :label="story.title"
                :value="story.id">
            </el-option>
        </el-select>
        <el-collapse accordion v-if="showStory">
            <el-collapse-item v-bind:title="'Review of - ' + fullStory.title" name="1" class="el-collapse-item-title">
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
                <br>
                <div class="el-collapse-item-story">{{ fullStory.description }}</div>
            </el-collapse-item>
        </el-collapse>

        <el-button class="el-button-route" type="primary" v-on:click="step">Delete Stories</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    story: ''
                }
            }
        },
        computed: {
            /**
             * List of Stories
             */
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
            }
        },
        methods: {
            selectedStory() {
                var data = {
                    story: this.form.story
                };
                this.$store.dispatch('GET_STORY', data)
            },
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            // this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>