import {
    getUserAjax,//获取所有用户
    addUserAjax,//添加用户
    updateUserAjax,//修改用户
    delUserAjax,//删除用户
} from '@/ajax/userManagement'

export default {
    methods:{
        //获取所有用户
        queryUser(obj){
            // console.log(obj)
            this.listLoading = true
            getUserAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    // this.$message({
                    //     type:'success',
                    //     duration:2000,
                    //     message:res.data.msg
                    // })  
                    // console.log(res.data.result)  
                    //   authority password userName tel sex
                    this.users = res.data.result
                    this.total = res.data.count
                    this.listLoading = false
                    // console.log(this.users)
                }else{
                    this.$message({
                        type:'error',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.users = res.data.result
                    this.total = res.data.count
                    this.listLoading = false
                }
            })
            .catch(error => {
                console.log(error)
                this.listLoading = false
            })
        },
        //添加用户
        addUser(obj){
            // console.log(obj)
            addUserAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.showAddModal = false
                    this.queryUser(this.listQuery)
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
        //修改用户
        updateUser(obj){
            // console.log(obj)
            updateUserAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })
                    this.showEditModal = false
                    this.queryUser(this.listQuery)
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
        //删除用户
        delUser(obj){
            // console.log(obj)
            delUserAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:2000,
                        message:res.data.msg
                    })  
                    this.queryUser(this.listQuery)                 
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