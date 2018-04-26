import send from '@/utils'
import api from '@/api'

//进货线图
export function getLineInAjax(query) {
    return send({
      url: api.getApiUrl() + '/count/xianin',
      method: 'get',
      params: query
    })
}

//进货饼图
export function getBinInAjax(query) {
    return send({
      url: api.getApiUrl() + '/count/binin',
      method: 'get',
      params: query
    })
}

//售卖线图
export function getLineOutAjax(query) {
    return send({
      url: api.getApiUrl() + '/count/xianout',
      method: 'get',
      params: query
    })
}

//售卖饼图
export function getBinOutAjax(query) {
    return send({
      url: api.getApiUrl() + '/count/binout',
      method: 'get',
      params: query
    })
}


