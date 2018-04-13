import send from '@/utils'
import api from '@/api'

//get paramms 
//post data   
//delete params 
//put data  
// api.getApiUrl()
// 发送登录请求

// 获取所有用户
export function  getUserAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/getUsers',
      method: 'get',
      params: query
    })
}

//添加用户
export function  addUserAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/createWorker',
      method: 'post',
      data: query
    })
}

//修改用户
export function  updateUserAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/updateUser',
      method: 'post',
      data: query
    })
}

//删除用户 
export function  delUserAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/delUser',
      method: 'get',
      params: query
    })
}