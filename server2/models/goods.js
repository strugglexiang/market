let mongoose = require('mongoose')

let Schema = mongoose.Schema

// console.log('我执行了一遍创建goodsSchema')
let goodsSchema =  new Schema ({
    goodName:{
        type:'string',
        required:true,
        unique:true
    },//商品名称
    goodType:{
        type:'string',
        required:true,
    },//商品类型
    num:{
        type:'number',
        required:true,
    },//商品剩余数量(库存)
    picUrl:{
        type:'string',
        // required:true,
    },//商品图片
    price:{
        type:'number',
        required:true,
    },//商品价格
    remark:{
        type:'string'
    },//备注信息

})

module.exports = mongoose.model('good',goodsSchema)