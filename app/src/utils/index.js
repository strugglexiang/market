import axios from 'axios' //引用axios
import router from '@/router'
import api from '@/api'
import ElementUI from 'element-ui';
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
    // baseURL: api.getApiUrl() , // api的base_url
    timeout: 5000 // 请求超时时间
})
// console.log(service)
// request拦截器
service.interceptors.request.use(config => {
    // console.log('我要拦截请求了')
    if (sessionStorage.getItem('token')) {
        config.headers.Authorization = sessionStorage.getItem("token");
    }
    return config
},err => {
    console.log('request拦截器错误',error) // for debug
    return Promise.reject(error)
})

//res拦截器
service.interceptors.response.use(response => {
    let res = response.data
    // console.log('我拦截了', res)
            // Message({
            //     message: res.msg,
            //     type: 'error',
            //     duration: 2 * 1000
            // })
            // switch(res.status){
            //     case '407':
            //     Message({
            //         message: res.msg,
            //         type: 'warning',
            //         duration: 2 * 1000
            //     })  //请求未携带token      
            //     router.replace({
            //         path: 'login'
            //     })  
            //     break;
            //     case '406':
            //     Message({
            //         message: res.msg,
            //         type: 'warning',
            //         duration: 2 * 1000
            //     }) //token解析失败，通知后端管理人员检查 
            //     router.replace({
            //         path: 'login'
            //     })            
            //     break;
            //     case '405':
            //     Message({
            //         message: res.msg,
            //         type: 'warning',
            //         duration: 2 * 1000
            //     }) //token失效,请重新登录  
            //     router.replace({
            //         path: 'login'
            //     })        
            //     break;            
            // }
    return response
} ,error => {
    console.log('response拦截器错误' , error,error.response)// for debug
    // console.log('token失效是运行这里吗')
    Message({
      message: error.response.data.msg,
      type: 'warning',
      duration: 2 * 1000
    })
    router.replace({
        path: 'login'
    })     
    return Promise.reject(error)
})


export default service