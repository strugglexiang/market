<template>
  <div class="login-container">
      <!-- form表单 -->
      <el-form ref="form" :model="form" :rules="rules"  class="form" label-position="left">
          <div class="title-box">
              <h1 class="title">维星超市管理系统</h1>
          </div>
          <!-- 部门 -->
          <el-form-item prop="part">  
            <el-select v-model="form.part" placeholder="请选择所属部门">
                <el-option 
                  v-for = '(item,index) in partChoose'
                  :key = "'partChoose' + index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
            </el-select>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item  prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名">
                  <i slot="prefix" class="fa fa-user-plus user-cion" ></i>
              </el-input>
          </el-form-item>          
          <!-- 密码 -->
          <el-form-item prop="password" >
              <el-input :type='passType' v-model="form.password"
                placeholder="请输入密码"
              >
                 <i slot="prefix" class="fa fa-spin fa-lock pass-cion-before" ></i>
                 <i slot="suffix" @click = 'showpass' class="fa  fa-eye pass-cion-after" ></i>
              </el-input>
          </el-form-item> 
          <!-- 提交 -->
          <div class="bt-box">
             <el-button class="bt"  :loading="loading" type="primary" @click="submitForm">LOGIN</el-button>     
          </div>
      </el-form>
  </div>
</template>


<script>
import api from '@/api'
export default {
   data(){
       return {
          passType:"password",
          loading:false,
          partChoose:[
            {
                label:'总部',
                // value:'http://localhost:2501',
                value:'http://127.0.0.1:2501'
            },              
            {
                label:'洪山桥部',
                value:'http://127.0.0.1:2502',
                // value:'http://localhost:2501'
            },
          ],//部门选择
          form:{
              part:'',//部门
              userName:'',//用户名
              password:'',//电话
          },
          rules:{
             part:[
                 { required: true, message: '请选择所属部门', trigger: 'change' },   
             ],
             userName:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
             ], 
             password:[
                { required: true, message: '请输入输入密码', trigger: 'blur' },
             ],
          }
       }
   },
   methods:{
      submitForm(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // console.log(this.form)
              api.setApiUrl(this.form.part)
            //   console.log(api.getApiUrl())
              this.loading = true
              this.$store.dispatch('action_loginByUserName',this.form)
              .then(res => {
                //   console.log(res)
                  if(res.data.status === '1'){
                      this.$message({
                          type:'success',
                          duration:1000,
                          message:res.data.msg
                      })
                      //登录成功后
                      this.$router.push({ path: "/" });
                      /**
                       * 1.总部 存1
                       * 2.洪山分部 存2 
                       */
                      if(this.form.part === 'http://127.0.0.1:2501'){
                           sessionStorage.setItem('apiUrl',1)
                      }else if (this.form.part === 'http://127.0.0.1:2502'){
                           sessionStorage.setItem('apiUrl',2)
                      }
                      this.loading = false
                  }else{
                      this.$message({
                          type:'error',
                          duration:1000,
                          message:res.data.msg
                      })
                      this.loading = false
                  }
              })
              .catch(err => {
                //   console.log('我运行了这里')
                //   console.log(err)
                 this.loading = false
              })
            this.$router.push({ path: "/" });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });          
      },
      showpass(){
        if (this.passType === 'password') {
            this.passType = ''
        } else {
            this.passType = 'password'
        }
      }
   },
}
</script>


// <style lang="scss" scoped>
//----- 变量和引用申明
$bg:#2d3a4b;
@mixin icon {        
    cursor: pointer;
    line-height:28px;
    color: $bg;
}
//------ 书写样式
.el-input{
    width:350px;
}
.el-select{
    width:350px;
}
.el-form-item {
    display: flex;
    justify-content: center;
}
.login-container {
    position: fixed;
    width:100%;
    height:100%;
    background-color: $bg;
    .title-box{
        color:#eee;
        display: flex;
        justify-content: center;
        font-size:15px;
        margin-bottom:22px;
        .title{
              -webkit-user-select: none;
              user-select: none;
        }
    }
    .bt-box{
        display: flex;
        justify-content: center;
        .bt{
        width:350px;
        margin:auto;
        }
    }
    .pass-cion-after{
        margin-right:5px;
        @include icon
    }
    .user-cion{
       width:20px;
       @include icon 
    }
    .pass-cion-before{
         width:20px;
        @include icon  
    }
}
.form{
   position: absolute;
   left:0;
   right:0;
   margin:120px auto;
   width:450px;
   padding:15px;
}
</style>


