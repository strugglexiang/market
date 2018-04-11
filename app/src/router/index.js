import Vue from 'vue'
import Router from 'vue-router'
// ---------引入不需要权限的路由--------------
//--- 登录
import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import Index from '@/views/index/Index'
// ---------引入需要权限动态生成的路由---------
//--用户管理
import allUsers from '@/views/userManagement/allUsers'
//--商品管理
import allGoods from '@/views/goodManagement/allGoods'
//--进货管理
import allPurchases from '@/views/purchaseManagement/allPurchase'
//--订单管理
import allOrder from '@/views/sold/allOrder'
import addOrder from '@/views/sold/addOrder'
//--权限管理
import userAuthoriry from '@/views/authority/userAuthoriry'
//--个人设置
import upPass from '@/views/setting/upPass'
import upPerson from '@/views/setting/upPerson'

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
    name:"主页",
    children: [
       {
         path:'',
         component:Index,
         name:'首页'//二级路由默认展示首页
       },
    ]
  },  
  //
  {
    path: '/',
    component: Home,
    name:"用户管理",
    icon:'el-icon-rank',
    // hidden:true,
    children: [
       {
         path:'/userMangement',
         icon:'fa fa-globe',
         component:allUsers,
         name:'所有用户'
       },
    ]
  },
  {
    path: '/',
    component: Home,
    name:'商品管理',
    icon:'el-icon-sold-out',
    children: [
       {
         path:'/goodMangement',
         component:allGoods,
         icon:'fa fa-gift',     
         name:'所有商品'
       },
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:'进货管理',
    icon:'el-icon-sold-out',
    children: [
       {
         path:'/purchaseMangement',
         component:allPurchases,
         icon:'fa fa-snowflake-o',     
         name:'所有货单'
       },
    ]
  },   
  {
    path: '/',
    component: Home,
    name:'订单管理',
    icon:'el-icon-star-on',
    children: [
       {
         path:'/orderMangement',
         component:allOrder,
         icon:'el-icon-edit-outline',   
        //  hidden:true,      
         name:'所有订单'
       },
       {
        path:'/addOrder',
        component:addOrder,
        icon:'el-icon-rank',   
        name:'添加订单'
      },       
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:'权限管理',
    icon:'el-icon-upload',
    children: [
       {
         path:'/authorityMangement',
         component:userAuthoriry,
         icon:'fa fa-hourglass',   
         name:'用户权限'
       },    
    ]
  },  
  {
    path: '/',
    component: Home,
    name:'个人设置',
    icon:'el-icon-setting',
    children: [
       {
         path:'/upPerson',
         component:upPerson,
         icon:'fa fa-user-circle-o',   
         name:'修改资料'
       }, 
       {
        path:'/upPass',
        component:upPass,
        icon:'fa fa-lock',   
        name:'修改密码'
      },            
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