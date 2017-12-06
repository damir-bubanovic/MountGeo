<template>
    <div v-if="showRefuge">
        <hr>
        <p v-for="person in fullRefuge.refuge_contacts">
            <el-input placeholder="Contact Name" v-model="person.person"></el-input>
            <el-input type="email" placeholder="Enter email address" v-model="person.email"></el-input>
            <el-input type="tel" placeholder="Enter phone number" v-model="person.phone"></el-input>
            <a class="remove-button" v-on:click="removePerson(person)">Remove</a>
        </p>
        <p v-for="person in form" v-if="showNewPerson">
            <el-input placeholder="Contact Name" v-model="person.person"></el-input>
            <el-input type="email" placeholder="Enter email address" v-model="person.email"></el-input>
            <el-input type="tel" placeholder="Enter phone number" v-model="person.phone"></el-input>
            <a class="remove-button" v-on:click="removeNewPerson(person)">Remove</a>
        </p>
        <el-button class="el-button-route" type="primary" v-on:click="addNewPerson">Add More Contacts</el-button>
        <hr>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-button type="primary" v-on:click="step">Edit Contact</el-button>
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
                showNewPerson: false,
                form: [
                    { person: '', email: '', phone: '' }
                ],
            }
        },
        computed: {
            /**
             * Refuge Information Data
             */
            fullRefuge() {
                return this.$store.state.refuge.refuge
            },
            /**
             * Show Refuge
             */
            showRefuge() {
                return this.$store.state.refuge.showRefuge
            }
        },
        methods: {
            addNewPerson() {
                if(this.showNewPerson) {
                    this.form.push({ person: '', email: '', phone: '' });
                };
                this.showNewPerson = true;
            },
            removeNewPerson(person) {
                this.form.splice(person, 1);
            },
            removePerson(person) {
                this.fullRefuge.refuge_contacts.splice(person, 1);
            },
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
                            /**
                             * Push Database Edited Data to form array
                             */
                            if(this.form[0].person == '') {
                                this.form = this.fullRefuge.refuge_contacts;
                            } else {
                                var arrayMerge = this.form.concat(this.fullRefuge.refuge_contacts);
                                this.form = arrayMerge;
                            }

                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>