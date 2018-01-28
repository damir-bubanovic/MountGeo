<template>
    <el-row class="el-information-create">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-steps style="height: 300px;" direction="vertical" :active="active">
                <el-step></el-step>
            </el-steps>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <information-delete-story-delete-story v-on:step="next" v-if="active == 0"></information-delete-story-delete-story>
            <div v-if="active == 1">
                <h3>Delete Another Story?</h3>
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
                    this.deleteStory();
                }
            },
            deleteStory() {
                this.$store.dispatch('DELETE_STORY', { data: this.story })
                    .then(() => {
                        var data = {
                            mountain_id: this.$store.state.mountain.mountain.mountain_id
                        };
                        this.$store.dispatch('GET_STORIES', data);
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            this.$router.push('/login');
                        }
                    });
            }
        }
    }
</script>