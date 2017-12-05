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
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Add Stories</el-button>
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