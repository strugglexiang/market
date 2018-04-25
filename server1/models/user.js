let mongoose = require('mongoose')

let Schema = mongoose.Schema
// console.log('我执行了一遍创建userSchema')
let userSchema = new Schema({
    userName:{
        type:'string',
        required:true,
        unique:true,//这代表在集合中不能有同名，不然sava的时候回报错
    },//用户名
    password:{
        type:'string',
        required:true,
    },//密码
    sex:{
        type:'number',//1代表男，2代表女
        required:true
    },//性别
    tel:{
       type:'string',
       required:true
    },//联系方式(这里required设置为true，看看登录的时候是否一定要提供这个字段;find的时候不要,save的时候起作用)
    authority:[{
        auName:'string',//一级权限名称
        auCode:'number',//一级权限编码
    }],//权限数组，将用于权限模块
    isAdmin:{
        type:'number'
    }
})

module.exports = mongoose.model('user',userSchema)