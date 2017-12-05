<template>
    <div>
        <el-select v-model="form.refuges" multiple placeholder="Add Refuges to Route...">
            <el-option
                v-for="refuge in refuges.list"
                :key="refuge.id"
                :label="refuge.name"
                :value="refuge.id">
            </el-option>
        </el-select>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Add Refuges</el-button>
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
                    refuges: []
                }
            }
        },
        computed: {
            refuges() {
                return {
                    list: this.$store.state.refuge.refuges
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