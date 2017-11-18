/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    refuges: []
};

const mutations = {
    [MutationTypes.GET_REFUGES](state, { response }) {
        state.refuges = response.data.refuges;
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
    [MutationTypes.CREATE_REFUGE]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-refuge' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            swal({
                                type: 'success',
                                title: 'Refuge Added!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Create Refuge!'
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