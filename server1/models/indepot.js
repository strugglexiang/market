//---- 进货单
let mongoose = require('mongoose')

let Schema = mongoose.Schema
// console.log('我执行了一遍创建inDepotSchema')
let inDepotSchema = new Schema({
    depotId:{
        type:'number',
        required:true
    },//进货单号
    total:{
        type:'number',
        required:true
    },//此单总价
    content:[
        {
            goodName:'string',//商品名称
            price:'number',//商品价格
            num:'number',//商品数量
            all:'number',//此商品进货总价
        }
    ],
    isAddGoods:{
        type:'number',
        default:1,
    },//是否已经入库  1没有  2 已经入库
    origin:{
        type:'string',
        required:true
    },//出货部门
    payWay:{
        type:'string', 
        required:true,
     },//支付方式  
},{
    timestamps: true  //  createdAt  updatedAt
})

  let model = mongoose.model('indepot',inDepotSchema)

  module.exports = model