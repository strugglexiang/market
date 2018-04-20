let mongoose = require('mongoose')

let Schema = mongoose.Schema


let orderSchema = new Schema({
    orderId:{
       type:'number',
       required:true,
    },//订单号 唯一 自己写代码生成
    total:{
        type:'number',//此次订单总额
        required:true,
    },
    content:[
        {
            goodName:'string',//商品名称
            num:'number',//数量
            price:'number',//单价
            all:'number'//本次总价 (本次在前端计算提供，后端就不计算了，懒得搞)
        }
    ],//订单详情,  这里不会加reruied
    payWay:{
       type:'string', 
       required:true,
    },//支付方式  
},
{ timestamps: true }//  createdAt  updatedAt
)


module.exports = mongoose.model('order',orderSchema)