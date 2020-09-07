import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */  '../views/auth/Login'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */  '../views/auth/Register'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "admin" */  '../views/admin/AdminLayout'),
        children: [
            {
                path: 'roles',
                name: 'roles',
                component: () => import(/* webpackChunkName: "roles" */  '../views/admin/services/Roles'),
            }],
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
