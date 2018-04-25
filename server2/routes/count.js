let express = require('express')
let global = require('../config')
let Order = require('../models/order')
let Purchase = require('../models/purchase')
let moment = require('moment')
let router = express.Router()


/**
 * 目录 
 * 1.本月、日进货(线图)
 * 2.本月、日售卖(线图)
 * 3.本月、日进货(饼图)
 * 4.本月、日售卖(饼图)
 * 
 * mongodb可以拿本地时间和IOS时间比
 * 
 * 证明find方法写toUTCString转为字符串
 * 或者new Date(global.getToday())使用对象$get都行
 * 
 * aggregate $get只能使用对象
 */


//本月、日进货(线图)
router.get('/xianin',(req,res,next) => {
    // console.log(req.query)
    if(!req.query.keyword || !req.query.keyword.length){
        return res.json({
            status:'0',
            msg:'请传入keyword'
        })
    }
    let keyword = req.query.keyword.replace(/\s/g,"")
    let reg = new RegExp(keyword, 'i') //不区分大小写  
    // console.log(keyword)
    if(keyword === 'day'){
        // console.log(moment().format('YYYY-MM-DD'))
        // console.log(global.getToday())
        // console.log(new Date(global.getToday()))
        let time = (new Date(global.getToday())).toUTCString()
        // console.log(time)
        Purchase.find({
            createdAt:{$gte:time}
        },(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            return res.json({
                status:'1',
                msg:'获取今日进货数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday())).toUTCString()
        Purchase.find({
            createdAt:{$gte:time}
        },(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            return res.json({
                status:'1',
                msg:'获取本月进货数据成功',
                result:doc
            })
        })    
    }else{
        return res.json({
            status:'0',
            msg:'你传了个鬼东西出来，不要逼我'
        })
    }
})

//本月、日售卖(线图)
router.get('/xianout',(req,res,next) => {
    if(!req.query.keyword || !req.query.keyword.length){
        return res.json({
            status:'0',
            msg:'请传入keyword'
        })
    }
    let keyword = req.query.keyword.replace(/\s/g,"")
    let reg = new RegExp(keyword, 'i') //不区分大小写  
    // console.log(keyword)
    if(keyword === 'day'){
        // console.log(moment().format('YYYY-MM-DD'))
        // console.log(global.getToday())
        // console.log(new Date(global.getToday()))
        let time = (new Date(global.getToday())).toUTCString()
        // console.log(time)
        Order.find({
            createdAt:{$gte:time}
        },(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            return res.json({
                status:'1',
                msg:'获取今日售卖数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday())).toUTCString()
        Order.find({
            createdAt:{$gte:time}
        },(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            return res.json({
                status:'1',
                msg:'获取本月售卖数据成功',
                result:doc
            })
        })    
    }else{
        return res.json({
            status:'0',
            msg:'你传了个鬼东西出来，不要逼我'
        })
    }       
})

// 3.本月、日进货(饼图)
router.get('/binin',(req,res,next) => {
    if(!req.query.keyword || !req.query.keyword.length){
        return res.json({
            status:'0',
            msg:'请传入keyword'
        })
    }
    let keyword = req.query.keyword.replace(/\s/g,"")
    let reg = new RegExp(keyword, 'i') //不区分大小写  
    if(keyword === 'day'){
        let time = (new Date(global.getToday()))
        // console.log(time)
        Purchase.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$payWay',
                    allWayPriceTotal:{$sum:'$total'}
                }
            }    
        ])
        .exec((err,doc) => {
            if(err){
                // console.log('出错了')
                return res.json({
                    status:'0',
                    msg:err.message,
                })
            }
            return res.json({
                status:'1',
                msg:'获取日统计进货数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday()))
        Purchase.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$payWay',
                    allWayPriceTotal:{$sum:'$total'}
                }
            }  
        ])
        .exec((err,doc) => {
            if(err){
                // console.log('出错了')
                return res.json({
                    status:'0',
                    msg:err.message,
                })
            }
            return res.json({
                status:'1',
                msg:'获取月统计进货数据成功',
                result:doc
            })
        })        
    }else{
        return res.json({
            status:'0',
            msg:'你传了个鬼东西出来，不要逼我'
        })
    }    
})

// 4.本月、日出货(饼图)
router.get('/binout',(req,res,next) => {
    if(!req.query.keyword || !req.query.keyword.length){
        return res.json({
            status:'0',
            msg:'请传入keyword'
        })
    }
    let keyword = req.query.keyword.replace(/\s/g,"")
    let reg = new RegExp(keyword, 'i') //不区分大小写  
    if(keyword === 'day'){
        let time = (new Date(global.getToday()))
        // console.log(time)
        Order.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$payWay',
                    allWayPriceTotal:{$sum:'$total'}
                }
            }    
        ])
        .exec((err,doc) => {
            if(err){
                // console.log('出错了')
                return res.json({
                    status:'0',
                    msg:err.message,
                })
            }
            return res.json({
                status:'1',
                msg:'获取日统计售卖数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday()))
        Order.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$payWay',
                    allWayPriceTotal:{$sum:'$total'}
                }
            }  
        ])
        .exec((err,doc) => {
            if(err){
                // console.log('出错了')
                return res.json({
                    status:'0',
                    msg:err.message,
                })
            }
            return res.json({
                status:'1',
                msg:'获取月统计售卖数据成功',
                result:doc
            })
        })        
    }else{
        return res.json({
            status:'0',
            msg:'你传了个鬼东西出来，不要逼我'
        })
    } 
})

module.exports = router

// db.purchases.aggregate([
//     {
//         $match:{
//             createdAt:{$gte:}
//         }
//     }
// ])