let crypto = require('crypto')
let jwt = require('jwt-simple')

//------------------------连接的数据地址
let mongoUrl = 'mongodb://127.0.0.1:27017/zongmarket'

//------------------------token加密秘钥
let secret = 'jsonwebtokenStrugglexiang'

//------------------------用户最基础权限配置
/**
 * 0 首页   基础权限
 * 1 登陆   基础权限
 * 2 用户管理
 * 3 商品管理
 * 4 货单管理
 * 5 权限管理
 * 6 个人设置 基础权限 
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
        auCode: 6,// type number
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
            temp.concat([])
        }
        //登陆
        if(item.auCode === 1){
            temp.concat([1,2])
        }
        //用户管理
        if(item.auCode === 2){
            temp.concat([3,4,5,8])
        }
        //商品管理
        if(item.auCode === 3){
            //接口暂代开发,先连接一个空数组
            temp.concat([10,11,12,13,14,15,16,17,18])
        }
        //货单管理
        if(item.auCode === 4){
            //接口暂代开发,先连接一个空数组
            temp.concat([])
        }
        //权限管理
        if(item.auCode === 5){
            temp.concat([])
        }
        //个人设置
        if(item.auCode === 6){
            temp.concat([6,7,9])
        }
    })
    return temp 
}

//------------------------ 当前token解析出来后的用户信息
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
              return res.json({
                  status:"405",
                  msg:'token失效,请重新登录'
              })
          }   
        //   console.log('token解析结果',decoded)
        // ------- 用户信息逻辑
          userInfo = decoded.iss
        // ------- 权限解析逻辑  
        //   next()   
          req.body.apiCode = analyzeAuthority(userInfo.authority)
          //   console.log('我运行到token解析',req.body.apiCode)
          next()               
       } catch (error) {
           //解析的过程失败，抛出异常
           return res.json({
               status:'406',
               msg:'token解析失败，通知后端管理人员检查',
               err:error.message
           })

       }
    }else{
        return res.json({
            status:'407',
            msg:'请求未携带token'
        })
    }     
}

// ------------------------ 接口权限限制中间件
function avalidateAuthority(req,res,next){
    // console.log('我运行到接口权限解析',req.query,req.body)
    // console.log(req.originalUrl)
    // console.log(req.apiCode)
    let currentCode = null
    switch(req.body.originalUrl){
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
    }
    // console.log('ssss',req.apiCode)
    // console.log('ssss',userInfo)
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
}