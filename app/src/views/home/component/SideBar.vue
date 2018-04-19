<template>
   <div class="sideBarbox">
     <div>
        <el-menu
            class="side el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            router
        >
                <!-- 一级菜单 -->
                <el-submenu 
                   v-for= '(item,index) in route'
                   :key = "'item.name' + index"
                   v-if='!item.hidden'
                   :index = 'item.name'
                >
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span style='padding-left:8px'>{{item.name}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <div
                        v-for = "(item1,index1) in item.children "
                        :key = "'item1.name'+index1"                        
                    >
                        <el-menu-item 
                            v-if = '!item1.hidden'
                            :index = 'item1.path'
                            class="side"
                        >
                            <i :class="item1.icon"></i>
                            <span style='padding-left:8px'>{{item1.name}}</span>
                        </el-menu-item>                         
                    </div>                                          
                </el-submenu>
        </el-menu>           
     </div>
   </div>
</template>

<script>
/**
 * 1. 当前激活菜单的 index
 */
import _ from 'underscore'
export default {
   data(){
       return {
        //   route:[]
       }
   },
   methods:{
   },
   computed: {
       route(){
        //    console.log(this.$store.getters.allRoutes)
           let temp = this.$store.getters.allRoutes.filter((item,index,array) => {
               if(item.name !== '登陆' && item.name !== '主页'){
                 return true
               }
           })
           temp = _.sortBy(temp,(item) => {
               return item.permissionCode
           })
           return temp
       }
   },
   props:{
        isCollapse: {
            type: Boolean,
            default: false,
        },
   },
   mounted () {
    //    console.log(this.$router.options.routes)
    //    this.route = this.$router.options.routes.filter((item,index,array) => {
    //          if(item.name !== '登陆' && item.name !== '主页'){
    //              return true
    //          }  
    //    })
    //    console.log(this.route)
    //    console.log(this.isCollapse)
   }
}
</script>


<style lang="scss" scoped>
$menuBg:#304156;//背景颜色
$subMenuBg:#1f2d3d;//标题颜色
$menuHover:#001528;//hover颜色
.sideBarbox{
    max-width:200px;
    height:100%;
    -webkit-user-select: none;
    user-select: none;
    // position: relative;
    // overflow: hidden;  
}
.sideBarbox>div{
    position: fixed;
    max-width:200px;
    height:100%;    
    z-index: 100;
}
//正常设置
.side{
    width:200px;//默认min-width:200px;
    height:100%;
    // overflow-x: hidden;
    // overflow-y: auto;
    // position: absolute;
    // left: 0;
    overflow-x: hidden;
    overflow-y: scroll;    
}
.side::-webkit-scrollbar {
    display: none;
}

.el-submenu>.el-submenu__title,
.el-submenu .el-menu-item {
    min-width: 180px!important;
    background-color: $subMenuBg!important;
    &:hover {
        background-color: $menuHover!important;
    }
}
.el-menu--collapse .el-menu .el-submenu{
    min-width: 100px!important;
}
//折叠设置
.el-menu--collapse{
    width:60px;
}

</style>
