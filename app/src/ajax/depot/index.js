import send from '@/utils'
import api from '@/api'


//get paramms 
//post data   
//delete params 
//put data  
// api.getApiUrl()
// 发送登录请求

// --------------------------进货
// 获取进货单
export function  getIndepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/indepot/getIndepot',
      method: 'get',
      params: query
    })
}

//添加进货单
export function  addIndepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/indepot/addIndepot',
      method: 'post',
      data: query
    })
}

//修改进货单
export function  updateIndepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/indepot/upIndepot',
      method: 'post',
      data: query
    })
}

//删除进货单
export function  delIndepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/indepot/delIndepot',
      method: 'get',
      params: query
    })
}

// -------------------------- 出货
// 获取出货单
export function  getOutdepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/outdepot/getOutdepot',
      method: 'get',
      params: query
    })
}

//添加出货单
export function  addOutdepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/outdepot/addOutdepot',
      method: 'post',
      data: query
    })
}

//修改出货单
export function  updateOutdepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/outdepot/upOutdepot',
      method: 'post',
      data: query
    })
}

//删除出货单
export function  delOutdepotAjax(query) {
    return send({
      url: api.getApiUrl() + '/outdepot/delOutdepot',
      method: 'get',
      params: query
    })
}