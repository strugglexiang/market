import send from '@/utils'
import api from '@/api'


//get paramms 
//post data   
//delete params 
//put data  
// api.getApiUrl()
// 发送登录请求

// 获取所有订单
export function  getOrderAjax(query) {
    return send({
      url: api.getApiUrl() + '/order/getOrders',
      method: 'get',
      params: query
    })
}

//添加用户订单
export function  addOrderAjax(query) {
    return send({
      url: api.getApiUrl() + '/order/addOrders',
      method: 'post',
      data: query
    })
}

//修改用户订单
export function  updateOrderAjax(query) {
    return send({
      url: api.getApiUrl() + '/order/upOrders',
      method: 'post',
      data: query
    })
}

//删除用户订单
export function  delOrderAjax(query) {
    return send({
      url: api.getApiUrl() + '/order/delOrders',
      method: 'get',
      params: query
    })
}