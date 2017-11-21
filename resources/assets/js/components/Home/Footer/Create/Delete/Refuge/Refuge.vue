<template>
    <div>
        <el-select v-model="form.refuge" placeholder="Select Refuges To Delete...">
            <el-option
                v-for="refuge in refuges.list"
                :key="refuge.id"
                :label="refuge.name"
                :value="refuge.id">
            </el-option>
        </el-select>
        <el-button class="el-button-route" type="primary" v-on:click="step">Delete Refuges</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    refuge: ''
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