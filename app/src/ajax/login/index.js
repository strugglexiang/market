import send from '@/utils'
import api from '@/api'
//get paramms 
//post data   
//delete params 
//put data  
// api.getApiUrl()
// 发送登录请求
export function login(query) {
    return send({
      url: api.getApiUrl() + '/user/login',
      method: 'post',
      data: query
    })
}

export function getUserInfo(query) {
  return send({
    url: api.getApiUrl() + '/user/userInfo',
    method: 'get',
    data: query
  })
}

