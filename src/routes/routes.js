import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "utils/token.ts";
// 加载模板文件
import NotFound from '@/views/404.vue'
import StudentLogin from '@/views/login/StudentLogin.vue'
import Admin from '@/views/admin/Admin.vue'
import SetProfessions from '@/views/admin/enrollment/SetProfessions.vue'
import JuniorAll from '@/views/admin/check/JuniorAll.vue'
import JuniorFailed from '@/views/admin/check/JuniorFailed.vue'
import JuniorPassed from '@/views/admin/check/JuniorPassed.vue'
import SeniorAll from '@/views/admin/check/SeniorAll.vue'
import SeniorFailed from '@/views/admin/check/SeniorFailed.vue'
import SeniorPassed from '@/views/admin/check/SeniorPassed.vue'
import EditMessage from '@/views/admin/publish/EditMessage.vue'
import Application from '@/views/student/apply/Application.vue';
import UploadAttachment from '@/views/student/apply/UploadAttachment.vue';
import JuniorCheck from '@/views/student/check/JuniorCheck.vue';
import JuniorReply from '@/views/student/check/JuniorReply.vue';
import SeniorCheck from '@/views/student/check/SeniorCheck.vue';
import Student from '@/views/student/Student.vue';

Vue.use(Router);

const router = new Router({
    modes: 'history',
    routes: [
        {
            path: '/',
            name: 'StudentLogin',
            component: StudentLogin,
            meta: {
                icon: '',
                title: '登錄'
            }
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            meta: {
                icon: '',
                title: '页面不存在'
            }
        },
        {
            path: '/admin',
            name: '首页',
            component: Admin,
            iconClass: 'el-icon-menu',
            hidden: true,
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/admin',
            name: '招生设置',
            component: Admin,
            iconClass: 'el-icon-date',//图标
            leaf: true,
            children: [
                {path: '/admin/set-profess', component: SetProfessions, name: '招生专业'}
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/admin',
            component: Admin,
            name: '初次审核',
            iconClass: 'el-icon-edit',
            children: [
                {path: '/admin/junior-not-pass-stu', component: JuniorFailed, name: '未通过审核'},
                {path: '/admin/junior-passed-stu', component: JuniorPassed, name: '已通过审核'},
                {path: '/admin/junior-all-stu', component: JuniorAll, name: '全部审核信息'}
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/admin',
            component: Admin,
            name: '面试审核',
            iconClass: 'el-icon-edit-outline',
            children: [
                {path: '/admin/senior-not-pass-stu', component: SeniorFailed, name: '未通过面试'},
                {path: '/admin/senior-passed-stu', component: SeniorPassed, name: '已通过面试'},
                {path: '/admin/senior-all-stu', component: SeniorAll, name: '全部面试信息'}
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/admin',
            component: Admin,
            name: '发布',
            iconClass: 'el-icon-message',
            leaf: true,
            children: [
                {path: '/admin/edit-msg', component: EditMessage, name: '发布结果'},
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/student',
            name: '首頁',
            component: Student,
            iconClass: 'el-icon-menu',
            leaf: true,
            meta: {
                icon: '',
                title: '南京大學台灣免試生系統'
            }
        },
        {
            path: '/student',
            name: '免試申請',
            component: Student,
            iconClass: 'el-icon-date',//图标
            children: [
                {path: '/student/application', component: Application, name: '填寫申請表'},
                {path: '/student/upload-attach', component: UploadAttachment, name: '上傳附件'}
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '/student',
            component: Student,
            name: '結果查看',
            iconClass: 'el-icon-edit',
            children: [
                {path: '/student/junior-check', component: JuniorCheck, name: '初審結果'},
                {path: '/student/senior-check', component: SeniorCheck, name: '面試結果'}
            ],
            meta: {
                icon: '',
                title: '南京大学台湾免试生管理系统'
            }
        },
        {
            path: '*',
            redirect: '/',
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
