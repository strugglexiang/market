import {
    getUserAjax,//获取所有用户
}from '@/ajax/userManagement'

import {
    getAuthorityAjax,//获取用户权限
    giveAuthorityAjax,//授权
}from '@/ajax/authority'
import Vue from 'vue'

export default {
    methods: {
        // ----------------------- 接口分离
        //获取所有用户
        getUser(obj){
            getUserAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                   this.users = res.data.result.filter((item,index,array) => {
                       if(item.isAdmin){
                           return false
                       }else{
                           return true
                       }
                   })
                //    console.log(this.users)
                   this.treeindex = 0
                   this.activeUser = this.users[0]['_id']
                   this.users.forEach((item,index,array) => {
                        Vue.set(this.tree,index, [] )
                        Vue.set(this.defaultChecked,index,[] )
                   })
                   this.getAuthority({id:this.activeUser},0)
                }else{
                    this.$message({
                        type:'error',
                        duration:1000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
               console.log(error)
            })
        },
        //获取用户权限
        getAuthority(obj,index){
            getAuthorityAjax(obj)
            .then(res => {
                if(res.data.status === '1'){
                     this.tree[index] = []
                     this.defaultChecked[index] = []
                     this.tree[index] = res.data.result
                    //  ------ 默认勾选
                     this.tree[index].forEach((item,xuhao,array) => {
                         if(item.isHave){
                            this.defaultChecked[index].push(item.auCode)
                         }
                     })
                    // ------ 所有权限  
                }else{
                    this.$message({
                        type:'error',
                        duration:1000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        //授权
        giveAuthority(obj){
            giveAuthorityAjax(obj)
            .then(res => {
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:1000,
                        message:res.data.msg
                    })
                    // ---- 授权成功后
                    this.getAuthority({id:this.activeUser},this.treeindex)
                }else{
                    this.$message({
                        type:'error',
                        duration:1000,
                        message:res.data.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },

    }
}