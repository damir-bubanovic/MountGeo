<template>
    <el-header>
        <!-- ****** HEADER COMPONENT ****** -->
        <el-row :gutter="24">
            <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="1" class="el-header-logo">
                <a v-on:click="welcomePage"><img src="/img/logo.png" alt="MountGeo Logo"></a>
            </el-col>
            <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2" class="el-header-logo el-hidden-phone">
                <a v-on:click="welcomePage"><h3>MountGeo</h3></a>
            </el-col>
            <el-col :xs="20" :sm="18" :md="18" :lg="20" :xl="21" class="el-menu-header" v-if="show">
                <el-menu :default-active="activeIndex" mode="horizontal">
                    <el-menu-item index="login" v-on:click="loginPage">Login</el-menu-item>
                    <el-menu-item index="register" v-on:click="registerPage">Register</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 'login',
                show: this.$store.state.auth.showLogRegLinks,
            }
        },
        methods: {
            welcomePage()  {
                this.$store.dispatch('WELCOME_LOGIN_REGISTER_PAGE')
                    .then(() => {
                        this.$router.push('/');
                    });
            },
            loginPage() {
                this.$store.dispatch('WELCOME_LOGIN_REGISTER_PAGE')
                    .then(() => {
                        this.$router.push('/login');
                    });
            },
            registerPage() {
                this.$store.dispatch('WELCOME_LOGIN_REGISTER_PAGE')
                    .then(() => {
                        this.$router.push('/register');
                    });
            }
        }
    }
</script>