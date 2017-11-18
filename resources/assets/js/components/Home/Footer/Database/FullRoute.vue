<template>
    <el-tabs v-model="activeName" class="el-info-database-tabs">
        <el-tab-pane label="Route Info" name="info">
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="el-full-route">
                    <h5 class="el-full-route-title">Name:</h5>
                    <p>{{ fullRoute.route[0].name }}</p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="el-full-route">
                    <h5 class="el-full-route-title">Difficulty:</h5>
                    <p><el-rate disabled v-model="fullRoute.route[0].difficulty"></el-rate></p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="el-full-route">
                    <h5 class="el-full-route-title">Duration:</h5>
                    <p>{{ getDuration(fullRoute.route[0].duration) }}</p>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="el-full-route">
                    <h5 class="el-full-route-title">Description:</h5>
                    <p>{{ fullRoute.route[0].description }}</p>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="Refuge" name="refuge">
            <el-collapse v-model="activeRefuge" accordion>
                <span v-for="refuge in fullRoute.refuge">
                    <el-collapse-item v-bind:title="refuge.name" v-bind:name="refuge.name" class="el-collapse-item-title">
                        <el-row :gutter="24">
                            <el-col :xs="12" :sm="4" :md="4" :lg="4" :xl="4" class="el-full-route">
                                <h5 class="el-full-route-title">Open:</h5>
                                <p>{{ refuge.open }}</p>
                            </el-col>
                            <el-col :xs="12" :sm="4" :md="4" :lg="4" :xl="4" class="el-full-route">
                                <h5 class="el-full-route-title">Close:</h5>
                                <p>{{ refuge.close }}</p>
                            </el-col>
                            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="el-full-route">
                                <h5 class="el-full-route-title">Essentials:</h5>
                                <el-checkbox v-model="refuge.water == 1">Water</el-checkbox>
                                <el-checkbox v-model="refuge.food == 1">Food</el-checkbox>
                                <el-tag>{{ refuge.beds }} Beds</el-tag>
                            </el-col>
                            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8" class="el-full-route">
                                <h5 class="el-full-route-title">Access Route:</h5>
                                <el-checkbox v-model="refuge.road == 1">Road</el-checkbox>
                                <el-checkbox v-model="refuge.macadam == 1">Macadam</el-checkbox>
                                <el-checkbox v-model="refuge.foot == 1">Foot</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-row>
                                    <span v-for="contact in refuge.contacts">
                                        <el-col :span="6" class="el-full-route">
                                            <h5 class="el-full-route-title">Person:</h5>
                                            <p>{{ contact.person }}</p>
                                        </el-col>
                                        <el-col :span="6" class="el-full-route">
                                            <h5 class="el-full-route-title">Phone:</h5>
                                            <p>{{ contact.phone }}</p>
                                        </el-col>
                                        <el-col :span="8" class="el-full-route">
                                            <h5 class="el-full-route-title">Email:</h5>
                                            <p>{{ contact.email }}</p>
                                        </el-col>
                                    </span>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </span>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="Stories" name="stories">
            <el-collapse v-model="activeStory" accordion>
                <span v-for="story in fullRoute.story">
                    <el-collapse-item v-bind:title="story.title" v-bind:name="story.title" class="el-collapse-item-title">
                        <div class="el-collapse-item-story">{{ story.description }}</div>
                    </el-collapse-item>
                </span>
            </el-collapse>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'info',
                activeRefuge: '',
                activeStory: '',
                activeContact: ''
            }
        },
        computed: {
            /**
             * Route Information Data
             */
            fullRoute() {
                return this.$store.state.route.fullRoute
            }
        },
        methods: {
            /**
             * Get Duration
             * > stored as seconds in database (could be simpler)
             */
            getDuration(number) {
                var days = Math.floor(number / 86400);
                var hours = Math.floor((number - (days * 86400)) / 3600);
                var minutes = Math.floor((number - (days * 86400) - (hours * 3600)) / 60);

                return days + ' days / ' + hours + ' hours / ' + minutes + ' minutes';
            }
        }
    }
</script>