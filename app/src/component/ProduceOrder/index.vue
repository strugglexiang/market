<template>
  <div class="box">
      <!-- 左侧商品  -->
      <div class="left-box">
         <!-- 搜索框 -->
         <div class="search-box">
             <input ref='search' type="text" placeholder="名称、类型、价格、数量" v-model="input" class="search">
             <span class="icon1 el-icon-search"></span>
             <div v-show='showclear' @click="clickX">
                 <span class="icon2 el-icon-circle-close"></span>
             </div>
         </div>
         <!-- 显示商品 -->
         <div class="content-box">
            <div
              class="row"
              v-for='(item,index) in goods'
              :key = 'index'
            > 
                <!-- 商品图片 -->
                <div class="img">
                    <img :src="imgUrl + item.picUrl" alt="商品图片">
                </div>
                <!-- 商品信息 -->
                <div class="detail">
                    <p>{{item.goodName}}</p>
                    <p class="remark">{{item.remark}}</p>
                    <p class="num">库存:{{item.num}}</p>
                    <p class="price">￥:{{item.price}}</p>
                </div>
                <!-- 添加至订单详情 -->
                <div class="add">
                    <i @click ='addToContent(item)' class="icon el-icon-success"></i>
                </div>            
            </div>
         </div>
         <!-- 分页 -->
         <div class="pagination-box">
            <el-pagination
            small
            layout="prev, pager, next"
            @current-change='changePageNo'
            :current-page.sync="listQuery.pageNo"
            :page-size="listQuery.pageSize"
            :total="totalcount">
            </el-pagination>             
         </div>
      </div>
      <!-- 中间图标 -->
      <div class="center-box">
          <div class="icon-box">
              <i class="icon el-icon-d-arrow-right"></i>
          </div>
      </div>
      <!-- 右侧订单 -->
      <div class="right-box">
          <!-- 标题 -->
         <div class='title-box'>
             {{title}}
         </div>
         <!-- 支付方式 -->
         <div class="payway-box">
            <div class="payWay-box">
                <el-select v-model="currentPayWay" placeholder="请选择支付方式">
                    <el-option
                    v-for="item in payWay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>            
            </div>
         </div>
         <!-- 显示框 -->
         <div class='detail-order'>
            <div
              class="row"
              v-for='(item,index) in detail'
              :key = 'index'
            >    
               <!-- 从订单删除 -->
               <div class="del">
                   <i class="icon el-icon-remove" @click='delOrderRow(item,index)'></i>
               </div>
               <!-- 图片 -->
               <div class="img">
                   <img :src="imgUrl + item.picUrl" alt="商品图片">
               </div>
               <!-- 详情 -->
               <div class="detail">
                    <p>{{item.goodName}}</p>
                    <p class="price">单价:{{item.price}}</p>
               </div>
               <!-- 数量加减 -->
               <div class="numchange">
                   <div class="price">￥{{item.number * item.price}}</div>
                   <div class="change">
                      <input 
                        type="number"
                        min='1'
                        :max='item.num'
                        v-model="item.number"
                        @blur="checkNum(item,index)"
                      >
                   </div>
               </div>        
            </div>
         </div>
         <!-- 底部计算 -->
         <div class="count-box">
             <!-- 总价 -->
            <div class="left">
               <span>总价：￥{{totalPrice}}</span>
            </div>
            <!-- 结算 -->
            <div class="right" @click="pay">
                 生成订单
            </div>
         </div>
      </div>
  </div>
</template>


<script>
import  api from '@/api'
export default {
   data(){
       return {
            imgUrl:api.getApiUrl(),
            //---- 左侧
            input:'',//搜索框
            total:0,
            listQuery:{
                pageSize:5,
                pageNo:1,
            },
            //---- 中部
            //---- 右侧
            detail:[],
            currentPayWay:'现金',
            payWay:[
              {
                  label:'支付宝',
                  value:'支付宝'
              },
              {
                  label:'微信',
                  value:'微信'
              },
              {
                  label:'现金',
                  value:'现金'
              },
            ]            
       }
   },
   props:{
      goods:{
          type:Array,
          default:function(){
              return []
          }
      },
      totalcount:{
          type: Number,
        //   default:5
      },
      title:{
          type: String
      },
   },
   computed: {
       //搜索框图表    
       showclear(){
          return this.input.trim().length
       },
      //订单单个商品总价
      totalPrice(){
        let sum = 0
        this.detail.forEach(item => {
            sum += item.number * item.price
        });
        return sum
      },
      //当前订单已有商品
      orderHave(){
          let all = []
          this.detail.forEach((item) => {
              all.push(item.goodName)
          })
          return all
      }   
   },
   methods: {
    // -------  生成订单
    pay(){
          this.$confirm("您仔细检查后确认生成订单吗?", "订单生成", {
            type: "warning"
          })
          .then(() => {
            //   total
            //   content  goodName num price all
            //   paWay
                // console.log(this.totalPrice)
                // console.log(this.currentPayWay)            
                let obj = {
                    total: this.totalPrice,
                    payWay: this.currentPayWay,
                    content:[]
                }
                this.detail.forEach((item,index,array) => {
                    obj.content.push({
                        goodName:item.goodName,
                        num:item.number,
                        price:item.price,
                        all: item.number * item.price
                    })
                })
                // console.log(obj)
                this.$emit('addOrder',obj)

          })
          .catch(() => {
          })
    },
    //------ 初识化整个组件数据
    clear(){
        this.currentPayWay = '现金'
        this.detail = []
        this.input = ''
        this.listQuery.pageSize = 5
        this.listQuery.pageNo = 1
        this.getGoods(this.listQuery)
    },
    // -----订单项脱胶检测
    checkNum(row,index){
        // console.log(row)
        if(Number.parseInt(row.number) > row.num){
            this.detail[index].number = 1
        }
    },
    // --- 添加到订单详情
    addToContent(row){  
        // console.log(this.orderHave)
       if(!this.orderHave.includes(row.goodName)){
           let obj = {
               ...row
           }
           obj.number = 1 
           this.detail.push(obj)   
       }
    },
    //--- 删除订单详情项
    delOrderRow(row,index){
        this.detail.splice(index,1)
    } ,
    // --- 点击X
    clickX(){
       this.input = ''
    },
    // ---- 页数改变
    changePageNo(val){
        // console.log(val)
        this.listQuery.pageNo = val
        this.getGoods(this.listQuery)
    },
    getGoods(obj){
       this.$emit('getGoods',obj)
    }
   },
   watch: {
       input(str){
          if(!str.length){
              str = null
          }
          this.listQuery.keyword =  str
          this.listQuery.pageNo = 1
          this.jieliu(this.getGoods,this.listQuery)
       },
   },
   mounted(){
    //    this.$emit('getGoods',this.listQuery)
    //    console.log(this.goods)
   }
}
</script>


<style lang="scss" scoped>
//-------------------------  总盒子
.box{
        // border:1px solid #ccc;
    margin:15px;
    width: 800px;
    height: 600px;
    padding:15px;
    display: flex;
    flex-direction: row;
}
//------------------------- 左侧商品
.left-box{
    flex: 1;
    height:100%;
    padding-top:10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    border:1px solid #ccc;
    // background: red
}
//搜索
.search-box{
    position: relative;
    .icon1{
        position: absolute;
        left: 40px;
        top: 11px;
        color:#ccc;
    }
    div{
        width:30px;
        height:35px;
        line-height: 35px;
        cursor: pointer;
        position: absolute;
        top:0px;
        right:30px;
        .icon2{
            color:#ccc;
        }
    }
}
.search{
    width: 250px;
    outline: none;
    height:35px;
    line-height: 35px;
    border-radius: 30px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    font-size:13px;
    padding-left:35px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    &:focus{
        // outline: none;
        color: #606266;
        border-color: #409eff;
    }
    &::-webkit-input-placeholder { /* WebKit browsers */
        color:    #ccc;
    }
    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #ccc;
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #ccc;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #ccc;
    }    
}
//---- 内容部分
.content-box{
  flex: 1;
  margin-top:5px;
  border-top:1px solid #ccc;
  .row{
        width: 100%;
        border-top:1px solid #ccc;  
        box-sizing: border-box;
        padding:10px;
        display: flex;
        flex-direction: row;
        text-align: left;
        .img{
            width:70px;
            img{
                width:70px;
                height:70px;
            }
        }
        .detail{
        //    width:200px;
           text-align: left; 
           padding-left: 10px;
           font-size:14px;
           font-weight: 600;
           color: #131D26;
           .remark{
              color:darkgray;
              width: 168px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow:ellipsis;
                
           }
           .price{
               color:#f01414;
               margin-left:10px;
           }
           .num{
               color:darkgray;
           }
        }
        .add{
           width:80px;
           position:relative;
           .icon{
               position: absolute;
               bottom:10px;
               right:10px;
               cursor: pointer;
               color:#00B33F;
           }
        }          
  }
} 

//---- 分页
.pagination-box{
  border-top:1px solid #ccc;
  padding:10px 0px;
}
// ------------------------- 中间图表
.center-box{
    width:100px;
    height:100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon{
        font-size: 30px;
        color:#606266;
    }
}
// -------------------------- 右侧订单
.right-box{
    flex: 1;
    height:100%;
    // padding-bottom:10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    border:1px solid #ccc;
}
//标题
.title-box{
    // background:#FF5E52;
    background: #40B883;
    padding:10px;
    color:#fff;
    font-weight: 400;
}
.payway-box{

}
//订单内容
.detail-order{
  flex: 1;
  border-top:1px solid #ccc;
      overflow: auto;
  .row{
        width: 100%;
        border-top:1px solid #ccc;  
        box-sizing: border-box;
        padding:10px;
        display: flex;
        flex-direction: row;
        text-align: left;    
        .del{
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;
            margin-right:10px;
           .icon{
               color: #FF5E52;
               cursor: pointer;
           }
        }   
        .img{
            width:70px;
            img{
                width:70px;
                height:70px;
            }
        }
        .detail{
           width:70px;
           padding-left: 10px;
           font-size:14px;
           font-weight: 600;
           color:#444;
           line-height: 32px;
        }
        .numchange{
           flex:1;
           position: relative;
           div{
               position: absolute;
               height:100%;
           }
           .price{
               right:100px;
               line-height: 72px;
            //    color: #FF5E52;
               color:#f01414;
               font-weight: 600;
           }
           .change{
               width:100px;
               right:0px;
               line-height: 70px;
               text-align: right;
               input{
                   width:80px;
               }
           }
        }
  }
}
//结算
.count-box{
  display: flex;
  flex-direction: row;
  background: #131D26;
  color:#fff;
  font-weight: 600;
  height:45px;
  line-height: 45px;
  .left{
     flex: 1;
     text-align: left;
     padding-left:15px;
  }
  .right{
     width:100px;
     background:#00B33F;
     cursor: pointer;
    -webkit-user-select: none;
      user-select: none;
  }
}
</style>
