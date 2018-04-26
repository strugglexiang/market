import {
    getLineInAjax,//进货线图
    getBinInAjax,//进货饼图
    getLineOutAjax,//售卖线图
    getBinOutAjax,//售卖饼图
} from '@/ajax/index/indexfen'

import axios from "axios";
import countTo from 'vue-count-to';
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default  {
   methods: {
      //----初始化所有数据
      getAllData(obj){
        axios.all([
            getBinOutAjax(obj),//售卖饼图
            getBinInAjax(obj),//进货饼图
            getLineOutAjax(obj),//售卖线图
            getLineInAjax(obj),//进货线图
        ])
        .then(
            axios.spread((binOutData,binInData,lineOutData,lineInData) => {
                // 所有请求完后执行这里 
                // console.log(binOutData, lineOutData, lineInData)
                // ----------- 售卖饼图数据
                if(binOutData.data.status === '1'){
                    // allWayPriceTotal
                    this.binOut = binOutData.data.result
                    //绘制饼图
                    this.drawBin()
                }else{
                   this.$message({
                       type:'error',
                       message: binOutData.data.msg,
                   })
                }
                 // ----------- 进货饼图数据
                 if(binInData.data.status === '1'){
                    // createdAt payWay total
                    this.binIn = binInData.data.result
                }else{
                   this.$message({
                       type:'error',
                       message: binInData.data.msg,
                   })
                }
                // ----------- 售卖线图数据
                if(lineOutData.data.status === '1'){
                    // createdAt payWay total
                    this.xianOut = lineOutData.data.result
                    this.drawLineOut()
                }else{
                   this.$message({
                       type:'error',
                       message: lineOutData.data.msg,
                   })
                }
                // ----------- 进货线图数据
                if(lineInData.data.status === '1'){
                    // createdAt payWay total
                    this.xianIn = lineInData.data.result
                    this.drawLineIn()
                }else{
                   this.$message({
                       type:'error',
                       message: lineInData.data.msg,
                   })
                }

                // console.log(this.binIn,this.binOut,this.xianOut,this.xianIn)
            })
        )
        .catch(error => {
            console.log(error)
        })
      },
      //----售卖饼图
      getBinOut(obj){
        getBinOutAjax(obj)
        .then(res => {
            if(res.data.status = '1'){
               this.binOut = res.data.result
               this.drawBin()
            }else{
                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
      //----进货饼图
      getBinIn(obj){
        getBinInAjax(obj)
        .then(res => {
            if(res.data.status = '1'){
               this.binIn = res.data.result
            }else{
                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
      //----售卖线图
      getLineOut(obj){
        getLineOutAjax(obj)
        .then(res => {
            if(res.data.status = '1'){
               this.xianOut = res.data.result
               this.drawLineOut()
            }else{
                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
      //----进货线图
      getLineIn(obj){
        getLineInAjax(obj)
        .then(res => {
            if(res.data.status = '1'){
               this.xianIn = res.data.result
               this.drawLineIn()
            }else{
                this.$message({
                    type: 'error',
                    message: res.data.msg
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
      //---- 绘制饼图
      drawBin(){
        // console.log(document.getElementById('bin'))
        // console.log('绘制饼图',this.binOut)
        let data = []
        if(this.binOut.length){
            this.binOut.forEach((item,index,array) => {
                data.push({
                    name:item['_id'],
                    value:item['allWayPriceTotal']
                })
           })
        }else{
            data = [
                {value:0,name:'支付宝'},
                {value:0,name:'微信'},
                {value:0,name:'现金'},
            ]
        }
        // console.log(data)
        let option  = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                left: 0,              // legend 放置在右侧中间。
                top: 0,
                orient: 'center' ,
                data: ['支付宝', '现金','微信']
            },
            series : [
                {
                    name:'结果',
                    type: 'pie',
                    radius : '65%',
                    center: ['60%', '50%'],
                    selectedMode: 'single',
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        this.binChart.setOption(option)
      },
      //---- 绘制销售线图
      drawLineOut(){
          //createdAt total content
        //   console.log(this.xianOut)
          let x = []
          let y = []
          this.xianOut.forEach((item,index) => {
              x.push(new Date(Date.parse(item.createdAt)).toLocaleString())
              y.push(item.total)
          })
        //   console.log(x)
          let option = {
            title: {
                text: '销售情况统计',
                left: 'center',
                top:5,
                textStyle: {
                    color: '#2c343c'
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: {
                name:'订单时间',
                data: x
            },
            yAxis: {
                name:'交易额',
                type: 'value'
            },
            series: [{
                data: y,
                type: 'line',
                // smooth: true
            }]
          };
          this.outLIneChart.setOption(option)
      },
      //---- 绘制进货线图  
      drawLineIn(){
        let x = []
        let y = []
        this.xianIn.forEach((item,index) => {
            x.push(new Date(Date.parse(item.createdAt)).toLocaleString())
            y.push(item.total)
        })
      //   console.log(x)
        let option = {
          title: {
              text: '进货情况统计',
              left: 'center',
              top:5,
              textStyle: {
                  color: '#2c343c'
              }
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          xAxis: {
              name:'订单时间',
              data: x
          },
          yAxis: {
              name:'交易额',
              type: 'value'
          },
          series: [{
              data: y,
              type: 'line',
              // smooth: true
          }]
        };
        this.inLineChart.setOption(option)  
      }, 
      //------- 绘图区域大小变化后 
      drawBoxChange(){
        // console.log('触发了重绘',this.binChart,this.binChart,this.binChart)
        this.binChart.resize();
        this.outLIneChart.resize();
        this.inLineChart.resize();
      },
   },
   computed: {
       //售出总额   
       allOut(){
          let all = 0
          this.binOut.forEach((item,index,array) => {
              all += item.allWayPriceTotal
          })
        //   console.log(this.binOut)
          return all 
       },
       //进货总额
       allIn(){
        let all = 0
        this.binIn.forEach((item,index,array) => {
            // console.log(item)
            all += item.allWayPriceTotal
        })
        return all 
       }
   },
   components: { countTo },
}
