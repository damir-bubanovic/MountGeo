<template>
    <div>
        <app-header></app-header>
            <el-main>
                <form class="el-form-enter">
                    <el-input type="email" placeholder="Email" v-model="form.email"
                        v-validate="'required|email'" data-vv-delay="2000"
                        data-vv-name="email" data-vv-as="email"
                        @blur="$validator.validate('email', form.email)"
                        :class="errors.has('name')">
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
                    <el-button type="primary" v-on:click="login">Login</el-button>
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
                    email: null,
                    password: null,
                }
            }
        },
        methods: {
            login() {
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            this.$store.dispatch('LOGIN', this.form)
                                .then(() => {
                                    this.$router.push('/home');
                                })
                                .catch((error) => {
                                    this.$router.push('/login');
                                });
                        }
                    });
            }
        }
    }
</script>