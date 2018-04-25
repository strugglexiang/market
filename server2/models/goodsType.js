let mongoose = require('mongoose')

let Schema = mongoose.Schema

// console.log('我执行了一遍创建goodsTypeSchema')
let goodsTypeSchema =  new Schema ({
     typeName:{
         type:'string',
         required:true,
         unique:true,
     }
})


module.exports = mongoose.model('goodsType',goodsTypeSchema)