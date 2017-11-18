import Vue from 'vue';
import VueRouter from 'vue-router';

import Welcome from '../components/Auth/Welcome.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import Home from '../components/Home/Home.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Welcome },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/home', component: Home },
    ]
})

export default router