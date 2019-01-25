import Vue from 'vue'
import Router from 'vue-router'
//加载模板文件
import Login from '../views/login/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Home from '../views/home/Home.vue'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
})
