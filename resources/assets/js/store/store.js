/**
 * STORE
 */
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './Auth/auth';
import maps from './GoogleMaps/maps';
import mountain from './Information/mountain';
import route from './Information/route';
import story from './Information/story';
import refuge from './Information/refuge';


Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        auth,
        maps,
        mountain,
        route,
        story,
        refuge
    }
});
