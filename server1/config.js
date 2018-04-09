let crypto = require('crypto')
let jwt = require('jwt-simple')

//连接的数据地址
let mongoUrl = 'mongodb://127.0.0.1:27017/zongmarket'

//token加密秘钥
let secret = 'jsonwebtokenStrugglexiang'

//整套api的权限对照表
let compareAuth = []

// 获得权限对照表
function getcompareAuth(){
    return compareAuth
}

// 当前token解析出来后的用户信息
let userInfo = null

// 获取当前token的userInfo
function getUserInfo(){
    return userInfo
}

//MD5加密函数
function encrypt(pass){
    var md5 = crypto.createHash('md5')
    var password = md5.update(pass).digest('base64')
    return password.substr(5,15)
}
// console.log('总部密码',encrypt('123456'))

//消除空字符串
function  delKong(str){
    return str.replace(/\s/g,"")
} 


//token验证中间件
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
          //token在有效期内，解析出该用户的权限，放入config维护的权限数组中
        //   console.log('token解析',decoded.iss)
             userInfo = decoded.iss
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

module.exports = {
    mongoUrl,//连接的数据库地址
    secret, //token加密秘钥
    encrypt,//md5加密函数
    validateTotoken,//token验证中间件
    getcompareAuth,//整套api的权限对照表
    userInfo, //当前token解析出来后的用户信息
    getUserInfo,// 获取当前token的userInfo
    delKong,//消除空格
}