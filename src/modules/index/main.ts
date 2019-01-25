// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../assets/css/bootstrap.min.css'
import '../../assets/js/bootstrap.min'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from '../../routes/routes'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: routes
})

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
