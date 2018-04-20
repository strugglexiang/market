let express = require('express')
let router = express.Router()
let Order = require('../models/order')
let global = require('../config')

/**
 * 目录
 * 1.查询订单 权限码25
 * 2.添加订单 权限码26
 * 3.修改订单 权限码27
 * 4.删除订单 权限码28
 * 
 */

 //查询订单
router.get('/getOrders',(req, res, next) => {
    // console.log('sssssssssss',req.query.keyword)
    let pageSize = Number.parseInt(req.query.pageSize)
    let pageNo = Number.parseInt(req.query.pageNo)
    let skip = (pageNo-1) < 0 ? 0 : (pageNo-1) * pageSize
    if(req.query.keyword){
        let keyword = req.query.keyword.replace(/\s/g,"")
        // console.log('ssss',keyword)
        let reg = new RegExp(keyword, 'i') //不区分大小写  
        let params = {
            $or:[
                {
                    orderId: Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
                {
                    payWay: {$regex : reg}
                },
                {
                    total:Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
            ]
        }
        Order.count(params,(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            Order
            .find(params)
            .limit(pageSize)
            .skip(skip)
            .exec((err,doc) => {
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
                    msg:'查询订单成功',
                    count:count,
                    result:doc
                })
            })
        })             
    }else{
        Order.count({},(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            Order
            .find({})
            .limit(pageSize)
            .skip(skip)
            .exec((err,doc) => {
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
                    msg:'查询订单成功',
                    count:count,
                    result:doc
                })
            })
        })          
    } 
})

 //添加订单
router.post('/addOrders',(req, res, next) => {
    // console.log(req.Headers,req.body)
    if(!req.body.content){
        return res.json({
            status:'0',
            msg:'请传入订单内容'
        })
    }
    if(!Array.isArray(req.body.content)){
        return res.json({
            status:'0',
            msg:'订单内容的类型不正确'
        })
    }  
    let params = {
        orderId : new Date().getTime() + 100000000 + parseInt(Math.random() * 999999999)
    }
    if(req.body.total){
        params.total = req.body.total
    } 
    if(req.body.payWay){
        if(global.delKong(req.body.payWay).length){
            params.payWay = global.delKong(req.body.payWay)
        }else{
            return res.json({
                status:'0',
                msg:'支付类型请不要传入空字符串'
            })
        }  
    }
    if(req.body.content){
        params.content = req.body.content
    } 
    let newOne = new Order(params)
    newOne.save((err,doc) => {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"添加订单成功",
            result:doc
        })          
    })
   
})

//修改订单
router.post('/upOrders',(req, res, next) => {
    if(!req.body.id){
        return res.json({
            status:"0",
            msg:'请传入订单id'
        })
    }
    let params = {
        _id: req.body.id
    }
    let upobj = {}
    if(req.body.total){
        upobj.total = req.body.total
    }
    if(req.body.payWay){
        if(global.delKong(req.body.payWay).length){
            upobj.payWay = global.delKong(req.body.payWay)
        }else{
            return res.json({
                status:'0',
                msg:'支付方式请不要传入空字符串'
            })
        }        
    }   
    // 数组定位修改
    if(req.body.content){
        upobj.contents = req.body.content
    }

    Order.update(params,upobj,(err,doc)=> {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"修改订单成功",
            result:doc
        })        
    })
})

//删除订单
router.get('/delOrders',(req, res, next) => {
    if(!req.query.id){
        return res.json({
            status:"0",
            msg:'请传入订单id'
        })
    }
    let params = {
        _id: req.query.id
    }
    Order.remove(params,(err,doc) => {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"删除订单成功",
            result:doc
        })          
    })
})



module.exports = router