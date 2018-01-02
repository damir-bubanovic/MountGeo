/**
 * Route Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    uploadedFile: {
        'fileStored': '',
        'fileStoredExt': '',
    },
    routes: [],
    route: [],
    showRoute: false,
    showFullRoute: false,
    fullRoute: []
};

const mutations = {
    /**
     * Uploaded GPS File in Storage Location
     * > for later processing gps data from file
     */
    [MutationTypes.FILE_STORED](state, { response }) {
        state.uploadedFile.fileStored = response.data.fileStored;
        state.uploadedFile.fileStoredExt = response.data.fileStoredExt;
    },




    [MutationTypes.GET_ROUTES](state, { response }) {
        state.routes = response.data.routes;
    },




    [MutationTypes.GET_ROUTE](state, { response }) {
        state.route = response.data;
        state.showRoute = true;
    },




    [MutationTypes.GET_FULL_ROUTE](state, { response }) {
        state.fullRoute = response.data;
        state.showFullRoute = true;
    },




    [MutationTypes.CLEAR_ROUTE](state) {
        state.showRoute = false;
        state.route = [];
    },




    [MutationTypes.CLEAR_FULL_ROUTE](state) {
        state.fullRoute = [];
        state.showFullRoute = false;
    }
};
const actions = {
    [MutationTypes.FILE_KML]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-file-kml' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'File Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'File Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.ROUTE_KML]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-kml' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Route Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        commit('LOADING');
                        reject();
                    })
        })
    },




    [MutationTypes.FILE_GPX]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-file-gpx' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'File Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'File Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.ROUTE_GPX]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-gpx' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Route Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        commit('LOADING');
                        reject();
                    })
        })
    },




    [MutationTypes.ROUTE_CUSTOM]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-custom' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.CLEAR_USER_PATH_MARKERS);
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Route Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        commit(MutationTypes.CLEAR_USER_PATH_MARKERS);
                        reject();
                    })
        })
    },




    [MutationTypes.UPDATE_ROUTE]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/update-route' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            swal({
                                type: 'success',
                                title: 'Route Edited!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.LOADING_OFF);
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Can Not Edit Route!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.GET_ROUTES]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-routes' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_ROUTES, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Routes Not Loaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.GET_ROUTE]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-route' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_ROUTE, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Can Not Retreive Route!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.GET_FULL_ROUTE]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-full-route' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_FULL_ROUTE, { response });
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Route Not Loaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.DELETE_ROUTE]({commit}, data) {
        commit(MutationTypes.LOADING_ON);
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/delete-route' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.LOADING_OFF);
                            swal({
                                type: 'success',
                                title: 'Route Deleted!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.CLEAR_ROUTE);
                            resolve();
                        }
                    })
                    .catch((error) => {
                        commit(MutationTypes.LOADING_OFF);
                        swal({
                            type: 'error',
                            title: 'Can Not Delete Route!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },




    [MutationTypes.CLEAR_ROUTE]({commit}) {
        commit(MutationTypes.CLEAR_ROUTE);
    },




    [MutationTypes.CLEAR_FULL_ROUTE]({commit}) {
        commit(MutationTypes.CLEAR_FULL_ROUTE);
    }

};

export default {
    state,
    mutations,
    actions,
}