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
import 'font-awesome/css/font-awesome.css'

//引入自写公共样式
import '@/assets/css/reset.css'

//调试功能
Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    //  console.log('我触发了',to.path,to)
     if(to.path === '/login'){
       sessionStorage.removeItem('token')
       next()
     }else{
       let token = sessionStorage.getItem('token')
       if(token){
           if(store.getters.personAu.length === 0){
              // console.log('我运行到了这里',store.getters.personAu.length)
              store.dispatch('action_getUserInfo')
              .then(res => {
                  store.dispatch('action_generateRoutes', res).then(() => { // 生成可访问的路由表
                    // console.log('我运行到这里出了错',res)
                    // console.log(store.getters.personAu)
                    // console.log(store.state.user.addRouters)
                    // console.log('用户手动刷新我还增加动态路由',store.getters.personAu.length)
                    router.addRoutes(store.getters.personAu) // 动态添加可访问路由表
                    // next()
                    // console.log('我运行到这里出了错')
                    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  })
              })
              .catch(error => {
                   console.log(error)
              })
           }else{
             next()
           }
          // next()
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

// 全局混入
Vue.mixin({
   methods:{
     jieliu(method,arg){
       clearTimeout(method.timer); 
       method.timer=setTimeout(function(){ 
           method(arg); 
       },150);        
     }
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
