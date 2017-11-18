<template>
    <el-row class="el-information-create">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step title="Add Story"></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="16" :sm="16" :md="14" :lg="12" :xl="12">
            <information-create-story-add-story v-on:step="next" v-if="active == 0"></information-create-story-add-story>
            <div v-if="active == 1">
                <h3>Add Another Story?</h3>
                <el-button type="primary" v-on:click="next">Restart</el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                story: {}
            }
        },
        methods: {
            next(form) {
                if (this.active++ > 0) {
                    this.active = 0;
                } else {
                    this.story = Object.assign(form);
                    this.postStory();
                }
            },
            postStory() {
                this.$store.dispatch('CREATE_STORY', { data: this.story });
            }
        }
    }
</script>