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
                          <p class= 'num'>
                              ￥
                              <!-- {{allOut}} -->
                              <countTo :startVal='0' :endVal='allOut' :duration='1000'></countTo>
                          </p>
                     </div>
                 </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
            <div >
                 <!-- 进货情况 -->
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
                        <p class= 'num'>
                            ￥
                            <!-- {{allIn}} -->
                            <countTo :startVal='0' :endVal='allIn' :duration='1000'></countTo>
                        </p>
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
                        <el-tooltip class="item" effect="dark" :content="sold + '统计'" placement="right">
                              <p class='title' >
                                  <span class="strong">{{sold}}</span>
                                  <span>销售支付方式</span>
                              </p>
                        </el-tooltip> 
                        <!-- 图区域 -->
                        <div id="bin">
                            <!-- 123 -->
                        </div>                        
                     </div>
                 </div>
            </div>
        </el-col>    
      </el-row>
      <!-- 图表总结 -->
      <el-row>
        <el-col :span="24">
            <div class="line-box">
                <!-- 本周或月销售情况 -->
                <div class="line-box-sold" id='xianout'>
                    
                </div>
            </div>           
        </el-col> 
        <el-col :span="24">
            <div class="line-box">
                <!-- 本周或月进货情况 -->
                <div class="line-box-get" id='xianin'>
                   
                </div>                 
            </div>           
        </el-col>                
      </el-row>
  </div>
</template>

<script>
import api from '@/api'
import min from './min/indexfen'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
   mixins: [min],
   data(){
       return {
           sold:'日',//周，日切换
           get:'日',//周，日切换
           //------- 数据部分
           binOut:[],
           binIn:[],
           xianOut:[],
           xianIn:[],
          //--------- 
           binChart:null,
           outLIneChart:null,
           inLineChart:null,
       }
   },
   methods:{
      //点击进货切换
      changeGetDate(){
         if(this.get === '日'){
            this.get = '月'
            this.getBinIn({keyword:'month'})
            this.getLineIn({keyword:'month'})
         }else{
            this.get = '日'
            this.getBinIn({keyword:'day'})
            this.getLineIn({keyword:'day'})
         }
      },
      //点击销售切换
      changeSoldDate(){
         if(this.sold === '日'){
            this.sold = '月'
            this.getBinOut({keyword:'month'})
            this.getLineOut({keyword:'month'})
         }else{
            this.sold = '日'
            this.getBinOut({keyword:'day'})
            this.getLineOut({keyword:'day'})
         }
      },
   },
   computed: {
       part(){
          return api.getPartName()
       },
   },
   mounted(){
    //    console.log('首页已经加载')
    //    console.log(this.$store)
       let that = this
       this.getAllData({keyword: 'day'})
      //  binChart  outLIneChart  inLineChart
       this.binChart = echarts.init(document.getElementById('bin'))
       this.outLIneChart = echarts.init(document.getElementById('xianout'))
       this.inLineChart = echarts.init(document.getElementById('xianin'))
      // ---- window窗口变化处理  
       window.onresize = function(){
          that.jieliu(that.drawBoxChange)
       }
      //----- div切换变化
    //   console.log(this.$root.eventHub)
      this.$root.eventHub.$on('drawBoxChange',this.drawBoxChange)
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
        display: flex;
        flex-direction: column;
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
        #bin{
            flex: 1;
            margin-top:7px;
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
    // margin-top:10px;
    height:100%;
    background: #FEFEFE;
    // overflow: scroll;
    // &::-webkit-scrollbar {
    //    display: none;
    // }
}
</style>



