import {
    getIndepotAjax,//获取进货单
    updateIndepotAjax,//修改进货单
    delIndepotAjax,//删除进货单
} from '@/ajax/depot'

export default {
    methods:{
        //查询订单
        getIndepotchases(obj){
            this.listLoading = true
            getIndepotAjax(obj)
            .then(res => {
              if(res.data.status === '1'){
                  //orderId total content payWay createdAt updatedAt
                  this.orders = res.data.result
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
         delIndepot(obj){
          delIndepotAjax(obj)
          .then(res => {
              if(res.data.status === '1'){
                  this.$message({
                      type:'success',
                      duration:2000,
                      message:res.data.msg
                  }) 
                  this.listQuery.pageNo = 1  
                  this.getIndepotchases(this.listQuery)                 
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
         upIndepot(obj){
          updateIndepotAjax(obj)
          .then(res => {
              if(res.data.status === '1'){
                  this.$message({
                      type:'success',
                      duration:2000,
                      message:res.data.msg
                  })
                  this.showEditModal = false
                  this.getIndepotchases(this.listQuery)
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