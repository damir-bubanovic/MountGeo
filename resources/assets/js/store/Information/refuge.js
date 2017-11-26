/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    refuges: [],
    showRefuge: false,
    refuge: []
};

const mutations = {
    [MutationTypes.GET_REFUGES](state, { response }) {
        state.refuges = response.data.refuges;
    },
    [MutationTypes.GET_REFUGE](state, { response }) {
        state.refuge = response.data;
        state.showRefuge = true;
        console.log(JSON.stringify(state.refuge));
    },
    [MutationTypes.CLEAR_STORY](state) {
        state.showRefuge = false;
        state.refuge = [];
    }
};
const actions = {
    [MutationTypes.GET_REFUGES]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-refuges' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_REFUGES, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Refuge List!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.GET_REFUGE]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-refuge' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_REFUGE, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Refuge!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.CREATE_REFUGE]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-refuge' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Refuge Created!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Can Not Create Refuge!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.DELETE_REFUGE]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/delete-refuge' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Refuge Deleted!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.CLEAR_REFUGE);
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Can Not Delete Refuge!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    }

};

export default {
    state,
    mutations,
    actions,
}