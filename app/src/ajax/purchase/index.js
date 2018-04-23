import send from '@/utils'
import api from '@/api'


//get paramms 
//post data   
//delete params 
//put data  
// api.getApiUrl()
// 发送登录请求

// 获取进货单
export function  getPurAjax(query) {
    return send({
      url: api.getApiUrl() + '/purchase/getPurchase',
      method: 'get',
      params: query
    })
}

//添加进货单
export function  addPurAjax(query) {
    return send({
      url: api.getApiUrl() + '/purchase/addPurchase',
      method: 'post',
      data: query
    })
}

//修改进货单
export function  updatePurAjax(query) {
    return send({
      url: api.getApiUrl() + '/purchase/upPurchase',
      method: 'post',
      data: query
    })
}

//删除进货单
export function  delPurAjax(query) {
    return send({
      url: api.getApiUrl() + '/purchase/delPurchase',
      method: 'get',
      params: query
    })
}