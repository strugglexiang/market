import send from '@/utils'
import api from '@/api'

//获取用户权限
export function getAuthorityAjax(query) {
    return send({
      url:api.getApiUrl() + '/authority/getAuthority',
      method: 'get',
      params: query
    })
}

//授权
export function giveAuthorityAjax(query) {
  return send({
    url:api.getApiUrl() + '/authority/giveAuthority',
    method: 'post',
    data: query
  })
}

