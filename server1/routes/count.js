let express = require('express')
let global = require('../config')
let Outdepot = require('../models/Outdepot')
let Indepot = require('../models/indepot')
let moment = require('moment')
let router = express.Router()


/**
 * 目录 
 * 1.本月、日进货(线图)
 * 2.本月、日出货(线图)
 * 3.本月、日进货(饼图)
 * 4.本月、日出货(饼图)
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
        Indepot.find({
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
        Indepot.find({
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

//本月、日出货(线图)
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
        Outdepot.find({
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
                msg:'获取今日出货数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday())).toUTCString()
        Outdepot.find({
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
                msg:'获取本月出货数据成功',
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
        Indepot.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$origin',
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
        Indepot.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$origin',
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
        Outdepot.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$origin',
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
                msg:'获取日统计出货数据成功',
                result:doc
            })
        })
    }else if(keyword === 'month'){
        let time = (new Date(global.getMonthday()))
        Outdepot.aggregate([
            {
                $match:{
                    createdAt:{$gte:time}
                }
            },   
            {
                $group:{
                    _id:'$origin',
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
                msg:'获取月统计出货数据成功',
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
