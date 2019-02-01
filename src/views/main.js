// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../assets/css/bootstrap.min.css';
import '../assets/js/bootstrap.min';
import Vue from 'vue';
import App from './App.vue';
import router from '../routes/routes';
Vue.config.productionTip = false;
var app = new Vue({
    router: router,
    render: function (h) { return h(App); }
}).$mount('#app');
//# sourceMappingURL=main.js.map