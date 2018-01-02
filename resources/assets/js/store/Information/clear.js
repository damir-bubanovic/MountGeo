/**
 * Clear Values / Set select value to default
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';

const state = {
    clearDatabase: false,
    clearinformation: false
};

const mutations = {
    [MutationTypes.CLEAR_SELECT_VALUES_DATABASE](state) {
        console.log("First State is " + state.clearDatabase);
        state.clearDatabase = true;
        console.log("Second State is " + state.clearDatabase);
    },
    [MutationTypes.RELOAD_CLEAR_DATABASE_EVENT](state) {
        state.clearDatabase = false;
    },



    [MutationTypes.CLEAR_SELECT_VALUES_INFORMATION](state) {
        state.clearInformation = true;
    },
    [MutationTypes.RELOAD_CLEAR_INFORMATION_EVENT](state) {
        state.clearInformation = false;
    },
};

const actions = {
    [MutationTypes.CLEAR_SELECT_VALUES_DATABASE]({commit}) {
        commit(MutationTypes.CLEAR_SELECT_VALUES_DATABASE)
    },
    [MutationTypes.RELOAD_CLEAR_DATABASE_EVENT]({commit}) {
        commit(MutationTypes.RELOAD_CLEAR_DATABASE_EVENT)
    },



    [MutationTypes.CLEAR_SELECT_VALUES_INFORMATION]({commit}) {
        commit(MutationTypes.CLEAR_SELECT_VALUES_INFORMATION)
    },
    [MutationTypes.RELOAD_CLEAR_INFORMATION_EVENT]({commit}) {
        commit(MutationTypes.RELOAD_CLEAR_INFORMATION_EVENT)
    },
};


export default {
    state,
    mutations,
    actions,
}