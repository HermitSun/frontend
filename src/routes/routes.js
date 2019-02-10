import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "../assets/utils/token.ts";
// 加载模板文件
import NotFound from '../views/404.vue'
import StudentLogin from '../views/login/StudentLogin.vue'
import Admin from '../views/admin/Admin.vue'
import StartEnrollment from '../views/admin/enrollment/StartEnrollment.vue'
import SetProfessions from '../views/admin/enrollment/SetProfessions.vue'
import NotPassStudents from '../views/admin/check/NotPassStudents.vue'
import PassedStudents from '../views/admin/check/PassedStudents.vue'
import AllStudents from '../views/admin/check/AllStudents.vue'
import EditMessage from '../views/admin/publish/EditMessage.vue'
import PublishResult from '../views/admin/publish/PublishResult.vue'
import EndEnrollment from '../views/admin/enrollment/EndEnrollment.vue'
import Home from '../views/home/Home.vue'

Vue.use(Router);

const router = new Router({
    modes: 'history',
    routes: [
        {
            path: '/',
            name: 'StudentLogin',
            component: StudentLogin,
            hidden: true,
            meta: {
                icon: '',
                title: '登錄'
            }
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            hidden: true,
            meta: {
                icon: '',
                title: '页面不存在'
            }
        },
        {
            path: '/admin',
            name: '首页',
            component: Admin,
            hidden: true,
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/admin',
            component: Admin,
            name: '招生',
            iconClass: 'el-icon-date',//图标
            children: [
                {path: '/admin/start-enroll', component: StartEnrollment, name: '开启本次招生'},
                {path: '/admin/set-profess', component: SetProfessions, name: '设置招生专业'},
                {path: '/admin/end-enroll', component: EndEnrollment, name: '结束本次招生'}
            ]
        },
        {
            path: '/admin',
            component: Admin,
            name: '审核',
            iconClass: 'el-icon-edit-outline',
            children: [
                {path: '/admin/not-pass-stu', component: NotPassStudents, name: '未通过'},
                {path: '/admin/passed-stu', component: PassedStudents, name: '已通过'},
                {path: '/admin/all-stu', component: AllStudents, name: '全部'}
            ]
        },
        {
            path: '/admin',
            component: Admin,
            name: '发布',
            iconClass: 'el-icon-message',
            // leaf: true,//只有一个节点
            children: [
                {path: '/admin/edit-msg', component: EditMessage, name: '编辑消息'},
                {path: '/admin/pub-res', component: PublishResult, name: '发布结果'}
            ]
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true
        },
        {
            path: '*',
            redirect: '/',
            hidden: true
        }
    ]
});

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'StudentLogin';

// 跳转之前
router.beforeEach((to, from, next) => {
    const token = getToken();
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
        });
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next(); // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next();// 跳转
    } else {
        if (token) {
            next(); // 跳转
        } else {
            next({
                name: LOGIN_PAGE_NAME
            });
        }
    }
});

// 跳转之后
router.afterEach(to => {
    //
});

export default router;
