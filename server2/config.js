let crypto = require('crypto')
let jwt = require('jwt-simple')

//------------------------连接的数据地址
let mongoUrl = 'mongodb://127.0.0.1:27017/hongshanmarket'

//------------------------token加密秘钥
let secret = 'jsonwebtokenStrugglexiang'

//------------------------用户最基础权限配置
/**
 * 0 首页   基础权限
 * 1 登陆   基础权限
 * 2 用户管理
 * 3 商品管理
 * 4 进货管理
 * 5 订单管理
 * 6 权限管理
 * 7 个人设置 基础权限 
 */
let baseAuthority = [
    {
        auName: '首页',//type string
        auCode: 0,// type number
    },
    {
        auName: '登陆',//type string
        auCode: 1,// type number
    },
    {
        auName: '个人设置',//type string
        auCode: 7,// type number
    },
]


function getBaseAuthority(){
    return baseAuthority
}

//------------------------解析前端的权限码，生成小权限数组
function analyzeAuthority(auArray){
    let temp = []
    auArray.forEach((item,index,array) => {
        // --- 每一个item都是对象，包含auCode,auName
        //首页
        if(item.auCode === 0){
            //接口暂代开发,先连接一个空数组
            temp = temp.concat([])
        }
        //登陆
        if(item.auCode === 1){
            temp = temp.concat([1,2])
        }
        //用户管理
        if(item.auCode === 2){
            temp =  temp.concat([3,4,5,8])
        }
        //商品管理
        if(item.auCode === 3){
            //接口暂代开发,先连接一个空数组
            temp =  temp.concat([10,11,12,13,14,15,16,17,18])
        }
        //进货管理
        if(item.auCode === 4){
            //接口暂代开发,先连接一个空数组
            temp =  temp.concat([15,21,22,23,24])
        }
        //订单管理
        if(item.auCode === 5){
            temp = temp.concat([15,25,26,27,28])
        }
        //权限管理
        if(item.auCode === 6){
            temp = temp.concat([5,19,20])
        }
        //个人设置
        if(item.auCode === 7){
            temp = temp.concat([6,7,9])
        }
    })
    return temp 
}


//------------------------当前token解析出来后的用户信息
let userInfo = null

// 获取当前token的userInfo
function getUserInfo(){
    return userInfo
}

//------------------------MD5加密函数
function encrypt(pass){
    var md5 = crypto.createHash('md5')
    var password = md5.update(pass).digest('base64')
    return password.substr(5,15)
}
// console.log('总部密码',encrypt('123456'))

//------------------------消除空字符串
function  delKong(str){
    // console.log('我这里出错了?',str,typeof str)
    return str.replace(/\s/g,"")
} 


//------------------------token验证中间件
function validateTotoken(req,res,next){
    // console.log("token验证")
    // console.log(req)
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['authorization'];
    // console.log(secret)
    // console.log(req.originalUrl)
    //token解析
    if(token){
       try {
          var decoded = jwt.decode(token, secret);
          // 如果失效
          if (decoded.exp <= Date.now()) {
              return res.status(401).json({
                  status:"0",
                  msg:'token失效,请重新登录'
              })
          }   
        // console.log('用户权限',decoded.iss)
        //------ 用户信息逻辑
          userInfo = decoded.iss
        //------ 权限解析逻辑
        //   console.log('添加小权限',analyzeAuthority(userInfo.authority))
          req.body.apiCode = analyzeAuthority(userInfo.authority)
        //   console.log('我运行到token解析',req.body.apiCode)
          next()        
       } catch (error) {
           //解析的过程失败，抛出异常
           return res.status(400).json({
               status:'0',
               msg:'token解析失败，通知后端管理人员检查',
               err:error.message
           })

       }
    }else{
        return res.status(401).json({
            status:'0',
            msg:'请求未携带token'
        })
    }     
}

// ------------------------ 接口权限限制中间件
function avalidateAuthority(req,res,next){
    // console.log('我运行到接口权限解析',req.query,req.body)
    // console.log(req.originalUrl,req)
    // console.log(req.apiCode)
    let currentCode = null
    let baseUrl = ''
    if(req.originalUrl.indexOf('?') !== -1){
        // console.log('ssss',req.originalUrl)
        let num = req.originalUrl.indexOf('?')
        baseUrl = req.originalUrl.slice(0,num)
    }else{
        baseUrl = req.originalUrl
    }
    // console.log('最基础的地址',baseUrl)
    switch(baseUrl){
        case '/user/login':
          currentCode = 1
          break;
        case '/user/checkToken':
          currentCode = 2
          break;
        case '/user/createWorker':
          currentCode = 3
          break; 
        case '/user/updateUser':
          currentCode = 4
          break; 
        case '/user/getUsers':
          currentCode = 5
          break; 
        case '/user/userInfo':
          currentCode = 6
          break; 
        case '/user/ownUpuser':
          currentCode = 7
          break; 
        case '/user/delUser':
          currentCode = 8
          break; 
        case '/user/checkPwd':
          currentCode = 9
          break;                 
        case '/goodsType/addGoodsType':
          currentCode = 10
          break;
        case '/goodsType/getGoodsType':
          currentCode = 11
          break;
        case '/goodsType/updateGoodType':
          currentCode = 12
          break;
        case '/goodsType/delGoodType':
          currentCode = 13
          break;       
        case '/goods/addGoods':
          currentCode = 14
          break;
        case '/goods/getGoods':
          currentCode = 15
          break;
        case '/goods/updateGoods':
          currentCode = 16
          break;
        case '/goods/delGoods':
          currentCode = 17
          break;
        case '/goods/upload':
          currentCode = 18
          break; 
        case '/authority/getAuthority':
          currentCode = 19
          break;
        case '/authority/giveAuthority':
          currentCode = 20
          break; 
        case '/purchase/addPurchase':
          currentCode = 21
          break;   
        case '/purchase/getPurchase':
          currentCode = 22
          break;   
        case '/purchase/upPurchase':
          currentCode = 23
          break; 
        case '/purchase/delPurchase':
          currentCode = 24
          break;   
        case '/order/getOrders':
          currentCode = 25
          break;   
        case '/order/addOrders':
          currentCode = 26
          break;   
        case '/order/upOrders':
          currentCode = 27
          break;   
        case '/order/delOrders':
          currentCode = 28
          break;                                 
    }
    // console.log('接口权限',req.body.apiCode)
    // console.log('ssss',userInfo.isAdmin)
    // console.log(req.body.apiCode.includes(6))
    // console.log('当前接口码',currentCode)
    if(req.body.apiCode.includes(currentCode) || userInfo.isAdmin){
        next()
    }else{
        // return res.json({
        //     status:'0',
        //     msg:'对不起，您权限不足'
        // })
        return res.status(401).json({
            status:'0',
            msg:'对不起，您权限不足'
        })
    }
}

// ---------------------- 获得今天的时间戳
function getToday(){
   let time = new Date()
   time.setHours(0,0,0,0)
   return time.getTime()
}

// --------------------- 获得本月第一天的时间戳
function getMonthday(){
   let date = new Date()
   date.setDate(1)
   date.setHours(0,0,0,0)
   return date.getTime()
}

// ------------------------ 最后导出
module.exports = {
    mongoUrl,//连接的数据库地址
    secret, //token加密秘钥
    encrypt,//md5加密函数
    validateTotoken,//token验证中间件
    userInfo, //当前token解析出来后的用户信息
    getUserInfo,// 获取当前token的userInfo
    delKong,//消除空格
    getBaseAuthority, //获取基础权限
    avalidateAuthority,//接口权限限制中间件
    getToday,//获取今日时间戳
    getMonthday,//获取本月初时间戳
}