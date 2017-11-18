/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    stories: []
};

const mutations = {
    [MutationTypes.GET_STORIES](state, { response }) {
        state.stories = response.data.stories;
    }
};
const actions = {
    [MutationTypes.GET_STORIES]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-stories' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_STORIES, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Stories List!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.CREATE_STORY]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-story' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Create Story!'
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