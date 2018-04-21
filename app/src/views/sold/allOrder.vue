<template>
  <div>
      <!-- 模块标题 -->
      <el-row>
        <el-col :span="24">
            <div class="title-box">
                <h3 class="title">所有订单</h3>
            </div>
        </el-col>
      </el-row>
      <!-- 关键字搜索和添加按钮 -->
      <el-row>
          <el-col :span="24">
              <div class="nav-box" >
                  <div class="bt-box">
                      <el-button @click = 'clickAdd' type="primary" size='small' icon="el-icon-edit">添加订单</el-button>
                  </div>                
                  <div class="input-box">
                      <el-input 
                        class="search-input"  
                        v-model="input" 
                        placeholder="关键字搜索"
                        clearable
                      >
                          <template slot="prepend">关键字</template>
                      </el-input>                    
                  </div>
              </div>
          </el-col>  
      </el-row>      
      <!-- 表格 -->
      <el-row>
        <el-col :span="24">
            <!-- 表格 -->
            <div class="table-box">
                <el-table :data="users" v-loading="listLoading" element-loading-text="拼命加载中" >
                      <el-table-column prop="userName" label="用户名"  sortable>
                      </el-table-column>
                      <el-table-column prop="tel" label="性别"  >
                      </el-table-column>   
                      <el-table-column prop="sex" label="联系电话"  sortable>
                      </el-table-column>                                            
                      <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
                          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
                        </template> 
                      </el-table-column>
                </el-table>  
            </div>
        </el-col>
      </el-row> 
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
            <div class="page-box">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo"
                  :page-sizes="[5,10,15,20,25]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-col>
      </el-row>
      <!-- 添加模态框  -->
      <el-dialog
          title="添加订单"
          :visible.sync="showAddModal"
          width="50%"
      >
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelAddModal">取 消</el-button>
              <el-button type="primary" @click="confirAddModal">确 定</el-button>
          </span>
      </el-dialog>        
      <!-- 修改模态框  -->
      <el-dialog
          title="修改订单信息"
          :visible.sync="showEditModal"
          width="50%"
      >
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelEditModal">取 消</el-button>
              <el-button type="primary" @click="confirEditModal">确 定</el-button>
          </span>
      </el-dialog>         
  </div>
</template>

<script>
import minx from './minx/allOrder.js'
export default {
    mixins: [minx],
    data(){
       return {
          listLoading:false,
          input:null,//关键字搜索
          //  ---- 表格相关
          users:[
            {
              userName:'strugglexiang',
              tel:'123',
              sex:'男'
            }
          ],
          listQuery:{
                pageSize: 7,
                pageNo: 1
          },
          total:null,
          // ---- 模态框
          showAddModal:false,
          showEditModal:false,
       }
    },
    methods:{
       //--------- 表格相关 ----------
       // 点击添加按钮 
       clickAdd(){
          this.showAddModal = true
       },
      // 点击编辑按钮
      handleEdit(index, row) {
        console.log('点击编辑按钮',row)
        this.showEditModal = true
      },
      // 点击删除按钮
      handleDel(index, row){
        // console.log(row)
          this.$confirm("确认删除订单吗?", "提示", {
            type: "warning"
          })
          .then(() => {
             console.log('删除')
          })
          .catch(() => {
            console.log('取消删除')
          })
            
      }, 
      // --------- 分页相关 ----------
      // 每页数量改变
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.queryUser(this.listQuery)
      },
      // 页数改变
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.queryUser(this.listQuery)
      },      
      // --------- 模态框相关 --------
      //取消添加
      cancelAddModal(){
        this.showAddModal = false
      },
      // 确认添加
      confirAddModal(){
        this.showAddModal = false
      },
      //取消编辑
      cancelEditModal(){
        this.showEditModal = false
      },
      // 确认编辑
      confirEditModal(){
        this.showEditModal = false
      },      
    },
    watch:{
      input(str){
          if(!str.length){
              str = null
          }
          this.listQuery.adverName =  str
          this.listQuery.pageNo = 1
          this.jieliu(this.queryUser,this.listQuery)
      }
   }, 
   mounted(){
     this.queryUser(this.listQuery)
   }
}
</script>





<style lang="scss" scoped>
@mixin loyout {        
  max-width:900px;
}
//------------- 标题
.title-box{
    padding: 15px ;
    -webkit-user-select: none;
    user-select: none;    
    .title{
       margin-left:10px;
       color:dimgray;
       font-size:16px;
    }
}

// ---------- 搜索框和添加
.nav-box{
  @include loyout
}
// 添加按钮
.bt-box{
   margin:0px 20px 0px 23px;
   line-height:65px;
   float:right;
}

//  搜索框
.input-box{
  float: left;
}
.search-input{
  width:270px;
  margin:15px 0px 10px 20px;
}
// ----------- 表格
.table-box{
  border:1px solid #ccc;
  margin:0px 20px 20px 20px;  
  @include loyout
}
//  -------- 分页
.page-box{
   margin-left:10px;
}



</style>




