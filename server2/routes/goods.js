let expresss = require('express')
let router = expresss.Router()
let Goods = require('../models/goods')
let global = require('../config')

/**
 * 目录
 * 1.添加商品
 * 2.查询商品
 * 3.修改商品
 * 4.删除商品
 */

//---------- 添加商品
router.post('/addGoods',(req,res,next) => {
    // goodType goodName num picUrl price remark
    if(
        !req.body.goodName || 
        !req.body.goodType || 
        !req.body.num || 
        !req.body.price 
    ){
       return res.json({
           status:'0',
           msg:"添加商品需传入名称,类型,初始数量,价格"
       })
    }
    let params = {
        goodName: req.body.goodName,
        goodType: req.body.goodType,
        num: req.body.num,
        price: req.body.price,
    }
    if(req.body.picUrl){
        params.picUrl = req.body.picUrl
    }
    if(req.body.remark){
        params.remark = req.body.remark
    }
    let newOne = new Goods(params)
    newOne.save((err,doc) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        return res.json({
            status:'1',
            msg:'添加商品成功',
            result:doc
        })
    })
})


//---------- 查询商品
router.get('/getGoods',(req,res,next) => {
    // goodType goodName num picUrl price remark
    let pageSize = Number.parseInt(req.query.pageSize)
    let pageNo = Number.parseInt(req.query.pageNo)
    let skip = (pageNo-1) < 0 ? 0 : (pageNo-1) * pageSize
    /**
     * 1.不提供关键字，查询所有
     * 2.提供关键字，按模糊查询
     * 3.按商品名称，类型,价格，数量查询
     */   
    if(req.query.keyword){
        let keyword = req.query.keyword.replace(/\s/g,"")
        let reg = new RegExp(keyword, 'i') //不区分大小写  
        let params = {
            $or:[
                {
                    goodName: {$regex : reg}
                },
                {
                    goodType: {$regex : reg}
                },
                {
                    num:keyword
                },
                {
                    price:keyword
                },
            ]
        }  
        Goods.count({},(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
        })
        Goods
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
                msg:"查询商品成功",
                count:count,
                result:doc
            })
        })        
    }else{
        Goods.count({},(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
        })
        Goods
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
                msg:"查询商品成功",
                count:count,
                doc:result
            })
        }) 
    }
})

//---------- 修改商品
router.post('/updateGoods',(req,res,next) => {
    if(!req.body.id){
        return res.json({
            status:'0',
            msg:'修改商品需传入id',
        })
    }
    // goodType goodName num picUrl price remark
    let params = {
        _id:req.body.id
    }
    let upobj = {}
    if(req.body.goodName){
        if(global.delKong(req.body.goodName).length){
            upobj.goodName = global.delKong(req.body.goodName)
        }else{
            return res.json({
                status:'0',
                msg:'商品名称请不要传入空字符串'
            })
        }        
    }

    if(req.body.goodType){
        if(global.delKong(req.body.goodType).length){
            upobj.goodType = global.delKong(req.body.goodType)
        }else{
            return res.json({
                status:'0',
                msg:'商品类型请不要传入空字符串'
            })
        }        
    }

    if(req.body.num){
        upobj.num = req.body.num  
    }

    if(req.body.price){
        upobj.price = req.body.price        
    }

    if(req.body.picUrl){
        upobj.picUrl = req.body.picUrl         
    }

    if(req.body.remark){
        if(global.delKong(req.body.remark).length){
            upobj.remark = global.delKong(req.body.remark)
        }else{
            return res.json({
                status:'0',
                msg:'商品备注请不要传入空字符串'
            })
        }        
    }
    Goods.update(params,upobj,(err,doc)=> {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"修改商品成功",
            result:doc
        })        
    })
})

//---------- 删除商品
router.get('/delGoods',(req,res,next) => {
    if(!req.query.id){
        return res.json({
            status:"0",
            msg:"修改商品需要传入商品id",
        })         
    }
    let params = {
        _id:req.query.id
    }
    Goods.remove(params,(err) => {
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

module.exports = router
