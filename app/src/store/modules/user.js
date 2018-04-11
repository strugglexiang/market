import { getAuthority } from '@/ajax/authority'
import { login , getUserInfo } from '@/ajax/login'
import { noAuRoutes, changRoutes } from '@/router'

let state = {
    token:123123123,
    routers: noAuRoutes,//正常路由
    addRouters: [],   // 生成的有权限的路由的表
}

let actions = {
    //用户登录的action
    action_loginByUserName({ commit }, userInfo) {
        // console.log(userInfo)
        const username = userInfo.userName.trim()
        return new Promise((resolve, reject) => {
            let obj = {
                userName: userInfo.userName,
                password: userInfo.password
            }
            login(obj)
            .then(res => {
                if(res.data.status === '1'){
                    const data = res.result
                    // console.log('我运行到了这里')
                    commit('mutation_savetoken',res.data.token)
                    sessionStorage.setItem('token',res.data.token)
                    // sessionStorage.setItem('id', res.result['_id'])
                }
                // console.log(sessionStorage)
                resolve(res)
            })
            .catch(error => {
                reject(error)
            });
        });
    },        
    //获取用户信息的action(用来获取用户权限的)
    action_getUserInfo({ commit },userId){
        return new Promise((resolve, reject) => {
            let obj = {
               id:userId
            }
            getUserInfo(obj)
            .then(res => {
                // console.log('我运行到了这里')
                // 需要存入用户其他信息的在这里操作
                 resolve(res.result.authority) 
            })
            .catch(error => {
                reject(error)
            });
        });
    },
    //生成路由的action
    action_generateRoutes({ commit }, au){
        new Promise(resolve => {
            //生成路由表，用到过滤器
            afterFilterRoutes = changRoutes.filters((item,index,array) => {
                // 返回true代表过滤掉了
                return true
            })
            console.log('生成的有权限的路由表',afterFilterRoutes)
            commit('mytation_action_generateRoutes', afterFilterRoutes);
            resolve();           
        })
    }
}

let mutations = {
    //生成的有权限的路由表mutation
    mytation_action_generateRoutes(state,routers){
        state.addRouters = routers;
        state.routers = noAuRoutes.concat(routers);        
    },
    //存入token的mutaion
    mutation_savetoken(state,token){
        state.token = token
    }
}

export default {
    state,
    actions,
    mutations,
}