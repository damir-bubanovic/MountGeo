
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('app-starter', require('./App.vue'));

Vue.component('app-header', require('./Components/Auth/Header.vue'));
Vue.component('app-footer', require('./Components/Auth/Footer.vue'));

Vue.component('home-header', require('./Components/Home/Header.vue'));
Vue.component('home-footer', require('./Components/Home/Footer.vue'));
Vue.component('map-main', require('./Components/Home/Map.vue'));
Vue.component('map-chart', require('./Components/Home/Map/MapChart.vue'));

Vue.component('information', require('./Components/Home/Footer/Information.vue'));
Vue.component('information-main', require('./Components/Home/Footer/Create/Main.vue'));
Vue.component('information-create', require('./Components/Home/Footer/Create/Create/Create.vue'));
Vue.component('information-edit', require('./Components/Home/Footer/Create/Edit/Edit.vue'));
Vue.component('information-delete', require('./Components/Home/Footer/Create/Delete/Delete.vue'));

Vue.component('information-create-selected-mountain', require('./Components/Home/Footer/Create/SelectedMountain.vue'));
Vue.component('information-create-mountain', require('./Components/Home/Footer/Create/Create/Mountain/Mountain.vue'));
Vue.component('information-create-mountain-add-mountain', require('./Components/Home/Footer/Create/Create/Mountain/AddMountain.vue'));

Vue.component('information-create-route', require('./Components/Home/Footer/Create/Create/Route/Route.vue'));
Vue.component('information-create-route-add-route', require('./Components/Home/Footer/Create/Create/Route/AddRoute.vue'));
Vue.component('information-create-route-add-detail', require('./Components/Home/Footer/Create/Create/Route/AddDetail.vue'));
Vue.component('information-create-route-add-info', require('./Components/Home/Footer/Create/Create/Route/AddInformation.vue'));
Vue.component('information-create-route-add-refuge', require('./Components/Home/Footer/Create/Create/Route/AddRefuge.vue'));
Vue.component('information-create-route-add-story', require('./Components/Home/Footer/Create/Create/Route/AddStory.vue'));

Vue.component('information-create-refuge', require('./Components/Home/Footer/Create/Create/Refuge/Refuge.vue'));
Vue.component('information-create-refuge-add-refuge', require('./Components/Home/Footer/Create/Create/Refuge/AddRefuge.vue'));
Vue.component('information-create-refuge-add-info', require('./Components/Home/Footer/Create/Create/Refuge/AddInformation.vue'));
Vue.component('information-create-refuge-add-contact', require('./Components/Home/Footer/Create/Create/Refuge/AddContact.vue'));

Vue.component('information-delete-mountain', require('./Components/Home/Footer/Create/Delete/Mountain/Mountain.vue'));
Vue.component('information-delete-refuge', require('./Components/Home/Footer/Create/Delete/Refuge/Refuge.vue'));
Vue.component('information-delete-refuge-delete-refuge', require('./Components/Home/Footer/Create/Delete/Refuge/DeleteRefuge.vue'));
Vue.component('information-delete-route', require('./Components/Home/Footer/Create/Delete/Route/Route.vue'));
Vue.component('information-delete-route-delete-route', require('./Components/Home/Footer/Create/Delete/Route/DeleteRoute.vue'));
Vue.component('information-delete-story', require('./Components/Home/Footer/Create/Delete/Story/Story.vue'));
Vue.component('information-delete-story-delete-story', require('./Components/Home/Footer/Create/Delete/Story/DeleteStory.vue'));

Vue.component('information-edit-mountain', require('./Components/Home/Footer/Create/Edit/Mountain/Mountain.vue'));
Vue.component('information-edit-refuge', require('./Components/Home/Footer/Create/Edit/Refuge/Refuge.vue'));
Vue.component('information-edit-route', require('./Components/Home/Footer/Create/Edit/Route/Route.vue'));
Vue.component('information-edit-story', require('./Components/Home/Footer/Create/Edit/Story/Story.vue'));


Vue.component('information-create-story', require('./Components/Home/Footer/Create/Create/Story/Story.vue'));
Vue.component('information-create-story-add-story', require('./Components/Home/Footer/Create/Create/Story/AddStory.vue'));

Vue.component('information-database', require('./Components/Home/Footer/Database/Database.vue'));
Vue.component('information-database-full-route', require('./Components/Home/Footer/Database/FullRoute.vue'));

/**
 * Element IO
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/**
 * Vue Router
 */
import router from './router';

/**
 * Vuex
 */
import store from './store/store';

/**
 * Vee-Validate
 */
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


const app = new Vue({
    el: '#app',
    router,
    store
});
