<template>
    <div>
        <app-header></app-header>
            <el-main>
                <form class="el-form-enter">
                    <el-input type="text" placeholder="Name" v-model="form.name"
                        v-validate="'required|alpha'" data-vv-delay="1000"
                        data-vv-name="name" data-vv-as="name"
                        @blur="$validator.validate('name', form.name)"
                        :class="errors.has('name')">
                    </el-input>
                    <span v-show="errors.has('name')" class="help is-danger">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        {{ errors.first('name') }}
                    </span>
                    <el-input type="email" placeholder="Email" v-model="form.email"
                        v-validate="'required|email'" data-vv-delay="2000"
                        data-vv-name="email" data-vv-as="email"
                        @blur="$validator.validate('email', form.email)"
                        :class="errors.has('email')">
                    </el-input>
                    <span v-show="errors.has('email')" class="help is-danger">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        {{ errors.first('email') }}
                    </span>
                    <el-input type="password" placeholder="Password" v-model="form.password"
                        v-validate="'required|min:6'" data-vv-delay="1000"
                        data-vv-name="password" data-vv-as="password"
                        @blur="$validator.validate('password', form.password)"
                        :class="errors.has('password')">
                    </el-input>
                    <span v-show="errors.has('password')" class="help is-danger">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        {{ errors.first('password') }}
                    </span>
                    <el-input type="password" placeholder="Confirm Password" v-model="form.password_confirmation"
                        v-validate="'required|min:6'" data-vv-delay="1000"
                        data-vv-name="password_confirmation" data-vv-as="password"
                        @blur="$validator.validate('password_confirmation', form.password_confirmation)"
                        :class="errors.has('password_confirmation')">
                    </el-input>
                    <span v-show="errors.has('password_confirmation')" class="help is-danger">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        {{ errors.first('password_confirmation') }}
                    </span>
                    <el-button type="primary" v-on:click="register">Register</el-button>
                </form>
            </el-main>
        <app-footer></app-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null
                }
            }
        },
        methods: {
            register() {
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            if(this.form.password == this.form.password_confirmation) {
                                this.$store.dispatch('REGISTER', this.form)
                                    .then(() => {
                                        this.$router.push('/login');
                                    })
                                    .catch((error) => {
                                        this.$router.push('/register');
                                    });
                            } else {
                                alert('Passwords Do Not Match!');
                            }
                        }
                    });
            }
        }
    }
</script>
