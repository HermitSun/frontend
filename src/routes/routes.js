import Vue from 'vue'
import Router from 'vue-router'
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
export default new Router({
    modes: 'history',
    routes: [
        {
            path: '/',
            name: 'StudentLogin',
            component: StudentLogin,
            hidden: true
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            hidden: true
        },
        {
            path: '/admin',
            name: '首页',
            component: Admin,
            hidden: true
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
})
