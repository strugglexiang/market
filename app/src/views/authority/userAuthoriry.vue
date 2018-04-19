<template>
  <div class = 'au-box'>
      <!-- 侧边用户列表 -->
      <el-tabs v-model="activeUser" class="tab-box"  tabPosition="left"  @tab-click="handleClick">
        <el-tab-pane 
          v-for = '(item,index) in users'
          :key = '"item.userName" + index'
          :label="item.userName" 
          :name="item['_id']"
          >
             <!-- {{item.userName}} -->
              <el-tree
                 class="auTree"
                 :data="tree[index]"
                 :props="treedefaultProps" 
                 show-checkbox 
                 node-key="auCode"
                 :default-checked-keys="defaultChecked[index]"
                  @node-click="handleNodeClick" 
                  @check-change="handleCheckChange"
              >
              </el-tree>
          </el-tab-pane>
      </el-tabs>  
       <!-- 授权按钮  -->
       <div class='bt-box'>
           <el-tooltip class="item" effect="dark" content="点击授权" placement="bottom">
               <el-button  type="success" icon="el-icon-check" circle @click="giveAu"></el-button>
           </el-tooltip>          
       </div>
  </div>
</template>

<script>
import _ from 'underscore'
import minx from './minx'
import Vue from 'vue'
export default {
   mixins: [minx],
   data(){
     return {
        activeUser:'',
        users:[],
        //--- 树形控件
        treedefaultProps:{
          // children: 'sonList',
          label: 'auName'
        },
        tree:{},//树
        treeindex:null,//当前树
        defaultChecked:{},//默认勾选
     }
   },
   methods:{
      //------------ tabs相关
      handleClick(tab, event){
          // console.log(typeof tab.index)
         this.treeindex = Number.parseInt(tab.index); 
         this.getAuthority({id:this.activeUser},this.treeindex)
      },
      // ----------- tree相关
      handleNodeClick(data) {
        // console.log(data);
        // console.log(event.target)
        // console.dir(event.target.children)
      },  
      handleCheckChange(data,checked,indeterminate){
        /**
         * 1.传递给 data 属性的数组中该节点所对应的对象、
         * 2.节点本身是否被选中、
         * 3.节点的子树中是否有被选中的节点 
         */
        // console.log(data,this.treeindex,checked)
        if(checked){
           this.defaultChecked[this.treeindex].push(data.auCode)
        }else{
           this.defaultChecked[this.treeindex] = _.without(this.defaultChecked[this.treeindex],data.auCode)
        }
        //  console.log(this.defaultChecked[this.treeindex])
      },
      // ------------ 授权按钮
      giveAu(){
          let temp = Array.from(new Set(this.defaultChecked[this.treeindex]))
          console.log('最后的提交',temp)
          this.giveAuthority({
            id:this.activeUser,
            giveObj:temp
          })
      }
   },
   mounted () { 
      this.getUser()
   }
}
</script>

<style lang="scss" scoped>
.au-box{
  // min-height: 600px;
  // max-height:700px;
  padding:15px;
  position: relative;
}
.tab-box{
  height:500px;
  // max-height: 550px!important;
  // overflow-y: auto;
  margin:10px 20px 20px 20px;
}
.el-tabs--left, .el-tabs__header,.is-left{
  border:3px dotted #aaa;
  // max-width: 800px;
  // width:80%;
  // margin:auto;
}
// .tab-box::-webkit-scrollbar {
//     display: none;
// }

// ----- 树形控件
.auTree{
  // background:red;
  width:150px;
  padding:15px;
  margin:30px 0px 0px 50px;
  border:1px solid saddlebrown;
}
// ------ 授权按钮
.bt-box{
  position: absolute;
  left:240px;
  top:230px;
}



</style>