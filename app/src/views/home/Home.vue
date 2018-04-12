<template>
  <div class="box">
      <!-- 侧边栏 -->
      <side-bar :isCollapse = 'ifopen'></side-bar>
      <div :class="['home-right',ifopen ? '' : 'home-right-change']">
        <!-- 导航栏 -->
        <nav-bar></nav-bar>
        <!-- 链接栏 -->
        <tag-view></tag-view>
        <!-- 业务主体栏 -->
        <app-main></app-main>
      </div>
  </div>
</template>

<script>
// 引入组件
import sideBar from './component/SideBar'
import navBar from './component/NavBar'
import appMain from './component/AppMain'
import tagView from './component/TagsView'
export default {
   name:'layout',
   date(){
      return {

      }
   },
   computed: {
     ifopen(){
        //  console.log('ssss',this.$store.getters)
         return this.$store.getters.sideStatu
     }
   },
   components: {
     sideBar,
     navBar,
     tagView,
     appMain,
   },
   mounted () {
      // console.log(this.ifopen)
   }

}
</script>


<style lang="scss">
.box{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: row;
}
// 右边主体
.home-right{
    width:100%;
    height:100%;
    overflow-x: auto;
    margin-left:60px;
    transition: margin-left .28s;
}
// 和右边主体的距离
.home-right-change{
    margin-left:200px;
}
</style>


