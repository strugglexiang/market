<template>
  <div class="box">
          <el-form ref="ruleForm" :model="ruleForm" :rules='rules' label-width="120px" label-position='right'>
              <el-form-item label="请输入旧密码" prop="oldPassword">
                <el-input  :type= 'passType.oldPassword' class ='modalInput' v-model="ruleForm.oldPassword" >
                   <i slot="suffix" @click = 'showpass("oldPassword")' class="fa  fa-eye icon-eye" ></i>
                </el-input>
              </el-form-item>
              <el-form-item label="请输入新密码" prop="newPassword">
                <el-input  :type= 'passType.newPassword' class ='modalInput' v-model="ruleForm.newPassword" >
                     <i slot="suffix" @click = 'showpass("newPassword")' class="fa  fa-eye icon-eye" ></i>
                </el-input>
              </el-form-item> 
              <el-form-item label="请确认新密码" prop="againPassword">
                <el-input   :type= 'passType.againPassword' class ='modalInput' v-model="ruleForm.againPassword" >
                     <i slot="suffix" @click = 'showpass("againPassword")' class="fa  fa-eye icon-eye" ></i>
                </el-input>
              </el-form-item>     
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="点击修改" placement="left">
                  <el-button  type="warning" icon="el-icon-edit" circle @click="submitForm"></el-button>
                </el-tooltip> 
                <!-- <el-button type="primary" @click="submitForm" >点击修改</el-button> -->
                <el-button @click="resetForm" >重置</el-button>
              </el-form-item>                                                               
          </el-form>        
  </div>
</template>

<script>
import {
     validateOldPassAjax,//检测旧密码
     updatePersonalDataAjax,//自己修改自己密码
} from '@/ajax/setting'

export default {
   data(){
     var validate1 = (rule, value, callback) => {
         if(!value.length){
            callback(new Error('旧密码不能为空'));
         }else{
           this.validateSelfOldPass({keyword: value}, callback)
         }
     } 
     var validate2 = (rule, value, callback) => {
        if(!value.length){
            callback(new Error('新密码不能为空'));
         }else{
            if(!this.ruleForm.oldPassword.length){
              this.$refs.ruleForm.validateField("oldPassword");
            }
            if(this.ruleForm.oldPassword === this.ruleForm.newPassword){
                callback(new Error('新密码和旧密码相同'));
            }else{
                callback();
            }
         }
     } 
     var validate3 = (rule, value, callback) => {
        if(!value.length){
            callback(new Error('确认新密码不能为空'));
         }else{
            if(!this.ruleForm.oldPassword.length){
              this.$refs.ruleForm.validateField("oldPassword");
            }else if(!this.ruleForm.newPassword.length){
              this.$refs.ruleForm.validateField("newPassword");
            }else{
                if(this.ruleForm.newPassword !== this.ruleForm.againPassword){
                   callback(new Error('新密码和确认新密码不一致'));
                }else{
                    callback();
                }
            }
            
         }
     }     
     return {
          passType:{
            oldPassword:'password',
            newPassword:'password',
            againPassword:'password'
          },
          ruleForm:{
             oldPassword:'',//
             newPassword:'',
             againPassword:'',
          },
          rules:{
             oldPassword:[{ required: true,validator: validate1,  trigger: 'blur'}],
             newPassword:[{ required: true, validator: validate2, trigger: 'blur'}],
             againPassword:[{ required: true,validator: validate3,  trigger: 'blur'}],
          },   
     }
   },
   methods: {
     //----------------------- 表单提交与重置
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
              this.updatePersonalData({password:this.ruleForm.againPassword})
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
          this.$refs['ruleForm'].resetFields();
      }, 
      showpass(str){
        //  console.log(str)
        this.passType[str] = this.passType[str] === 'password' ? 'text' : 'password'
      },
     //----------------------- 接口分离
     //验证旧密码
      validateSelfOldPass(obj,callback){
         validateOldPassAjax(obj,callback)
         .then(res => {
            //  console.log(res)
             if(res.data.status === '1'){
              //   this.$message({
              //     type:'success',
              //     message:res.data.msg,
              //     duration:1000
              //  })
               return callback();
             }else{
              //  this.$message({
              //     type:'error',
              //     message:res.data.msg,
              //     duration:1000
              //  })
               return callback(new Error(res.data.msg));
             }
         })
         .catch(error => {
             console.log(error)
         })
      },
      //修改个人资料(可以修改密码)
      updatePersonalData(obj){
         updatePersonalDataAjax(obj)
         .then(res => {
             if(res.data.status === '1'){
                this.$message({
                  type:'success',
                  message:'修改密码成功',
                  duration:1000
                })
                this.resetForm()
             }else{
               this.$message({
                  type:'error',
                  message:res.data.msg,
                  duration:1000
               })
             }
         })
         .catch(error => {
            console.log(error)
         })        
      }

   },
   mounted () {
     
   }
}
</script>

<style lang="scss" scoped>
.box{
   max-width: 500px;
   padding:20px;
   margin:50px 0px 30px 80px;
   border:1px solid #ccc;
   .icon-eye{
      margin-right:5px;
      cursor: pointer;
      line-height:28px;
      color: seagreen
   }
}
</style>