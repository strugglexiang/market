<template>
  <div class="box">
       <div class='ctrl-bt'>
            <el-tooltip class="item" effect="dark" content="点击编辑" placement="left">
               <el-button  type="primary" icon="el-icon-edit" circle @click="clickEdit"></el-button>
            </el-tooltip> 
            <el-tooltip class="item" effect="dark" content="退出编辑" placement="left">
              <el-button type="warning" icon="el-icon-star-off" circle @click="cancleEdit"></el-button>
            </el-tooltip> 
       </div>
       <div>
          <el-form ref="ruleForm" :model="ruleForm" :rules='rules' label-width="120px" label-position='right'>
              <el-form-item label="用户名" prop="userName">
                <el-input class ='modalInput' v-model="ruleForm.userName" :disabled = 'allowEdit'></el-input>
              </el-form-item> 
              <el-form-item label=性别 prop="sex">
                  <el-radio-group v-model="ruleForm.sex" :disabled = 'allowEdit'>
                    <el-radio  :label='1 ' border >男</el-radio>
                    <el-radio  :label="2" border >女</el-radio>
                  </el-radio-group>                  
              </el-form-item>   
              <el-form-item label="联系电话" prop="tel" >
                <el-input class ='modalInput' v-model="ruleForm.tel" :disabled = 'allowEdit'></el-input>
              </el-form-item>     
              <el-form-item>
                <el-button type="primary" @click="submitForm" v-if='!allowEdit'>点击修改</el-button>
                <!-- <el-button @click="resetForm" v-if='!allowEdit'>重置</el-button> -->
              </el-form-item>                                                               
          </el-form>  
       </div>
  </div>
</template>

<script>
import {
  updatePersonalDataAjax,//修改资料
  getUserInfoAjax,//获取个人资料
} from '@/ajax/setting'

export default {
   data(){
     return {
          allowEdit:true,
          ruleForm:{
             userName:'',//
             tel:'',
             sex:'',
          },
          rules:{
             userName:[{ required: true, message: '用户名不能为空', trigger: 'blur'}],
             tel:[{ required: true, message: '联系电话不能为空', trigger: 'blur'}],
             sex:[{ required: true, message: '性别不能为空', trigger: 'change'}],
          },        
     }
   },
   methods: {
    //  ---------------------- 控制编辑和退出编辑
     clickEdit(){
        this.allowEdit = false
     },
     cancleEdit(){
        this.allowEdit = true
        this.getSelfInfo()
     },
     //----------------------- 表单提交与重置
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
              //  console.log(this.ruleForm)
            this.updatePersonalData(this.ruleForm)
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
          this.$refs['ruleForm'].resetFields();
          this.getSelfInfo()
      },     
     //----------------------- 接口分离
     //获取个人资料
      getSelfInfo(obj){
         getUserInfoAjax()
         .then(res => {
            //  console.log(res)
             if(res.data.status === '1'){
                 this.ruleForm.userName = res.data.result[0].userName
                 this.ruleForm.sex = res.data.result[0].sex
                 this.ruleForm.tel = res.data.result[0].tel
             }else{
               this.$message({
                  type:'error',
                  message:res.data.msg,
                  duration:1000
               })
             }
         })
         .catch(error => {
         })
      },
      //修改个人资料
      updatePersonalData(obj){
         updatePersonalDataAjax(obj)
         .then(res => {
             if(res.data.status === '1'){
                this.$message({
                  type:'success',
                  message:res.data.msg,
                  duration:1000
                })
                this.cancleEdit()
             }else{
               this.$message({
                  type:'error',
                  message:res.data.msg,
                  duration:1000
               })
             }
         })
         .catch(error => {
         })        
      }
   },
   mounted () {
      this.getSelfInfo()
   }
}
</script>

<style lang="scss" scoped>
// ---- 总盒子
.box{
   max-width: 500px;
   padding:20px;
   margin:50px 0px 30px 80px;
   border:1px solid #ccc;
   display: flex;
   flex-direction: row;
}

.ctrl-bt{
  width:60px;
  .item{
      margin: 12px;
  }
}

</style>