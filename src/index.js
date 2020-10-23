import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Bar from './views/Bar.vue';
import Foo from './views/Foo.vue';
import ForecastChart from './views/ForecastChart.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/currentWeather/:location', component: Foo },
        { path: '/forecastChart/:location', component: ForecastChart }
    ]
})


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})