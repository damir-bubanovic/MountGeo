/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';

const state = {
    showLogRegLinks: true,
    username: ''
};

const mutations = {
    [MutationTypes.LOGIN](state, { response }) {
        state.username = response.data.user.name;
    }
};
const actions = {
    [MutationTypes.WELCOME_LOGIN_REGISTER_PAGE]({commit}) {
        /**
         * For Email Authentification make register page visible
         */
    },



    [MutationTypes.REGISTER]({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post('api/register', data,
                { headers: {'X-Requested-With': 'XMLHttpRequest'} })
                    .then((response) => {
                        swal({
                            type: 'success',
                            title: 'Success!',
                            showConfirmButton: false,
                            timer: 1800
                        }).catch(swal.noop)
                        resolve();
                    })
                    .catch((error) => {
                        var rawErrors = error.response.data;
                        var errors = [];

                        for (var key in rawErrors) {
                            if (rawErrors.hasOwnProperty(key)) {
                                errors.push(rawErrors[key]);
                            }
                        }
                        swal({
                            type: 'error',
                            title: 'Failure!',
                            text: errors,
                            showConfirmButton: true,
                        }).catch(swal.noop)

                        reject();
                    })
        })
    },



    [MutationTypes.LOGIN]({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post('api/login', data,
                { headers: {'X-Requested-With': 'XMLHttpRequest'} })
                    .then((response) => {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        commit(MutationTypes.LOGIN, { response });
                        resolve();
                    })
                    .catch((error) => {
                        reject();
                    })
        })
    },



    [MutationTypes.LOGOUT]({commit}) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/logout' + '?token=' + token)
                    .then((response) => {
                        if(response.status == 200) {
                            localStorage.removeItem('token');
                            resolve();
                        }
                    })
                    .catch((error) => {
                        localStorage.removeItem('token');
                        resolve();
                    })
        })
    }

};

export default {
    state,
    mutations,
    actions,
}