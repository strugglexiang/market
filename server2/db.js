var mongoose = require('mongoose')
let global = require('./config')

/**
* 连接
*/
var db = mongoose.connect(global.mongoUrl);

/**
* 连接成功
*/
mongoose.connection.on('connected', function () {    
  console.log('mongodb连接成功')
});    

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {    
    console.log('mongodb连接异常')
});    

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {    
    console.log('mongodb连接断开')
}); 


module.exports = mongoose