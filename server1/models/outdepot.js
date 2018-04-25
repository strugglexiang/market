//---- 出货单
let mongoose = require('mongoose')

let Schema = mongoose.Schema
// console.log('我威什么会执行两遍outDepotSchema')
let outDepotSchema = new Schema({
    depotId:{
        type:'number',
        required:true
    },//出货单号
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
    },//是否已经出库  1没有  2 已经出库
    origin:{
        type:'string',
        required:true
    },//进货批发商
    payWay:{
        type:'string', 
        required:true,
    },//支付方式  
},{
    timestamps: true  //  createdAt  updatedAt
})

let model = mongoose.model('outdepot',outDepotSchema)
module.exports = model