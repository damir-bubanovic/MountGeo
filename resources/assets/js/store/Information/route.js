/**
 * Route Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';


const state = {
    loading: false,
    uploadedFile: {
        'fileStored': '',
        'fileStoredExt': '',
    },
    routes: [],
    showFullRoute: false,
    fullRoute: []
};

const mutations = {
    /**
     * Loading Spinner
     */
    [MutationTypes.LOADING](state) {
        state.loading = !state.loading;
    },
    /**
     * Uploaded GPS File Storage Location
     * > for later processing gps data from file
     */
    [MutationTypes.FILE_STORED](state, { response }) {
        state.uploadedFile.fileStored = response.data.fileStored;
        state.uploadedFile.fileStoredExt = response.data.fileStoredExt;
    },
    /**
     * Get Route List
     */
    [MutationTypes.GET_ROUTES](state, { response }) {
        state.routes = response.data.routes;
    },
    /**
     * Get Full Route
     */
    [MutationTypes.GET_FULL_ROUTE](state, { response }) {
        state.fullRoute = response.data;
        state.showFullRoute = true;
    }
};
const actions = {
    [MutationTypes.FILE_KML]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-file-kml' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
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
                        swal({
                            type: 'error',
                            title: 'File Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.ROUTE_KML]({commit}, data) {
        commit('LOADING');
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-kml' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            commit('LOADING');
                            resolve();
                        }
                    })
                    .catch((error) => {
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
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-file-gpx' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
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
                        swal({
                            type: 'error',
                            title: 'File Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        reject();
                    })
        })
    },
    [MutationTypes.ROUTE_GPX]({commit}, data) {
        commit('LOADING');
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-gpx' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.FILE_STORED, { response });
                            commit('LOADING');
                            resolve();
                        }
                    })
                    .catch((error) => {
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
        commit('LOADING');
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/create-route-custom' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            swal({
                                type: 'success',
                                title: 'Route Uploaded!',
                                showConfirmButton: false,
                                timer: 1800
                            }).catch(swal.noop)
                            commit(MutationTypes.CLEAR_USER_PATH_MARKERS);
                            commit('LOADING');
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Route Not Uploaded! Try Again!'
                        }).catch(swal.noop)
                        commit(MutationTypes.CLEAR_USER_PATH_MARKERS);
                        commit('LOADING');
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
    }

};

export default {
    state,
    mutations,
    actions,
}