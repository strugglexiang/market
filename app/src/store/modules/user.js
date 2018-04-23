import api from '@/api'
import { login , getUserInfo } from '@/ajax/login'
import { noAuRoutes, zongChangRoutes , hongshanChangRoutes} from '@/router'

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
    action_getUserInfo({ commit }){
        return new Promise((resolve, reject) => {
            getUserInfo()
            .then(res => {
                // console.log('我运行到了这里',res)
                // 需要存入用户其他信息的在这里操作
                 if(res.data.status === '1'){
                    resolve(res.data.result[0]) 
                 }else{
                    this.$message({
                        type:'error',
                        duration:1000,
                        message:res.data.msg
                    })
                 }
            })
            .catch(error => {
                reject(error)
            });
        });
    },
    //生成路由的action
    action_generateRoutes({ commit }, userInfo){
        // console.log('ssss',userInfo)
        // console.log('这里会是死循环吗')
        new Promise(resolve => {

            let allAuCode = []
            let afterFilterRoutes = []
            userInfo.authority.forEach((item,index,array) => {
                // console.log(item)
                 allAuCode.push(item.auCode)
            })
            //  console.log(allAuCode)
            //生成路由表，用到过滤器
            if(userInfo.isAdmin){
                if(api.getPartName() === '总部'){
                    afterFilterRoutes = zongChangRoutes
                }else if(api.getPartName() === '洪山桥分部'){
                    afterFilterRoutes = hongshanChangRoutes
                }
            }else{
                if(api.getPartName() === '总部'){
                        zongChangRoutes.forEach((item,index,array) => {
                        //    console.log(item)
                        // console.log(allAuCode,item)
                        // console.log(allAuCode.includes(item.permissionCode))
                            if(allAuCode.includes(item.permissionCode)){
                                // console.log(item)
                                afterFilterRoutes.unshift(item)
                            }
                        })
                }else if(api.getPartName() === '洪山桥分部'){
                    hongshanChangRoutes.forEach((item,index,array) => {
                        if(allAuCode.includes(item.permissionCode)){
                            afterFilterRoutes.unshift(item)
                        }
                    })
                }
            }            
            // console.log(afterFilterRoutes)
            // console.log('刷新了之后我还要运行',afterFilterRoutes)
            commit('mytation_generateRoutes', afterFilterRoutes);
            resolve();           
        })
    }
}

let mutations = {
    //生成的有权限的路由表mutation
    mytation_generateRoutes(state,routers){
        // console.log(routers)
        state.addRouters = routers;
        state.routers = noAuRoutes.concat(routers);    
        // console.log('我运行到这里',state.addRouters)    
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