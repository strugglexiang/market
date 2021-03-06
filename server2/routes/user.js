var express = require('express');
var router = express.Router();
let User = require('../models/user')
let global = require('../config.js')
let moment = require('moment')
let jwt = require('jwt-simple')

/**
 * 目录
 * 1.用户登录                  权限码1   属于登陆路由
 * 2.检查token是否失效         权限码2   属于登陆路由
 * 3.负责人创建员工            权限码3   属于用户管理路由
 * 4.修改资料(老板修改)        权限码4   属于用户管理路由
 * 5.查看用户(有分页操作)       权限码5  属于用户管理路由
 * 6.获取用户资料              权限码6  属于用户个人设置路由 
 * 7.自己修改自己资料          权限码7  属于用户个人设置路由
 * 8.删除工作人员              权限码8   属于用户管理路由
 * 9.检测密码                  权限码9  属于用户个人设置路由
 */

//用户登录  接口权限码1
router.post('/login', function(req, res, next) {
    //  console.log(req.body)
     if(!req.body.userName || !req.body.password){
         return res.json({
             status:'0',
             msg:'请输入用户名和密码'
         })
     }
     /**
      * 不验证参数是否提供是因为在schame设置了required约束，
        不提供会自动报错
        验证结果:
      */
     let params = {
         userName:req.body.userName,
         password:global.encrypt(req.body.password)
     }
    //  console.log(params)
     User.findOne(params,(err,doc) => {
         if(err){
             return res.json({
                 status:"0",
                 msg:err.message
             })
         }
        //  console.log('doc',doc)
         if(!doc){
             return res.json({
                 status:'0',
                 msg:"用户名或密码错误"
             })
         }
         //登录成功过后生成token
        //  console.log('登录成功',doc)
         let expires = moment().add(20,'minutes').valueOf();
         let token = jwt.encode({
           iss: doc,
           exp: expires
         }, global.secret);  

         return res.json({
            status:'1',
            msg:"登录成功",
            token:token,
            authority:doc.authority
         })
     })
});

//检查token是否失效  接口权限码2
router.get('/checkToken',(req,res,next) => {
    return res.json({
        status:'1',
        msg:"token在有效期内",
     })    
})

//负责人创建员工  接口权限码3
router.post('/createWorker', function(req, res, next) {
    let params = {
        userName:req.body.userName,
        password:global.encrypt(req.body.password),
        sex:req.body.sex,
        tel:req.body.tel,
        authority:global.getBaseAuthority(),
    }
    let newWorker = new User(params)
    newWorker.save((err,doc) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        return res.json({
            status:'1',
            msg:'创建员工成功',
            result:doc
        })
    })
});

//修改资料(老板修改) 接口权限码4
router.post('/updateUser',(req,res,err)=>{
    if(!req.body.id){
        return res.json({
            status:"0",
            msg:"修改必需传入员工id"
        })
    }
    let params = {
        // _id:global.getUserInfo()['_id']
        _id:req.body.id
    }
    // console.log(params)
    let upobj = {}
    if(req.body.userName){
        // console.log('我运行到这里没有出错1')
        if(global.delKong(req.body.userName).length){
            upobj.userName = global.delKong(req.body.userName)
        }else{
            return res.json({
                status:'0',
                msg:'姓名参数请不要传入空字符串'
            })
        }
    }

    if(req.body.password){
        upobj.password = global.encrypt(req.body.password)
    }

    if(req.body.sex){
        // console.log('我运行到这里没有出错2')
        upobj.sex = req.body.sex
    }
    if(req.body.tel){
        if(global.delKong(req.body.tel).length){
            upobj.tel = global.delKong(req.body.tel)
            console.log(upobj.tel)
        }else{
            return res.json({
                status:'0',
                msg:'联系电话参数请不要传入空字符串'
            })            
        }
    }

    User.update(params,upobj,(err,doc)=>{
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"修改资料成功",
            result:doc
        })
    })
    
})

// 查看用户  接口权限码5
//有分页操作
router.get('/getUsers',(req,res,next)=>{
    let pageSize = Number.parseInt(req.query.pageSize)
    let pageNo = Number.parseInt(req.query.pageNo)
    let skip = (pageNo-1) < 0 ? 0 : (pageNo-1) * pageSize
    /**
     * 1.不提供关键字，查询所有
     * 2.提供关键字，按模糊查询
     */
    if(req.query.keyword){
       let keyword = req.query.keyword.replace(/\s/g,"")
       let reg = new RegExp(keyword, 'i') //不区分大小写   
       let params = {
           $or:[
               {
                   userName:{$regex : reg}
               },
               {
                   tel:{$regex : reg}
               },
           ]
       }
       let count = 0
       User.count(params,(err,doc)=>{
           if(err){
               return res.json({
                   status:'0',
                   msg:err.message,
                   result:'统计分页总数出错'
               }) 
           }
           count = doc
       })
       User
       .find(params)
       .limit(pageSize)
       .skip(skip)
       .exec((err,doc)=>{
           if(err){
               return res.json({
                   status:'0',
                   msg:err.message
               })
           }
           if(!doc.length){
            return res.json({
                status:'0',
                msg:'没有符合条件的选项',
                result:doc
            }) 
           }
           return res.json({
               status:'1',
               msg:"查询用户信息成功",
               result:doc,
               count:count
           })
       })
    }else{
        User.count({},(err,count)=>{
            User
            .find({})
            .limit(pageSize)
            .skip(skip)
            .exec((err,doc)=>{
                if(err){
                    return res.json({
                        status:'0',
                        msg:err.message
                    })
                }
                if(!doc.length){
                    return res.json({
                        status:'0',
                        msg:'没有匹配的选项'
                    })
                }
                return res.json({
                    status:'1',
                    msg:'搜索工作人员成功',
                    result:doc,
                    count
                })  
            })
        })
    }
})

// 获取用户资料 接口权限码6
//这里应该是任何用户都有的权限，和登录一样
//没有操作
router.get('/userInfo',(req,res,next) => {
    // if(!req.query.id){
    //     return res.json({
    //         status:"0",
    //         msg:"获取个人资料应该传入id"
    //     })
    // }
    let params = {
        _id:global.getUserInfo()['_id']
    }    
    User.find(params,(err,doc) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        if(!doc.length){
            return {
                statu:'0',
                msg:"没有找到",
                result:doc
            }
        }
        return res.json({
            status:'1',
            msg:"获取个人信息成功",
            result:doc
        })
    })
})

//  自己修改自己资料,不需要传入id 接口权限码7
router.post('/ownUpuser',(req,res,next) => {
    console.log('我运行了这里')
    let params = {
        _id:global.getUserInfo()['_id']
    }
    let upobj = {}
    if(req.body.userName){
        if(global.delKong(req.body.userName).length){
            upobj.userName = global.delKong(req.body.userName)
        }else{
            return res.json({
                status:'0',
                msg:'姓名参数请不要传入空字符串'
            })
        }
    }

    if(req.body.password){
        upobj.password = global.encrypt(req.body.password)
    }

    if(req.body.sex){
        upobj.sex = req.body.sex
    }

    if(req.body.tel){
        if(global.delKong(req.body.tel).length){
            upobj.tel = global.delKong(req.body.tel)
        }else{
            return res.json({
                status:'0',
                msg:'联系电话参数请不要传入空字符串'
            })            
        }
    }

    User.update(params,upobj,(err,doc)=>{
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"自己修改个人资料成功",
            result:doc
        })
    })    
})

// 删除工作人员 接口权限码8
router.get('/delUser',(req,res,err) => {
    // console.log('我调用了这里')
    if(!req.query.id){
         return res.json({
             status:'0',
             msg:"删除用户请传入id"
         })
    }
    let params = {
        _id:req.query.id
    } 
    User.remove(params,(err) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        return res.json({
            status:'1',
            msg:'删除成功'
        })
    })
})

// 检测密码  接口权限码9
// global.getUserInfo()
router.get('/checkPwd',(req,res,next) => {
    let keyword = req.query.keyword
    // console.log(keyword,keyword.length)
    if(!keyword.length){
        return res.json({
            status:'0',
            msg:'检测密码请传入对比数据'
        })
    }
    let dbpassword = global.getUserInfo().password
    if(dbpassword !== global.encrypt(keyword)){
        return res.json({
            status:'0',
            msg:'旧密码验证不正确'
        })
    }else{
        return res.json({
            status:'1',
            msg:'旧密码验证成功'
        })
    }
})

// return res.json({
//     status:'',
//     msg:''
// })
module.exports = router;
