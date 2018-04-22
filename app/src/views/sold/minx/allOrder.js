import {
    getOrderAjax,//获取所有订单
    updateOrderAjax,//修改用户订单
    delOrderAjax,//获取所有订单
} from '@/ajax/sold'
export default {
    methods: {
        //查询订单
       getOrders(obj){
          this.listLoading = true
          getOrderAjax(obj)
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
       delOrder(obj){
        delOrderAjax(obj)
        .then(res => {
            if(res.data.status === '1'){
                this.$message({
                    type:'success',
                    duration:2000,
                    message:res.data.msg
                }) 
                this.listQuery.pageNo = 1  
                this.getOrders(this.listQuery)                 
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
       upOrder(obj){
        updateOrderAjax(obj)
        .then(res => {
            if(res.data.status === '1'){
                this.$message({
                    type:'success',
                    duration:2000,
                    message:res.data.msg
                })
                this.showEditModal = false
                this.getOrders(this.listQuery)
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
    }
    //测试节流函数
    // created () {
    //     console.log(this.jieliu(() => {
    //         console.log(this)
    //     }))
    // }    
}