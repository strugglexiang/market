import send from '@/utils'
import api from '@/api'

//自己修改自己资料,不需要传入id
export function  updatePersonalDataAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/ownUpuser',
      method: 'post',
      data: query
    })
}

//自己获取自己资料
export function getUserInfoAjax(query) {
    return send({
      url: api.getApiUrl() + '/user/userInfo',
      method: 'get',
      params: query
    })
}


//验证密码
export function validateOldPassAjax(query) {
  return send({
    url: api.getApiUrl() + '/user/checkPwd',
    method: 'get',
    params: query
  })
}