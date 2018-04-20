let mongoose = require("mongoose")


let Schame = mongoose.Schema


let purchaseSchema = new Schame ({
    purchaseId:{
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
    total:{
        type:'number',
        required:true
    },//此次进货总价
},{
    timestamps: true  //  createdAt  updatedAt
})

module.exports = mongoose.model('purchase',purchaseSchema)