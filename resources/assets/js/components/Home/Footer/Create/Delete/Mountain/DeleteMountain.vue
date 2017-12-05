<template>
    <div>
        <h4 v-if="showMountain == false">Please select Mountain from the list above!</h4>
        <el-collapse accordion v-if="showMountain">
            <el-collapse-item v-bind:title="'Please Review Selected Mountain'" name="1" class="el-collapse-item-title">
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <h5 class="el-delete-title">Routes</h5>
                        <ul>
                            <li v-for="item in routes.list">
                                {{ item.name }}
                            </li>
                        </ul>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <h5 class="el-delete-title">Refuges</h5>
                        <ul>
                            <li v-for="item in refuges.list">
                                {{ item.name }}
                            </li>
                        </ul>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <h5 class="el-delete-title">Stories</h5>
                        <ul>
                            <li v-for="item in stories.list">
                                {{ item.title }}
                            </li>
                        </ul>
                    </el-col>
                </el-row>
                <br>
            </el-collapse-item>
        </el-collapse>
        <el-button class="el-button-route" type="primary" v-on:click="step">Delete Mountain</el-button>
    </div>
</template>

<script>
    import swal from 'sweetalert2';

    export default {
        data() {
            return {
                form: {
                    mountain: this.$store.state.mountain.mountain.mountain_id
                }
            }
        },
        computed: {
            /**
             * List of Routes
             */
            routes() {
                return {
                    list: this.$store.state.route.routes
                }
            },
            /**
             * List of Refuges
             */
            refuges() {
                return {
                    list: this.$store.state.refuge.refuges
                }
            },
            /**
             * List of Stories
             */
            stories() {
                return {
                    list: this.$store.state.story.stories
                }
            },
            /**
             * Show Mountain
             */
            showMountain() {
                return this.$store.state.mountain.showMountain
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
                            if(this.$store.state.mountain.mountain.mountain_id == null) {
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Please Select Mountain',
                                    type: 'warning'
                                });
                            } else {
                                swal({
                                        title: 'Are you sure?',
                                        text: "You will also DELETE Mountain's Routes, Refuges & Stories",
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#67c23a',
                                        cancelButtonColor: '#FF0000',
                                        confirmButtonText: 'Yes'
                                }).then((result) => {
                                    if(result) {
                                        console.log(JSON.stringify(this.form));
                                        this.$emit('step', this.form);
                                    }
                                    // if (result.value) {
                                    //     console.log(result.value);
                                    //     console.log('Success');
                                    //     // console.log(JSON.stringify(this.form));
                                    //     // this.$emit('step', this.form);
                                    // } else {
                                    //     console.log(result.value);
                                    //     console.log('Failure');
                                    // }
                                })
                            }
                        }
                    });
            }
        }
    }
</script>