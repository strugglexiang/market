import send from '@/utils'
import api from '@/api'

// 获取所有商品
export function  getGoodsAjax(query) {
    return send({
      url: api.getApiUrl() + '/goods/getGoods',
      method: 'get',
      params: query
    })
}

//添加商品
export function  addGoodsAjax(query) {
    return send({
      url: api.getApiUrl() + '/goods/addGoods',
      method: 'post',
      data: query
    })
}

//修改商品
export function  updateGoodsAjax(query) {
    return send({
      url: api.getApiUrl() + '/goods/updateGoods',
      method: 'post',
      data: query
    })
}

//删除商品
export function  delGoodsAjax(query) {
    return send({
      url: api.getApiUrl() + '/goods/delGoods',
      method: 'get',
      params: query
    })
}

//上传商品图片
export function  addGoodsPicAjax(query) {
  return send({
    url: api.getApiUrl() + '/goods/upload',
    method: 'post',
    data: query
  })
}