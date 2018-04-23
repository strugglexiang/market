import {
    addPurAjax,//添加用户订单
} from '@/ajax/purchase'

import {
    getGoodsAjax,//获取商品
} from '@/ajax/goods/allGoods'


export default {
    methods:{
        //查询商品
        getGoods(obj){
            getGoodsAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.goods = res.data.result
                    this.goodsTotol = res.data.count
                    // console.log(this.goodsTotol)
                    // console.log(this.users)
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
        //添加订单
        addOrder(obj){
            addPurAjax(obj)
            .then(res => {
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.$refs['order'].clear()
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
        }
    },
}