import {
    getGoodsAjax,//获取商品
    addGoodsAjax,//添加商品
    updateGoodsAjax,//修改商品
    delGoodsAjax,//删除商品
    addGoodsPicAjax,//上传商品图片
} from '@/ajax/goods/allGoods'
import {
    getGoodsTypeAjax,//获取商品类型 
} from '@/ajax/goods/goodsType'

import api from '@/api'

export default {
    data(){
       return {
        upUrl:api.getApiUrl()+'/goods/upload',//上传地址
        headers:{
            authorization: sessionStorage.getItem("token")
        },//设置上传的请求头部
        AddfileList:[],//上传列表
        AddHavePic:false,//是否已经选择了一个文件
        EditfileList:[],//上传列表
        EditHavePic:true,//是否已经选择了一个文件
       }
    },
    methods:{
        // 查询商品
        queryGoods(obj){
            // console.log(obj)
            this.listLoading = true
            getGoodsAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    // this.$message({
                    //     type:'success',
                    //     duration:1000,
                    //     message:res.data.msg
                    // })  
                    this.goods = res.data.result
                    this.goods.forEach((item,index,array) => {
                        item.picUrl = api.getApiUrl() + item.picUrl
                    })
                    this.total = res.data.count
                    this.listLoading = false
                    // console.log(this.goods)
                }else{
                    this.$message({
                        type:'error',
                        duration:1000,
                        message:res.data.msg
                    })
                    this.goods = res.data.result
                    this.total = res.data.count
                    this.listLoading = false
                }
            })
            .catch(error => {
                console.log(error)
                this.listLoading = false
            })
        },
        //添加商品
        addGoods(obj){
            // console.log(obj)
            if(!this.addForm.picUrl.length){
                return this.$message({
                    type:'error',
                    duration:1000,
                    message:'请上传商品图片'
                })
            }
            addGoodsAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:1000,
                        message:res.data.msg
                    })
                    this.showAddModal = false
                    this.queryGoods(this.listQuery)
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
        //修改商品
        updateGoods(obj){
            if(!this.editForm.picUrl.length){
                return this.$message({
                    type:'error',
                    duration:1000,
                    message:'请上传商品图片'
                })
            }            
            // console.log(obj)
            updateGoodsAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:1000,
                        message:res.data.msg
                    })
                    this.showEditModal = false
                    this.queryGoods(this.listQuery)
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
        //删除商品
        delGoods(obj){
            // console.log(obj)
            delGoodsAjax(obj)
            .then(res => {
                // console.log(res)
                if(res.data.status === '1'){
                    this.$message({
                        type:'success',
                        duration:1000,
                        message:res.data.msg
                    })  
                    this.listQuery.pageNo = 1
                    this.queryGoods(this.listQuery)                 
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
       //获取商品类型   
        queryGoodsType(obj){
            // console.log(obj)
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
                    this.goodsType = res.data.result
                    // console.log(this.users)
                }else{
                    // console.log('我还是运行到了这里')
                    this.$message({
                        type:'error',
                        duration:2000,
                        // message:'获取商品类型失败'
                        message:res.data.msg
                    })
                    this.goodsType = res.data.result
                }
            })
            .catch(error => {
                console.log(error)
            })
        },  
       //--------------------------------添加图片上传相关
        // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
        AddHandlePreview(file) {
        // console.log(file);
        },
        // 移除文件列表
        AddHandleRemove(file, fileList) {
            // console.log(file,fileList)
            this.addForm.picUrl = ''
        },
        // 上传成功
        AddUpSuccess(res, file) {
            // console.log("上传成功",file,this.AddfileList);
            // console.log(this.AddfileList)
            // this.AddfileList.push(file);
            this.addForm.picUrl = file.response.result
        },
        //上传失败
        AddUpFailHandle(err, file, fileList) {
            // console.log('上传失败',err);
            this.$message({
                type:'error',
                msg:'图片上传失败，通知管理人员检查'
            })
        }, 
      // 文件状态改变 
        AddHandleChange(file){
            //  console.log(file)
            // document.getElementById("audio_id").src = file.url;
            if(file.status === 'ready'){
                this.AddHavePic = true
            }
        },   
        //文件超出个数限制时的钩子
        AddHandleExceed(files, fileList) {
            this.$message.warning(
            `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
                fileList.length} 个文件`
            );
        },  
        //点击上传服务器        
        AddUp(){
            if(!this.AddHavePic){
                this.$message({
                    type:'warning',
                    message:'当前没有选择图片'
                })
            }else{
                this.$refs.addUpload.submit(); 
            }
        },
        //--------------------------------编辑图片上传相关
        // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
        EditHandlePreview(file) {
        // console.log(file);
        },
        // 移除文件列表
        EditHandleRemove(file, fileList) {
            // console.log(file,fileList)
            this.editForm.picUrl = ''
            console.log('我移除了',this.editForm.picUrl)
        },
        // 上传成功
        EditUpSuccess(res, file) {
            // console.log("上传成功",file,this.AddfileList);
            // console.log(this.AddfileList)
            // this.AddfileList.push(file);
            this.editForm.picUrl = file.response.result
        },
        //上传失败
        EditUpFailHandle(err, file, fileList) {
            // console.log('上传失败',err);
            this.$message({
                type:'error',
                msg:'图片上传失败，通知管理人员检查'
            })
        }, 
      // 文件状态改变 
        EditHandleChange(file){
            //  console.log(file)
            // document.getElementById("audio_id").src = file.url;
            if(file.status === 'ready'){
                this.EditHavePic = true
            }
        },   
        //文件超出个数限制时的钩子
        EditHandleExceed(files, fileList) {
            this.$message.warning(
            `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
                fileList.length} 个文件`
            );
        },  
        //点击上传服务器        
        EditUp(){
            if(!this.EditHavePic){
                this.$message({
                    type:'warning',
                    message:'当前没有选择图片'
                })
            }else{
                this.$refs.editUpload.submit(); 
            }
        },        
    }, 
  
}