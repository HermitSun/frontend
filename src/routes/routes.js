//加载模板文件
import Body from '../components/Body'
import List from '../components/List'
import Test from '../modules/test/Test'
//路由规则设置
export default [
    {
        path: '/',
        component: Body
    },
    {
        path: '/list',
        component: List
    },
    {
        path: '/login',
        component: Test
    }
]
