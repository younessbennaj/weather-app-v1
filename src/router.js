import Vue from 'vue';
import Router from 'vue-router';
import App from './app.vue';
import About from './about.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/currentWeather/:location', name: 'currentWeather', component: App, exact: true }
    ]
})