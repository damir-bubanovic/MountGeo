<template>
    <div v-if="showRoute">
        <hr>
        <el-transfer
            v-model="form.afterActiveStories"
            :titles="['Reserve', 'Active']"
            :data="form.data">
        </el-transfer>

        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Stories</el-button>
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
            /**
             * Active Refuges
             * > populate data from active refuges
             */
            const generateValue = _ => {
                var value = []

                var activeStories = this.$store.state.route.route.story;

                for (var i = 0; i < activeStories.length; i++) {
                    value.push(activeStories[i].id);
                }
                return value;
            }
            /**
             * All Refuges
             * > Populate data from all existing refuges
             */
            const generateData = _ => {
                var data = []

                var allStories = this.$store.state.story.stories;

                for (var i = 0; i < allStories.length; i++) {
                    data.push({
                        key: allStories[i].id,
                        label: allStories[i].title,
                    });
                }
                return data;
            }
            return {
                form: {
                    data: generateData(),
                    beforeActiveStories: generateValue(),
                    afterActiveStories: generateValue()
                }
            }
        },
        computed: {
            /**
             * Show Route
             */
            showRoute() {
                return this.$store.state.route.showRoute
            },
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
                            delete this.form.data;
                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>