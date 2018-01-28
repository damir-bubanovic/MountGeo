/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    stories: [],
    showStory: false,
    story: [],
};

const mutations = {
    [MutationTypes.GET_STORIES](state, { response }) {
        state.stories = response.data.stories;
    },




    [MutationTypes.GET_STORY](state, { response }) {
        state.story = response.data.story;
        state.showStory = true;
    },




    [MutationTypes.CLEAR_STORY](state) {
        state.showStory = false;
        state.story = [];
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




    [MutationTypes.GET_STORY]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-story' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_STORY, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Story!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.CREATE_STORY]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-story' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            swal({
                                type: 'success',
                                title: 'Story Created!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.LOADING_OFF);
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
                                title: 'Can Not Create Story!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.UPDATE_STORY]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/update-story' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            swal({
                                type: 'success',
                                title: 'Story Edited!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.LOADING_OFF);
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
                                title: 'Can Not Edit Story!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.DELETE_STORY]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/delete-story' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Story Deleted!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.CLEAR_STORY);
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
                                title: 'Can Not Delete Story!'
                            }).catch(swal.noop)
                        }
                        reject(error);
                    })
        })
    },




    [MutationTypes.CLEAR_STORY]({commit}) {
        commit(MutationTypes.CLEAR_STORY);
    }
};

export default {
    state,
    mutations,
    actions,
}