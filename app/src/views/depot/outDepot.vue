<template>
  <div>
      <!-- 生成订单组件  -->
      <div class="produce-order">
        <produce-Order 
          ref='order'
          @getGoods='getGoods' 
          @addOrder='addOrder'
          :totalcount='goodsTotol' 
          :goods='goods'
          title = '订单详情'
          :depot='depot'
          >
        </produce-Order>
      </div>
  </div>
</template>

<script>
import ProduceOrder from './component/out'
import minx from './minx/outDepot'
export default {
   mixins: [minx],
   data(){
      return {
        goods:[],
        goodsTotol:0,    
        depot:[
          {
            label:'洪山分部',
            value:'洪山分部'
          },
        ]  
      }
   },
   components: { ProduceOrder },
   methods:{
      
   },
   mounted(){
     this.getGoods({
       pageSize:5,
       pageNo:1
     })
    //  console.log(this.$refs)
   }
   
   
}
</script>

<style lang="scss" scoped>
.produce-order{
  margin-left:40px;
}
</style>