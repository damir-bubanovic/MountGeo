<template>
    <div>
        <el-input
            type="textarea"
            :rows="8"
            placeholder="Enter Route Detail"
            v-model="form.detail">
        </el-input>
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Detail</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    detail: ''
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