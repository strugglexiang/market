import send from '@/utils'

//get paramms 
//post data   
//delete params 
//pot data  
// 发送登录请求
export function login(query) {
    return send({
      url:'/user/login',
      method: 'post',
      data: query
    })
}

export function getUserInfo(query) {
  return send({
    url:'/user/userInfo',
    method: 'get',
    params: query
  })
}

