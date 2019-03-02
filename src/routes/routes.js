import Vue from 'vue';
import Router from 'vue-router';
import {getAdminToken, getStudentToken} from "../utils/token.ts";
// 加载模板文件
import NotFound from '@/views/404.vue'
import MobilePrompt from '@/views/MobilePrompt.vue';
import StudentLogin from '@/views/login/StudentLogin.vue';
import Register from '@/views/register/Register.vue';
import ForgetPassword from '@/views/login/ForgetPassword.vue';
import Admin from '@/views/admin/Admin.vue';
import Settings from '@/views/admin/Settings.vue';
import SetProfessions from '@/views/admin/enrollment/SetProfessions.vue';
import JuniorAll from '@/views/admin/check/JuniorAll.vue';
import JuniorFailed from '@/views/admin/check/JuniorFailed.vue';
import JuniorPassed from '@/views/admin/check/JuniorPassed.vue';
import SeniorAll from '@/views/admin/check/SeniorAll.vue';
import SeniorFailed from '@/views/admin/check/SeniorFailed.vue';
import SeniorPassed from '@/views/admin/check/SeniorPassed.vue';
import EditMessage from '@/views/admin/publish/EditMessage.vue';
import ViewMessage from '@/views/admin/publish/ViewMessage.vue';
import Application from '@/views/student/apply/Application.vue';
import UploadAttachment from '@/views/student/apply/UploadAttachment.vue';
import JuniorCheck from '@/views/student/check/JuniorCheck.vue';
import SeniorCheck from '@/views/student/check/SeniorCheck.vue';
import Student from '@/views/student/Student.vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
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
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                icon: '',
                title: '註冊'
            }
        },
        {
            path: '/forget-password',
            name: 'ForgetPassword',
            component: ForgetPassword,
            meta: {
                icon: '',
                title: '忘記密碼'
            }
        },
        {
            path: '/cannot-reach',
            name: 'CannotReach',
            component: MobilePrompt,
            meta: {
                icon: '',
                title: '無法訪問'
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
            redirect: '/admin/set-profess',
            component: Admin,
            iconClass: 'el-icon-menu',
            hidden: true,
            children: [
                {path: '/admin/settings', component: Settings, name: '相关设置'}
            ],
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
            name: '发布结果',
            iconClass: 'el-icon-message',
            children: [
                {path: '/admin/edit-msg', component: EditMessage, name: '发送消息'},
                {path: '/admin/view-msg', component: ViewMessage, name: '已发消息'}
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
                title: '南京大學台灣免試生系統'
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
                title: '南京大學台灣免試生系統'
            }
        },
        {
            path: '*',
            redirect: '/',
        }
    ]
});

// 不屏蔽页面的路由name
const PASSES = ['StudentLogin', 'Register', 'ForgetPassword', 'CannotReach', '404'];
// 学生所有页面的name
const STUDENT_PAGES = ['首頁', '填寫申請表', '上傳附件', '初審結果', '面試結果'];
// 管理员所有页面的name
const ADMIN_PAGES = ['招生专业',
    '未通过审核', '已通过审核', '全部审核信息',
    '未通过面试', '已通过面试', '全部面试信息',
    '发送消息', '已发消息'];

// 跳转之前
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (window.screen.width <= 600) {
        next({
            name: 'CannotReach'
        })
    } else {
        let stuToken = getStudentToken();
        let adminToken = getAdminToken();
        if (!stuToken && !adminToken) {
            if (PASSES.indexOf(to.name) >= 0) {
                next();
            } else {
                next({
                    name: 'StudentLogin'
                });
            }
        } else if (stuToken && !adminToken) {
            if (ADMIN_PAGES.indexOf(to.name) >= 0) {
                next({
                    name: 'StudentLogin'
                });
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

export default router;
