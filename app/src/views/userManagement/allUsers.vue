<template>
  <div>
      <!-- 模块标题 -->
      <el-row>
        <el-col :span="24">
            <div class="title-box">
                <h3 class="title">所有用户</h3>
            </div>
        </el-col>
      </el-row>
      <!-- 关键字搜索和添加按钮 -->
      <el-row>
          <el-col :span="24">
              <div class="nav-box" >
                  <div class="bt-box">
                      <el-button @click = 'clickAdd' type="primary" size='small' icon="el-icon-edit">添加用户</el-button>
                  </div>                
                  <div class="input-box">
                      <el-input 
                        class="search-input"  
                        v-model="input" 
                        placeholder='按用户名或联系电话搜索'
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
                      <el-table-column prop="sex" label="性别"  >
                          <template slot-scope="scope">
                            <el-tag :type="scope.row.sex=== 1?'':scope.row.sex==2?'warning':'info'">
                              {{scope.row.sex=== 1?'男':scope.row.sex==2?'女':'未知'}}
                            </el-tag>
                          </template>                        
                      </el-table-column>  
                       <!-- 添加的时候是必选的  -->
                      <el-table-column prop="tel" label="联系电话"  sortable>
                      </el-table-column>                                            
                      <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
                          <el-button type="danger" size="small" v-if='scope.row.userName !== "hongshan"'  @click="handleDel(scope.$index, scope.row)" >删除</el-button>
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
          title="添加用户"
          :visible.sync="showAddModal"
          width="50%"
      >
          <el-form ref="addForm" :model="addForm" :rules='addRules' label-width="80px" label-position='right'>
              <el-form-item label="用户名" prop="userName">
                <el-input class ='modalInput' v-model="addForm.userName"></el-input>
              </el-form-item> 
              <el-form-item label="用户密码" prop="password">
                <el-input class ='modalInput' v-model="addForm.password"></el-input>
              </el-form-item>   
              <el-form-item label=性别 prop="sex">
                  <!-- <el-select v-model="addForm.sex" placeholder="请选择性别">
                     <el-option label="男" value="1"></el-option>
                     <el-option label="女" value="2"></el-option>
                  </el-select> -->
                  <el-radio-group v-model="addForm.sex">
                    <el-radio :label="1" >男</el-radio>
                    <el-radio :label="2" >女</el-radio>
                  </el-radio-group>                  
              </el-form-item>   
              <el-form-item label="联系电话" prop="tel">
                <el-input class ='modalInput' v-model="addForm.tel"></el-input>
              </el-form-item>                                                      
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelAddModal">取 消</el-button>
              <el-button type="primary" @click="confirAddModal">确 定</el-button>
          </span>
      </el-dialog>        
      <!-- 修改模态框  -->
      <el-dialog
          title="修改用户信息"
          :visible.sync="showEditModal"
          width="50%"
      >
          <el-form ref="editForm" :model="editForm" :rules='addRules' label-width="120px" label-position='right'>
              <el-form-item label="用户名" prop="userName">
                <el-input class ='modalInput' v-model="editForm.userName"></el-input>
              </el-form-item> 
              <el-form-item label="用户密码(备选)" >
                <el-input class ='modalInput' v-model="editForm.password"></el-input>
              </el-form-item>   
              <el-form-item label=性别 prop="sex">
                  <!-- <el-select v-model="editForm.sex" placeholder="请选择性别">
                     <el-option label="男" value="1"></el-option>
                     <el-option label="女" value="2"></el-option>
                  </el-select> -->
                  <el-radio-group v-model="editForm.sex">
                    <el-radio  :label='1 ' border >男</el-radio>
                    <el-radio  :label="2" border >女</el-radio>
                  </el-radio-group>                  
              </el-form-item>   
              <el-form-item label="联系电话" prop="tel">
                <el-input class ='modalInput' v-model="editForm.tel"></el-input>
              </el-form-item>                                                      
          </el-form>     
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelEditModal">取 消</el-button>
              <el-button type="primary" @click="confirEditModal">确 定</el-button>
          </span>
      </el-dialog>         
  </div>
</template>

<script>
import minx from './minx'
export default {
    mixins: [minx],
    data(){
       return {
          listLoading:false,
          input:null,//关键字搜索
          //  ---- 表格相关
          users:[],
          listQuery:{
                pageSize: 5,
                pageNo: 1
          },
          total:null,
          // ---- 模态框
          showAddModal:false,
          showEditModal:false,
          addForm:{
             userName:'',//
             password:'',//
             tel:'',
             sex:'',
          },
          addRules:{
             userName:[{ required: true, message: '用户名不能为空', trigger: 'blur'}],
             password:[{ required: true, message: '用户密码不能为空', trigger: 'blur'}],
             tel:[{ required: true, message: '联系电话不能为空', trigger: 'blur'}],
             sex:[{ required: true, message: '性别不能为空', trigger: 'change'}],
          },
          editForm:{
             userName:'',//
             password:'',//
             tel:'',
             sex:'',
          },
          editRules:{
             userName:[{ required: true, message: '用户名不能为空', trigger: 'blur'}],
            //  password:[{ required: true, message: '用户密码不能为空', trigger: 'blur'}],
             tel:[{ required: true, message: '联系电话不能为空', trigger: 'blur'}],
             sex:[{ required: true, message: '性别不能为空', trigger: 'change'}],
          },          
       }
    },
    methods:{
       //--------- 表格相关 ----------
       // 点击添加按钮 
       clickAdd(){
          if(this.$refs['addForm']){
             this.$refs['addForm'].resetFields()
          }
          this.showAddModal = true
       },
      // 点击编辑按钮
      handleEdit(index, row) {
        // console.log('点击编辑按钮',row)
        this.editForm = {
          ...row
        }
        this.editForm.id = row['_id']
        this.editForm.password = null
        // console.log(this.editForm)
        this.showEditModal = true
      },
      // 点击删除按钮
      handleDel(index, row){
        // console.log(row)
          
          this.$confirm("确认删除用户吗?", "提示", {
            type: "warning"
          })
          .then(() => {
            //  console.log('删除')
              this.delUser({
                id:row['_id']
              })
          })
          .catch(() => {
            // console.log('取消删除')
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
        // console.log('页数改变了我要执行')
        this.listQuery.pageNo = val;
        this.queryUser(this.listQuery)
      },      
      // --------- 模态框相关 --------
      //取消添加
      cancelAddModal(){
        this.showAddModal = false
        this.$refs['addForm'].resetFields()
      },
      // 确认添加
      confirAddModal(){
        // this.showAddModal = false
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.addUser(this.addForm)
          } else {
            // console.log('error submit!!');
            return false;
          }
        });        
      },
      //取消编辑
      cancelEditModal(){
        this.showEditModal = false
        this.$refs['editForm'].resetFields()
      },
      // 确认编辑
      confirEditModal(){
        // this.showEditModal = false
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.updateUser(this.editForm)
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },      
    },
    watch:{
      input(str){
          if(!str.length){
              str = null
          }
          this.listQuery.keyword =  str
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
.modalInput{
  max-width: 250px;
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
  margin:15px 0px 10px 40px;
}
// ----------- 表格
.table-box{
  border:1px solid #ccc;
  margin:0px 20px 20px 40px;  
  @include loyout
}
//  -------- 分页
.page-box{
   margin-left:40px;
}



</style>




