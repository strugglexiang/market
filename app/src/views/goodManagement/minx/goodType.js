import {
    getGoodsTypeAjax,//获取商品类型
    addGoodsTypeAjax,//添加商品类型
    updateGoodsTypeAjax,//修改商品类型
    delTypeGoods,//删除商品类型
} from '@/ajax/goods/goodsType'

export default {
    methods:{
        queryGoodsType(obj){
            // console.log(obj)
            this.listLoading = true
            getGoodsTypeAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    // this.$message({
                    //     type:'success',
                    //     duration:2000,
                    //     message:res.data.msg
                    // })  
                    // console.log(res.data.result)  
                    //   typeName
                    this.goodsType = res.data.result
                    this.total = res.data.count
                    this.listLoading = false
                    // console.log(this.users)
                }else{
                    this.$message({
                        type:'error',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.goodsType = res.data.result
                    this.total = res.data.count
                    this.listLoading = false
                }
            })
            .catch(error => {
                console.log(error)
                this.listLoading = false
            })
        },
        //添加商品类型
        addGoodsType(obj){
            // console.log(obj)
            addGoodsTypeAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.showAddModal = false
                    // this.listQuery.pageNo = 1
                    this.queryGoodsType(this.listQuery)
                }else{
                    this.$message({
                        type:'error',
                        duration:2000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        //修改商品类型
        updateGoodsType(obj){
            // console.log(obj)
            updateGoodsTypeAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.showEditModal = false
                    // this.listQuery.pageNo = 1
                    this.queryGoodsType(this.listQuery)
                }else{
                    this.$message({
                        type:'error',
                        duration:2000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },  
        //删除商品类型
        delGoodsType(obj){
            // console.log(obj)
            delTypeGoods(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    }) 
                    this.listQuery.pageNo = 1 
                    this.queryGoodsType(this.listQuery)                 
                }else{
                    this.$message({
                        type:'error',
                        duration:2000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },              
    },  
    //测试节流函数
    // created () {
    //     console.log(this.jieliu(() => {
    //         console.log(this)
    //     }))
    // }
}