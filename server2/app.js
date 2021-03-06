var express = require('express');
//连接数据库
require('./db.js')
//引入中间件
var logger = require('morgan');
var bodyParser = require('body-parser')
//引入路由
var user = require('./routes/user');
var goodsType = require('./routes/goodsType');
var goods = require('./routes/goods');
var authority = require('./routes/authority');
var purchase = require('./routes/purchase')
var order = require('./routes/order');
var count = require('./routes/count');
//导入全局变量
var global = require('./config')

var app = express();

// 静态资源管理，商品图片上传路径
app.use('/upload',express.static('./upload'))

//使用中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//跨域处理
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // next();
    if (req.method == 'OPTIONS') {
        res.end('OK')
    }
    else {
        next()
    }
});

// token验证 
app.use((req,res,next) => {
    // console.log(req.originalUrl,req.originalUrl.includes('/upload'))
    // || req.originalUrl === '/goods/upload'
    if(req.originalUrl === '/user/login' || req.originalUrl.includes('/upload') ){
        next();
    }else{
        global.validateTotoken(req,res,next)
    }
})
// 接口权限验证
app.use((req,res,next) => {
    // console.log(req.originalUrl,req.originalUrl.includes('/upload'))
    // || req.originalUrl === '/goods/upload'
    if(req.originalUrl === '/user/login' || req.originalUrl.includes('/upload') ){
        next();
    }else{
        global.avalidateAuthority(req,res,next)
    }
})


//使用路由
app.use('/user', user);
app.use('/goodsType', goodsType);
app.use('/goods', goods);
app.use('/authority', authority);
app.use('/purchase', purchase);
app.use('/order', order);
app.use('/count', count);

module.exports = app;
