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
          >
        </produce-Order>
      </div>
  </div>
</template>

<script>
import ProduceOrder from './component'
import minx from './minx/addPurchase'
export default {
   mixins: [minx],
   data(){
      return {
        goods:[],
        goodsTotol:0,      
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