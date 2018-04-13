import Vue from 'vue'
import Vuex from 'vuex'

//引入user(登录模块的store)
import user from './modules/user'
//引入布局store
import home from './modules/home'
// tagview 
import tagsView from './modules/tagsView'
Vue.use(Vuex)



let getters = {
    personAu(state){
        return state.user.addRouters
    },//生成的有权限的路由的表
    token(state){
        return state.user.token
    },
    sideStatu(state){
        // console.log(state)
        return !state.home.sideStatu
    },
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,    
}

export default  new Vuex.Store({
    modules:{
      user,
      home,
      tagsView,
    },
    getters,
})

