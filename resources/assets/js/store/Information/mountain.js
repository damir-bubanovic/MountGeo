/**
 * Mountain Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    mountains: [],
    mountain_id: null,
};

const mutations = {
    [MutationTypes.GET_MOUNTAINS](state, { response }) {
        state.mountains = response.data.mountains;
    },
    [MutationTypes.MOUNTAIN_ID](state, data) {
        state.mountain_id = data.mountain_id;
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
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-mountain' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 201) {
                            swal({
                                type: 'success',
                                title: 'Mountain Added!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Mountain Not Added! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    /**
     * Selected Mountain Id & Api Get Stories
     * > on selected mountain id get stories from database & show them
     */
    [MutationTypes.MOUNTAIN_ID]({ commit }, data) {
        commit(MutationTypes.MOUNTAIN_ID, data);
    }
};

export default {
    state,
    mutations,
    actions,
}