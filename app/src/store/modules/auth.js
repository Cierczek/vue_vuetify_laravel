import Vue from 'vue';
import router from '@/router';
import {VueAuthenticate} from 'vue-authenticate';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
    baseUrl: process.env.VUE_APP_API_BASE_URL,
    tokenName: 'access_token',
    loginUrl: '/login',
    registerUrl: '/signup',
});

const requestOptions = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
};

export default {
    state: {
        isAuthenticated: localStorage.getItem(
            'vue-authenticate.vueauth_access_token') !== null,

        authToken: localStorage.getItem(
            'vue-authenticate.vueauth_access_token') ? localStorage.getItem(
            'vue-authenticate.vueauth_access_token') : null,
    },

    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },

        getAuthToken(state) {
            return state.authToken;
        },
    },

    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
        },
    },

    actions: {
        login(context, payload) {
            return vueAuth.login(payload.user, requestOptions).
                then(response => {
                    context.commit('isAuthenticated', {
                        isAuthenticated: vueAuth.isAuthenticated(),
                    });
                    router.push({name: 'admin'});
                });
        },

        register(context, payload) {
            return vueAuth.register(payload.user, requestOptions).
                then(response => {
                    context.commit('isAuthenticated', {
                        isAuthenticated: vueAuth.isAuthenticated(),
                    });
                    router.push({name: 'admin'});
                });
        },

        logout(context, payload) {
            return vueAuth.logout().then(response => {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuth.isAuthenticated(),
                });
                router.push({name: 'login'});
            });
        },
    },
};
