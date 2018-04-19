let express = require('express')
let router = express.Router()
let User = require('../models/user')
let global = require('../config')

/**
 * 1. 获取用户权限 权限码19
 * 2. 给用户授权   权限码20
 */

//  --------------获取用户权限
 router.get('/getAuthority', (req, res, next) => {
       if(!req.query.id){
           return res.json({
               status:'0',
               msg:'获取用户权限必需传入参数id'
           })
       }
       let params = {
           _id: req.query.id
       }
       let temp = [
           {
               auCode:2,
               auName:'用户管理',
               isHave:false
           },
           {
               auCode:3,
               auName:'商品管理',
               isHave:false
           },
           {
               auCode:4,
               auName:'进货管理',
               isHave:false
           },
           {
               auCode:5,
               auName:'订单管理',
               isHave:false
           },
           {
               auCode:6,
               auName:'权限管理',
               isHave:false
           },
       ]
       User.find(params,(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message,
                    result:'查询用户权限出错'
                })
            }
            if(!doc.length){
                return res.json({
                    status:'0',
                    msg:'没有找到此用户',
                })
            }
            // console.log(doc)
            let userInfo = doc[0]
            // console.log(userInfo,userInfo.isAdmin)
            if(userInfo.isAdmin){
                // console.log('走这里1')
                temp.forEach((item,index,array) => {
                        item.isHave = true
               })
               return res.json({
                   status:'1',
                   msg:'获取用户权限成功',
                   result:temp
               })  
            }else{
                console.log('走这里2')
                let selfCode = []
                userInfo.authority.forEach((item,index,array) => {
                    selfCode.push(item.auCode) 
                }) 
                temp.forEach((item,index,array) => {
                     if(selfCode.includes(item.auCode)){
                         item.isHave = true
                     }
                })
                return res.json({
                    status:'1',
                    msg:'获取用户权限成功',
                    result:temp
                    // result:doc[0]['isAdmin']
                })                
            }
       })
 })


 //  --------------给用户授权
 router.post('/giveAuthority', (req, res, next) => {
    if(!req.body.id || !req.body.giveObj ){
        return res.json({
            status:'0',
            msg:'获取用户权限必需传入参数id和授权数组'
        })
    }
    // console.log(Array.isArray(req.body.giveObj))
    if(!Array.isArray(req.body.giveObj)){
        return res.json({
            status:'0',
            msg:'授权参数不正确'
        })
    }
    let params = {
        _id: req.body.id
    } 
    
    let addArr = []
    req.body.giveObj.forEach((item,index,array) => {
        // console.log(typeof item)
        if(item === 2){
            addArr.push({
                auCode:2,
                auName:'用户管理'
            })
        }
        if(item=== 3){
            addArr.push({
                auCode:3,
                auName:'商品管理'
            })
        }
        if(item === 4){
            addArr.push({
                auCode:4,
                auName:'进货管理'
            })
        }
        if(item === 5){
            addArr.push({
                auCode:5,
                auName:'订单管理'
            })
        }
        if(item === 6){
            addArr.push({
                auCode:6,
                auName:'权限管理'
            })
        }

    })
    // let upobj = {
    //     $addToSet:{
    //         'authority':{$each:addArr}
    //     }
    // } 
    let upobj = {
        authority : addArr.concat(global.getBaseAuthority())
    }
    // console.log('我运行到这里',upobj)
    User.update(params,upobj,(err,doc) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        return res.json({
            status:'1',
            msg:'授权成功',
            result:doc
        })
    })

})


module.exports = router