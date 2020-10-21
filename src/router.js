import Vue from 'vue';
import Router from 'vue-router';
import App from './app.vue';
import About from './about.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', name: 'home', component: App, exact: true },
        { path: '/about', name: 'about', component: About, exact: true }
    ]
})