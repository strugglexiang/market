var express = require('express');
//连接数据库
require('./db.js')
//引入中间件
var logger = require('morgan');
var bodyParser = require('body-parser')
//引入路由
var user = require('./routes/user');
//导入全局变量
var global = require('./config')

var app = express();

//使用中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//跨域处理
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use((req,res,next) => {
    if(req.originalUrl !== '/user/login' ){
        global.validateTotoken(req,res,next)
    }else{
        next();
    }
})
// app.use(global.validateTotoken)

//使用路由
app.use('/user', user);


module.exports = app;
