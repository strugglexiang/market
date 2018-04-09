import send from '@/utils'

//获取用户权限
export function getAuthority(query) {
    return send({
      url:'/user/login',
      method: 'get',
      params: query
    })
}