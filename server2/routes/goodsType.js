let express = require('express')
let router = express.Router()
let GoodsType = require('../models/goodsType')
let global = require('../config')

/**
 * 目录
 * 1.添加商品类型
 * 2.查找商品类型
 * 3.修改商品类型
 * 4.删除商品类型
 */

// -------- 添加商品类型
router.post('/addGoodsType',(req,res,next) => {
    if(!req.body.typeName){
        return res.json({
            status:'0',
            msg:'添加商品类型必需传入类型名'
        })
    }
    let params =  {
       typeName:req.body.typeName
    }
    let newType = new GoodsType(params)
    newType.save((err,doc) => {
        if(err){
            return res.json({
                status:'0',
                msg:err.message
            })
        }
        return res.json({
            status:'0',
            msg:'添加类型成功',
            result:doc
        })
    })
})

// -------- 查找商品类型
router.get('/getGoodsType',(req,res,next) => {
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
            typeName:{$regex : reg}
        }   
        let count = 0
        GoodsType.count(params,(err,doc) => {
            if(err){
                return res.josn({
                    status:'0',
                    msg:err.message,
                    result:'统计分页总数事变'
                })
            }
            count = doc
        })
        GoodsType
        .find(params)
        .limit(pageSize)
        .skip(skip)
        .exec((err,doc) => {
            if(err){
                // console.log('sss',err)
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
                msg:"查询商品类型成功",
                count:count,
                result:doc
            })
        })
    }else{
        GoodsType.count({},(err,count) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message
                })
            }
            GoodsType
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
                    msg:"查询商品类型成功",
                    count:count,
                    result:doc
                })
            })
        })
    }        
})
// -------- 修改商品类型
router.post('/updateGoodType',(req,res,nex) => {
    if(!req.body.id){
        return res.json({
            status:"0",
            msg:"修改必需商品类型id"
        })
    }
    let params = {
        _id: req.body.id
    }
    let upobj = {}
    if(req.body.typeName){
        if(global.delKong(req.body.typeName).length){
            upobj.typeName = global.delKong(req.body.typeName)
        }else{
            return res.json({
                status:'0',
                msg:'商品类型请不要传入空字符串'
            })
        }
    }
    GoodsType.update(params,upobj,(err,doc)=> {
        if(err){
            return res.json({
                status:"0",
                msg:err.message
            })
        }
        return res.json({
            status:"1",
            msg:"修改商品类型成功",
            result:doc
        })        
    })
})


// -------- 删除商品类型
router.get('/delGoodType',(req,res,nex) => {
    // console.log(req.query)
    if(!req.query.id){
        return res.json({
            status:"0",
            msg:"修改商品类型需要传入商品类型id",
        })         
    }
    let params = {
        _id:req.query.id
    }
    GoodsType.remove(params,(err) => {
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