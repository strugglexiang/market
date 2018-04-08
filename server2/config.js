let crypto = require('crypto')
let jwt = require('jwt-simple')

//连接的数据地址
let mongoUrl = 'mongodb://127.0.0.1:27017/hongshanmarket'

//token加密秘钥
let secret = 'jsonwebtokenStrugglexiang'

//维护的用户权限变量
let userAuthority = []

// 设置用户权限
function getUserAuthority(){
    return userAuthority
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
                  status:"0",
                  msg:'token失效,请重新登录'
              })
          }   
          //token在有效期内，解析出该用户的权限，放入config维护的权限数组中
        //   console.log('用户权限',decoded.iss)
        //   userAuthority = [1]
          next()        
       } catch (error) {
           //解析的过程失败，抛出异常
           return res.json({
               status:'0',
               result:'token解析失败，通知后端管理人员检查',
               err:error.message
           })

       }
    }else{
        return res.json({
            status:'0',
            msg:'请求未携带token'
        })
    }     
}

module.exports = {
    mongoUrl,//连接的数据库地址
    secret, //token加密秘钥
    encrypt,//md5加密函数
    validateTotoken,//token验证中间件
    getUserAuthority,//维护的用户权限变量
    delKong,//消除空格
}