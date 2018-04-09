import Vue from 'vue'
import App from './App'
//引入路由
import router from './router'
// console.log(router)
//引入vuex
import store from './store'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui'
//引入font-awesome字体图标库
import 'font-awesome/css/font-awesome.min.css';

//调试功能
Vue.config.productionTip = false
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
     if(to.path === '/login'){
       sessionStorage.removeItem('token')
       next()
     }else{
       let token = sessionStorage.getItem('token')
       if(token){
          //  if(store.getters.personAu.length === 0){
          //     // console.log('我运行到了这里')
          //     store.dispatch('action_getUserInfo',sessionStorage.getItem('id'))
          //     .then(res => {
          //         store.dispatch('action_generateRoutes', res).then(() => { // 生成可访问的路由表
          //           router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //           // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          //         })
          //     })
          //  }else{
          //    next()
          //  }
          next()
       }else{
          // console.log('我运行了这里')       
          next({
            path:"/login"
          })
       }
     }
     
})

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
