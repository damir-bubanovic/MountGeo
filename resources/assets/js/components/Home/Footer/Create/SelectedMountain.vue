<template>
    <el-row :gutter="24">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="4" class="el-selected-mountain">
            <el-select v-model="value"
            @change="selectedMountain"
            placeholder="Select Mountain to Add New...">
                <el-option
                    v-for="mountain in mountains.list"
                    :key="mountain.id"
                    :label="mountain.name"
                    :value="mountain.id">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
            }
        },
        mounted() {
            return this.$store.dispatch('GET_MOUNTAINS');
        },
        computed: {
            mountains() {
                return {
                    list: this.$store.state.mountain.mountains
                }
            }
        },
        methods: {
            selectedMountain() {
                var data = {
                    mountain_id: this.value
                };
                this.$store.dispatch('MOUNTAIN_ID', data)
                    .then(() => {
                        this.$store.dispatch('GET_ROUTES', data);
                    })
                    .then(() => {
                        this.$store.dispatch('GET_STORIES', data);
                    })
                    .then(() => {
                        this.$store.dispatch('GET_REFUGES', data);
                    });
            }
        }
    }
</script>