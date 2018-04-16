let expresss = require('express')
let router = expresss.Router()
let Goods = require('../models/goods')
let global = require('../config')
//图片处理插件
let multiparty = require('multiparty')
let fs = require('fs');

/**
 * 目录
 * 1.添加商品
 * 2.查询商品
 * 3.修改商品
 * 4.删除商品
 * 5.图片上传功能
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
    // console.log(req.query)
    // console.log(Number.parseFloat(req.query.keyword))
    // console.log(Boolean(NaN))
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
                    num:Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
                {
                    price:Boolean(Number.parseFloat(keyword)) ? Number.parseFloat(keyword) : null
                },
            ]
        }  
        let count = 0
        Goods.count(params,(err,doc) => {
            if(err){
                return res.json({
                    status:'0',
                    msg:err.message,
                    result:'统计分页总数失败'
                })
            }
            // console.log(doc)
            count = doc
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
                    msg:err.message,
                    result:'统计分页总数错误'
                })
            }
            count = doc
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
                result:doc
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

// ---- 图片上传功能
router.post('/upload',(req,res,next) => {
    // --- 1 生成mulparty对象
    let form = new multiparty.Form()
    //--- 2 配置上传图片的路径
    form.uploadDir = './upload'
    // --- 3 上传完成后处理
    form.parse(req,(err,fields,files) => {
        if(err){
            return res.json({
                status:'0',
                msg:err,
                result:'上传图片处理失败'
            })
        }
        //获取提交的数据以及图片上传成功返回的图片信息  
        // console.log('表单数据',fields);  // 获取表单的数据  
        // console.log('图片上传成功返回的信息',files);  // 图片上传成功返回的信息     

        let inputFile = files.file[0];
        let oldPath = inputFile.path;
        let newPath = './upload/img/' + inputFile.originalFilename;
        // console.log(oldPath,newPath)
        //重命名为真实文件名
        fs.rename(oldPath, newPath, function(err) {
          if(err){
            return res.json({
                status:'0',
                msg:err,
                some:'图片上传成功，重命名失败',
                result:oldPath
            })
          } else {
            return res.json({
                status:'0',
                msg:err,
                some:'图片上传成功，重命名成功',
                result:newPath.slice(1)
            })
          }
        });
    })

})

module.exports = router
