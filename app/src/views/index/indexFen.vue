<template>
  <div class="index-box">
      <!-- 模块标题 -->
      <el-row>
        <el-col :span="24">
            <div class="title-box">
                <h3 class="title">
                        欢迎使用维星超市管理系统，
                        当前部门:
                        <span class="part">
                            {{part}}
                        </span>
                </h3>
            </div>
        </el-col>
      </el-row>
      <!-- 数据总结 -->
      <el-row >
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
            <div >
                 <!-- 销售情况 -->
                 <div class="data-box">
                     <!-- 图标 -->
                     <div class="icon-box">
                         <i class="icon fa fa-leaf fa-3x" ></i>
                     </div>
                     <!-- 文字 -->
                     <div class="text-box">
                        <el-tooltip class="item" effect="dark" content="点击切换" placement="right">
                              <p class="p" @click = 'changeSoldDate'>
                                  <span class="strong">{{sold}}</span>
                                  <span>销售</span>
                              </p>
                        </el-tooltip>                         
                          <p class= 'num'>{{soldNum}}￥</p>
                     </div>
                 </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
            <div >
                 <!-- 销售情况 -->
                 <div class="data-box">
                     <!-- 图标 -->
                     <div class="icon-box">
                         <i class="icon fa fa-ravelry fa-3x" ></i>
                     </div>
                     <!-- 文字 -->
                     <div class="text-box">
                        <el-tooltip class="item" effect="dark" content="点击切换" placement="right">
                              <p  class='p'  @click = 'changeGetDate'>
                                  <span class="strong">{{get}}</span>
                                  <span>进货</span>
                              </p>
                        </el-tooltip>                         
                        <p class= 'num'>{{getNum}}￥</p>
                     </div>
                 </div>
            </div>
        </el-col>
        <!-- 饼状图 -->
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
            <div >
                 <!-- 销售情况 -->
                 <div class="data-box pie-chart">
                     <!-- 文字 -->
                     <div class="text-box">
                        <el-tooltip class="item" effect="dark" content="点击切换" placement="right">
                              <p class='title' @click = 'changePieChartDate'>
                                  <span class="strong">{{pieChartGet}}</span>
                                  <span>商品销量排行</span>
                              </p>
                        </el-tooltip>                         
                     </div>
                     <!-- 图区域 -->
                     <div>
                         
                     </div>
                 </div>
            </div>
        </el-col>    
      </el-row>
      <!-- 图表总结 -->
      <el-row>
        <el-col :span="24">
            <div class="line-box">
                <!-- 本周或日销售情况 -->
                <div class="line-box-sold">
                    
                </div>
            </div>           
        </el-col> 
        <el-col :span="24">
            <div class="line-box">
                <!-- 本周或日进货情况 -->
                <div class="line-box-get">
                   
                </div>                 
            </div>           
        </el-col>                
      </el-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
   data(){
       return {
           sold:'日',//周，日切换
           soldNum:100,//
           get:'日',//周，日切换
           getNum:100,//
           pieChartGet:'日',
       }
   },
   methods:{
      //点击销售切换
      changeGetDate(){
         if(this.get === '日'){
            this.get = '周'
         }else{
            this.get = '日'
         }
      },
      //点击进货切换
      changeSoldDate(){
         if(this.sold === '日'){
            this.sold = '周'
         }else{
            this.sold = '日'
         }
      },
      changePieChartDate(){
         if(this.pieChartGet === '日'){
            this.pieChartGet = '周'
         }else{
            this.pieChartGet = '日'
         }
      }
   },
   computed: {
       part(){
          return api.getPartName()
       },
   },
   mounted(){
    //    console.log('首页已经加载')
    //   console.log(this.$store)
   }
}
</script>


<style lang="scss" scoped>
// -----------  首页总盒子
.index-box{
   background:#EFF1F4;
   padding-bottom: 30px;
//    min-height: 1070px;
}
//------------- 标题
.title-box{
    padding: 15px ;
    -webkit-user-select: none;
    user-select: none;    
    .title{
       margin-left:10px;
       color:#8AC78F;
       font-size:16px;
       text-align: center;
    }
    .part{
       color:darkorange;
       font-size:18px;
       margin-left: 8px;
    }
}

//----------- 图表总结 
.data-box{
//    width:200px;
//    height:80px;
   height:220px;
   margin:auto;
   background:#FEFEFE;
//    border-radius: 15px;
   margin:40px;
   padding:15px;
   display: flex;
   flex-direction: row;
   .icon-box{
         width:80px;
        .icon{
            line-height: 80px;
            color:saddlebrown;
        }
   }
   .text-box{
        width:100%;
        // text-align: center;
        line-height: 40px;
        color:#666;
        font-size:14px;
        // 提示文字
        .item{
            border:1px solid #ccc;//加上边框
            padding:0px 3px 0px 3px;
            cursor: pointer;        
        }
        .p{
            width:65px;
            -webkit-user-select: none;
            user-select: none;            
        }
        // 周、日加粗
        .strong{
            font-size:25px;
            font-weight: 700;
        }
        // 数字按钮
        .num{
           color:#FF5E52;
           font-size:25px;
        }
   }
}

// ----------- 饼状图
.pie-chart{
    // width:300px;
    height:220px;
    border:1px solid #ccc;
    .title{
        width: 120px;
        -webkit-user-select: none;
        user-select: none;           
    }
}  


// ----------- 线状图
.line-box{
    height:280px;
    
}
.line-box-sold,.line-box-get{
    margin:40px 40px 0px 40px;
    // max-width: 1070px;
    // margin:auto;
    margin-top:20px;
    height:100%;
    background: #FEFEFE;
}
</style>



