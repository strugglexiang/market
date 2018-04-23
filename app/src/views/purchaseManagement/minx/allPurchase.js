import {
    getPurAjax,//获取进货单
    updatePurAjax,//修改进货单
    delPurAjax,//删除进货单
} from '@/ajax/purchase'

export default {
    methods:{
        //查询订单
        getPurchases(obj){
            this.listLoading = true
            getPurAjax(obj)
            .then(res => {
              if(res.data.status === '1'){
                  //orderId total content payWay createdAt updatedAt
                  this.purchases = res.data.result
                  // console.log(this.orders)
                  this.total = res.data.count
                  this.listLoading = false
                  // console.log(this.)
              }else{
                  this.$message({
                      type:'error',
                      duration:2000,
                      message:res.data.msg
                  })
                  this.listLoading = false
              }              
            })
            .catch(err => {
                console.log(err)
                this.listLoading = false
            })
         },
        //删除订单
         delPurchase(obj){
          delPurAjax(obj)
          .then(res => {
              if(res.data.status === '1'){
                  this.$message({
                      type:'success',
                      duration:2000,
                      message:res.data.msg
                  }) 
                  this.listQuery.pageNo = 1  
                  this.getPurchases(this.listQuery)                 
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
         //修改订单
         upPurchase(obj){
          updatePurAjax(obj)
          .then(res => {
              if(res.data.status === '1'){
                  this.$message({
                      type:'success',
                      duration:2000,
                      message:res.data.msg
                  })
                  this.showEditModal = false
                  this.getPurchases(this.listQuery)
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
    //测试节流函数
    // created () {
    //     console.log(this.jieliu(() => {
    //         console.log(this)
    //     }))
    // }
}