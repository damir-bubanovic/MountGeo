<template>
    <div>
        <el-select v-model="form.stories" multiple placeholder="Add Stories to Route...">
            <el-option
                v-for="story in stories.list"
                :key="story.id"
                :label="story.title"
                :value="story.id">
            </el-option>
        </el-select>
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Stories</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    stories: []
                }
            }
        },
        computed: {
            stories() {
                return {
                    list: this.$store.state.story.stories
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