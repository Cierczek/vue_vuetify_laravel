import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axiosApi from 'axios';

const axios = axiosApi.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ store.getters.getAuthToken
    },
});

//Use the window object to make it available globally.
window.axios = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next({
                name: 'login',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
