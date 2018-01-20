<template>
    <el-header>
        <!-- ****** HEADER HOME ****** -->
        <el-row :gutter="24">
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="1" class="el-header-logo">
                <a v-on:click="homePage"><img src="/img/logo.png" alt="MountGeo Logo"></a>
            </el-col>
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="el-header-logo el-hidden-phone">
                <a v-on:click="homePage"><h3>MountGeo</h3></a>
            </el-col>
            <el-col :xs="20" :sm="16" :md="18" :lg="20" :xl="21" class="el-menu-header">
                <el-menu :default-active="activeIndex" mode="horizontal">
                    <el-submenu index="user">
                        <template slot="title">Welcome <span class="el-hidden-phone">{{ userName }}</span></template>
                        <el-menu-item index="logout" v-on:click="logOut">Log Out</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 'user',
            }
        },
        computed: {
            /**
             * User Name
             */
            userName() {
                if (this.$store.state.auth.username == "") {
                    return this.$cookie.get('username');
                } else {
                    return this.$store.state.auth.username
                }
            }
        },
        methods: {
            homePage()  {
                this.$router.push('/home');
            },
            logOut() {
                this.$store.dispatch('LOGOUT')
                    .then(() => {
                        this.$cookie.delete('username');
                        this.$router.push('/');
                    });
            }
        }
    }
</script>