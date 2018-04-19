<template>
  <div class="navbox">
      <!-- sideBar控制按钮  -->
      <div class="control-side-bt bticon" @click ='scrollSide'>
         <i :class="[classA , classB , iconIschange? classC :'']" ></i>
      </div>
      <!-- 面包屑导航  -->
      <div class="text-spead">  
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>  
          <transition-group name='fade'>      
          <el-breadcrumb-item 
             v-for='(item,index) in $route.matched'
             :key="'item.path'+index"
             v-if="show"
          >
             <!--  -->
             <!-- <transition name='fade'> -->
                <span v-show="show">{{item.name}}</span>  
             <!-- </transition> -->
          </el-breadcrumb-item>
          </transition-group> 
        </el-breadcrumb>
      </div>
      <!-- 登录等功能按钮  -->
      <div class="use-box">
          <!-- 登录功能 -->
          <div>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                  <img class= 'touxiang' src="@/assets/img/huaji.jpg" alt="头像">
                  <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="退出">退出</el-dropdown-item>
                <!-- <el-dropdown-item command="修改密码">修改密码</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 其他功能 -->
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
       show:true,//面包屑导航动画
       iconIschange:false,
       classA:'fa fa-bars',
       classB:'icon-trans',
       classC:'icon-change'
    }
  },
  methods: {
    //侧边栏隐藏和显示
    scrollSide(){
      // console.log('侧边栏隐藏和显示')
       this.$store.dispatch('sideStatu_action')
       this.iconIschange = !this.iconIschange 
    },
    //点击功能
    handleCommand(command){
      //  console.log(command)
        switch(command){
          case '退出':
            this.$router.push({path:'/login'})
            location.reload()
            break;
          case '修改密码':
            this.$router.push({path:'/upPass'})
            break;  
        }
    }
  },
  watch: {
    $route(to,from){
      //  console.log(to,from)
        this.show = false
        setTimeout(function(){
           this.show = true
        }.bind(this), 400);
    }
  },
  mounted () {
      // console.log(this.$route)
  }
}
</script>


<style lang="scss" scoped>
// ----------总盒子
.navbox{
  width: 100%;
  height:50px;
  position: relative;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
}
.control-side-bt,.text-spead,.use-box{
   height:100%;
   display: flex;
   justify-content: center;
   align-items: center;
}
// --- sideBar控制按钮
.control-side-bt{
   width:42px;
   cursor: pointer;
}
.bticon{
  font-size:20px;
}
.icon-trans{
  transition: all .3 ease 
}
.icon-change{
  transform:rotate(90deg);
}
// --- 面包屑导航
.text-spead{
  max-width: 300px;
  -webkit-user-select: none;
  user-select: none;  
}

// --- 登录等功能按钮
.use-box{
   position: absolute;
   right:10px;  
}
// 头像
.touxiang{
  width: 35px;
  height:35px;
  border:1px solid #ccc;
  border-radius: 50%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .4s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  margin-left:15px;
}
</style>

