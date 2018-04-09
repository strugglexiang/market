import Vue from 'vue'
import Router from 'vue-router'
// ---------引入不需要权限的路由--------------
//--- 登录
import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Index from '@/views/index/Index'
// ---------引入需要权限动态生成的路由---------

Vue.use(Router)


//--- 配置不需要权限的路由
let routes = [
  {
    path: '/login',
    name: '登陆',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
       {
         path:'',
         component:Index,
         name:'首页'//二级路由默认展示首页
       }
    ]
  },

]
export default new Router({
  routes
})

//--- 导出正常路由
export const noAuRoutes = routes

//--- 导出动态生成的路由
export const changRoutes = [

]