/**
 * Mountain Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    mountains: [],
    mountain: [],
    showMountain: false
};

const mutations = {
    [MutationTypes.GET_MOUNTAINS](state, { response }) {
        state.mountains = [];
        state.mountains = response.data.mountains;
    },




    [MutationTypes.SELECTED_MOUNTAIN](state, data) {
        state.mountain = data;
        state.showMountain = true;
    },




    [MutationTypes.CLEAR_MOUNTAIN](state) {
        state.showMountain = false;
        state.mountain = [];
    }
};
const actions = {
    [MutationTypes.GET_MOUNTAINS]({commit}) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.get('api/get-mountains' + '?token=' + token)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_MOUNTAINS, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Mountain List!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.CREATE_MOUNTAIN]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-mountain' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 201) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Mountain Created!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        if (error.response.status == 401) {
                            localStorage.removeItem('token');
                            swal({
                                type: 'error',
                                title: 'Please Login Again'
                            }).catch(swal.noop)
                        } else {
                            swal({
                                type: 'error',
                                title: 'Mountain Not Added! Try Again!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.UPDATE_MOUNTAIN]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/update-mountain' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Mountain Updated!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        if (error.response.status == 401) {
                            localStorage.removeItem('token');
                            swal({
                                type: 'error',
                                title: 'Please Login Again'
                            }).catch(swal.noop)
                        } else {
                            swal({
                                type: 'error',
                                title: 'Can Not Update Mountain!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.SELECTED_MOUNTAIN]({ commit }, data) {
        commit(MutationTypes.SELECTED_MOUNTAIN, data);
    },




    [MutationTypes.DELETE_MOUNTAIN]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/delete-mountain' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Mountain Deleted!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        if (error.response.status == 401) {
                            localStorage.removeItem('token');
                            swal({
                                type: 'error',
                                title: 'Please Login Again'
                            }).catch(swal.noop)
                        } else {
                            swal({
                                type: 'error',
                                title: 'Mountain Not Deleted! Try Again!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.CLEAR_MOUNTAIN]({commit}) {
        commit(MutationTypes.CLEAR_MOUNTAIN);
    }
};

export default {
    state,
    mutations,
    actions,
}