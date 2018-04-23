let express = require('express')
let router = express.Router()
let Purchase = require('../models/purchase')
let Goods = require('../models/goods')
let global = require('../config')

/**
 * 目录
 * 1.添加进货单 权限码21
 * 2.查询进货单 权限码22
 * 3.修改进货单 权限码23
 * 4.删除进货单 权限码24
 */

//添加进货单
router.post('/addPurchase', (req, res, next) => {
    if(!req.body.content){
        return res.json({
            status:'0',
            msg:'请传入进货单内容'
        })
    }
    if(!Array.isArray(req.body.content)){
        return res.json({
            status:'0',
            msg:'进货内容的类型不正确'
        })
    }  
    let params = {
        purchaseId : new Date().getTime() + 100000000 + parseInt(Math.random() * 999999999),
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
    //--------------- 商品中对应的商品数量减去
    req.body.content.forEach((item,index,array) => {
        // console.log(item)
        Goods.update(
            {
               goodName: item.goodName,
            },
            {
                $inc:{
                    num: + item.num
                }
            },
            (err,doc) => {
               if(err){
                   return res.json({
                       statu:'0',
                       msg:err.message
                   })
               }
            },
        )
    })
    //--------------- 生成订单    
    let newOne = new Purchase(params)
    newOne.save((err,doc) => {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"添加进货单成功",
            result:doc
        })          
    })    
})

//查询进货单
router.get('/getPurchase', (req, res, next) => {
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
                    purchaseId: Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
                {
                    total:Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
                {
                    payWay: {$regex : reg}
                },
            ]
        }
        Purchase.count(params,(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            Purchase
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
                        status:'1',
                        msg:'没有符合条件的选项',
                        result:doc
                    })
                }
                return res.json({
                    status:'1',
                    msg:'查询进货单成功',
                    count:count,
                    result:doc
                })
            })
        })             
    }else{
        Purchase.count({},(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            Purchase
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
                        status:'1',
                        msg:'没有符合条件的选项',
                        result:doc
                    })
                }
                return res.json({
                    status:'1',
                    msg:'查询进货单成功',
                    count:count,
                    result:doc
                })
            })
        })          
    } 
})

//修改进货单
router.post('/upPurchase', (req, res, next) => {
    if(!req.body.id){
        return res.json({
            status:"0",
            msg:'请传入进货单id'
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
                msg:'支付类型请不要传入空字符串'
            })
        }  
    }
    if(req.body.content){
        upobj.contents = req.body.content
    }
    if(req.body.isAddGoods){
        upobj.contents = req.body.isAddGoods
    }

    Purchase.update(params,upobj,(err,doc)=> {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"修改进货单成功",
            result:doc
        })        
    })
})


//删除进货单
router.get('/delPurchase', (req, res, next) => {
    if(!req.query.id){
        return res.json({
            status:"0",
            msg:'请传入进货单id'
        })
    }
    let params = {
        _id: req.query.id
    }
    Purchase.remove(params,(err,doc) => {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"删除进货单成功",
            result:doc
        })          
    })
})


module.exports = router