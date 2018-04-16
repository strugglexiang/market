import send from '@/utils'
import api from '@/api'

// 获取所有商品类型
export function  getGoodsTypeAjax(query) {
    return send({
      url: api.getApiUrl() + '/goodsType/getGoodsType',
      method: 'get',
      params: query
    })
}

//添加商品类型
export function  addGoodsTypeAjax(query) {
    return send({
      url: api.getApiUrl() + '/goodsType/addGoodsType',
      method: 'post',
      data: query
    })
}

//修改商品类型
export function  updateGoodsTypeAjax(query) {
    return send({
      url: api.getApiUrl() + '/goodsType/updateGoodType',
      method: 'post',
      data: query
    })
}

//删除商品类型
export function  delTypeGoods(query) {
    return send({
      url: api.getApiUrl() + '/goodsType/delGoodType',
      method: 'get',
      params: query
    })
}