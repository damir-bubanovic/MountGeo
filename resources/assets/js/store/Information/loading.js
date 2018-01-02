/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';


const state = {
    loading: false
};

const mutations = {
    [MutationTypes.LOADING_ON](state) {
        state.loading = true;
    },




    [MutationTypes.LOADING_OFF](state) {
        state.loading = false;
    }
};
const actions = {
    [MutationTypes.LOADING_ON]({commit}) {
        commit(MutationTypes.LOADING_ON);
    },




    [MutationTypes.LOADING_OFF]({commit}) {
        commit(MutationTypes.LOADING_OFF);
    }
};

export default {
    state,
    mutations,
    actions,
}