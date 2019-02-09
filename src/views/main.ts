// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import '../assets/theme/theme-NJUpurple/index.css'
import Vue from 'vue'
// @ts-ignore
import App from './App'
import router from '../routes/routes'

Vue.config.productionTip = false
Vue.use(ElementUI)

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
