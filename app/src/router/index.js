import Vue from 'vue'
import Router from 'vue-router'
// ---------引入不需要权限的路由--------------
//--- 登录
import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import IndexZong from '@/views/index/indexZong'
import IndexFen from '@/views/index/indexFen'
// ---------引入需要权限动态生成的路由---------
//--用户管理
import allUsers from '@/views/userManagement/allUsers'
//--商品管理
import allGoods from '@/views/goodManagement/allGoods'
import goodType from '@/views/goodManagement/goodTypes'
//--权限管理
import userAuthoriry from '@/views/authority/userAuthoriry'
//--个人设置
import upPass from '@/views/setting/upPass'
import upPerson from '@/views/setting/upPerson'

// ----------- 总部私有  ---------
// 货单管理
import allIndepot from '@/views/depot/allIndepot'
import inDepot from '@/views/depot/inDepot'
import outDepot from '@/views/depot/outDepot'
import allOutdepot from '@/views/depot/allOutdepot'
// ----------- 洪山分部私有  ---------
//--进货管理
import allPurchases from '@/views/purchaseManagement/allPurchase'
import addPurchases from '@/views/purchaseManagement/addPurchase'
//--订单管理
import allOrder from '@/views/sold/allOrder'
import addOrder from '@/views/sold/addOrder'


Vue.use(Router)

// // --- 判断是加载总部首页还是加载分部首页
let indexComponent = null
import api from '@/api'
if(api.getPartName() === '总部'){
  indexComponent = IndexZong
}else{
  indexComponent = IndexFen
}

//--- 配置不需要权限的路由
let routes = [
  {
    path: '/login',
    name: '登陆',
    component: Login
  },
  // {
  //   path: '',
  //   component: Home,
  //   redirect: '/',
  //   name:"主页",
  //   children: [
  //      {
  //        path:'/',
  //        component:IndexFen,
  //        component:indexComponent,
  //        component:IndexZong,
  //        name:'首页'//二级路由默认展示首页
  //      },
  //   ]
  // },   
]
export default new Router({
  routes
})

//--- 导出正常路由
export const noAuRoutes = routes

//--- 导出总部需要动态生成的路由
export const zongChangRoutes = [
  {
    path: '',
    component: Home,
    redirect: '/',
    name:"主页",
    permissionCode:0,
    children: [
       {
         path:'/',
         component:IndexZong,
         name:'首页'//二级路由默认展示首页
       },
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:"用户管理",
    meta: { noCache : false },
    icon:'el-icon-rank',
    // hidden:true,
    permissionCode:2,
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
    permissionCode:3,
    children: [
       {
         path:'/goodMangement',
         component:allGoods,
         icon:'fa fa-gift',     
         name:'所有商品'
       },
       {
        path:'/goodType',
        component:goodType,
        icon:'fa fa-lightbulb-o',     
        name:'商品类型'
      },       
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:'货单管理',
    icon:'el-icon-sold-out',
    permissionCode:4,
    children: [
       {
         path:'/allIndepot',
         component:allIndepot,
         icon:'fa fa-cubes',     
         name:'所有进货单'
       },
       {
         path:'/inDepot',
         component:inDepot,
         icon:'fa fa-reply-all',     
         name:'添加进货单'
       },
       {
        path:'/allOutdepot',
        component:allOutdepot,
        icon:'fa fa-diamond',     
        name:'所有出货单'
       }, 
       {
        path:'/outDepot',
        component:outDepot,
        icon:'fa fa-chrome',     
        name:'添加出货单'
       },       
    ]
  },   
  {
    path: '/',
    component: Home,
    name:'权限管理',
    permissionCode:5,
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
    permissionCode:6,
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

//--- 导出洪山需要动态生成的路由
export const hongshanChangRoutes = [
  {
    path: '',
    component: Home,
    redirect: '/',
    name:"主页",
    permissionCode:0,
    children: [
       {
         path:'/',
         component:IndexFen,
         name:'首页'//二级路由默认展示首页
       },
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:"用户管理",
    icon:'el-icon-rank',
    // hidden:true,
    permissionCode:2,
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
    permissionCode:3,
    children: [
       {
         path:'/goodMangement',
         component:allGoods,
         icon:'fa fa-gift',     
         name:'所有商品'
       },
       {
        path:'/goodType',
        component:goodType,
        icon:'fa fa-lightbulb-o',     
        name:'商品类型'
      },       
    ]
  }, 
  {
    path: '/',
    component: Home,
    name:'进货管理',
    icon:'el-icon-sold-out',
    permissionCode:4,
    children: [
       {
         path:'/purchaseMangement',
         component:allPurchases,
         icon:'fa fa-snowflake-o',     
         name:'所有货单'
       },
       {
        path:'/addchaseMangement',
        component:addPurchases,
        icon:'fa fa-firefox',     
        name:'添加货单'
      },
    ]
  },   
  {
    path: '/',
    component: Home,
    name:'订单管理',
    icon:'el-icon-star-on',
    permissionCode:5,
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
    permissionCode:6,
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
    permissionCode:7,
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