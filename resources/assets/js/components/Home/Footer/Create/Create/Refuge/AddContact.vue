<template>
    <div>
        <span class="demonstration">Enter Refuge Info</span>
        <p v-for="person in form">
            <el-input placeholder="Contact Name" v-model="person.contact"></el-input>
            <el-input type="email" placeholder="Enter email address" v-model="person.email"></el-input>
            <el-input type="tel" placeholder="Enter phone number" v-model="person.phone"></el-input>
            <a class="remove-button" v-on:click="removePerson(person)">Remove</a>
        </p>
        <el-button class="el-button-route" type="primary" v-on:click="addPerson">Add More Contacts</el-button>
        <hr>
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Contacts</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: [
                    { contact: '', email: '', phone: '' }
                ]
            }
        },
        methods: {
            addPerson() {
                this.form.push({ contact: '', email: '', phone: '' });
            },
            removePerson(person) {
                this.form.splice(person, 1);
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