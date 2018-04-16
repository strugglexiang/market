<template>
  <div>
      <!-- 模块标题 -->
      <el-row>
        <el-col :span="24">
            <div class="title-box">
                <h3 class="title">所有商品</h3>
            </div>
        </el-col>
      </el-row>
      <!-- 关键字搜索和添加按钮 -->
      <el-row>
          <el-col :span="24">
              <div class="nav-box" >
                  <div class="bt-box">
                      <el-button @click = 'clickAdd' type="primary" size='small' icon="el-icon-edit">添加商品</el-button>
                  </div>                
                  <div class="input-box">
                      <el-input 
                        class="search-input"  
                        v-model="input" 
                        placeholder="名称，类型,价格，数量"
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
                <el-table :data="goods" v-loading="listLoading" element-loading-text="拼命加载中" >
                      <el-table-column prop="goodName" label="商品名称" width = '120' sortable>
                      </el-table-column>
                      <el-table-column prop="goodType" label="商品类型" width = '120'  >
                      </el-table-column>   
                      <el-table-column prop="数量" label="商品数量" width = '120'  >
                          <template slot-scope="scope">
                            <el-tag type="">
                              {{scope.row.num}}
                            </el-tag>
                          </template>                         
                      </el-table-column> 
                      <el-table-column prop="picUrl" label="商品图片" width = '120'  >
                         <template slot-scope="scope">
                              <img class='goodImg' :src="scope.row.picUrl" alt="路径不正确">
                         </template>
                      </el-table-column>
                      <el-table-column prop="price" label="商品价格(元)"  width = '130' sortable>
                        <template slot-scope="scope">
                            <el-tag type="danger">
                              {{scope.row.price}}
                            </el-tag>
                          </template>  
                      </el-table-column>                                           
                      <el-table-column prop="remark" label="备注信息" width = '120' >
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
          title="添加商品"
          :visible.sync="showAddModal"
          width="50%"
      >
          <el-form ref="addForm" :model="addForm" :rules='addRules' label-width="120px" label-position='right'>
              <el-form-item label="商品名称" prop="goodName">
                <el-input class ='modalInput' v-model="addForm.goodName"></el-input>
              </el-form-item> 
              <el-form-item label=商品类型 prop="goodType">
                 <el-select v-model="addForm.goodType" placeholder="请选择商品类型">
                     <el-option 
                        v-for="(item,index) in goodsType"
                        :key = "item.typeName + index"
                        :label="item.typeName" 
                        :value="item.typeName"
                      >
                     </el-option>
                  </el-select>                
              </el-form-item>   
              <el-form-item label="初始数量" prop="num">
                <el-input class ='modalInput' v-model="addForm.num"></el-input>
              </el-form-item> 
              <el-form-item label="商品价格" prop="price">
                <el-input class ='modalInput' v-model="addForm.price"></el-input>
              </el-form-item> 
              <el-form-item label="备注信息(选填)" prop="remark">
                <el-input class ='modalInput' v-model="addForm.remark"></el-input>
              </el-form-item>  
              <div class="upload-box">
                  <el-upload
                    ref = 'addUpload'
                    :action="upUrl"
                    :headers="headers"
                    :on-preview="AddHandlePreview"
                    :on-remove="AddHandleRemove"
                    :on-change="AddHandleChange"
                    :on-success="AddUpSuccess"
                    :on-error = 'AddUpFailHandle'
                    :on-exceed="AddHandleExceed"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    list-type="picture"
                    accept="image/*"
                    :file-list="AddfileList">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button  size="small" type="success" @click="AddUp" icon="el-icon-upload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>                  
              </div>                                                                        
          </el-form>      
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelAddModal">取 消</el-button>
              <el-button type="primary" @click="confirAddModal">确 定</el-button>
          </span>
      </el-dialog>        
      <!-- 修改模态框  -->
      <el-dialog
          title="修改商品信息"
          :visible.sync="showEditModal"
          width="50%"
      >
          <el-form ref="editForm" :model="editForm" :rules='editRules' label-width="120px" label-position='right'>
              <el-form-item label="商品名称" prop="goodName">
                <el-input class ='modalInput' v-model="editForm.goodName"></el-input>
              </el-form-item> 
              <el-form-item label=商品类型 prop="goodType">
                 <el-select v-model="editForm.goodType" placeholder="请选择商品类型">
                     <el-option 
                        v-for="(item,index) in goodsType"
                        :key = "item.typeName + index"
                        :label="item.typeName" 
                        :value="item.typeName"
                      >
                     </el-option>
                  </el-select>                
              </el-form-item>   
              <el-form-item label="初始数量" prop="num">
                <el-input class ='modalInput' v-model="editForm.num"></el-input>
              </el-form-item> 
              <el-form-item label="商品价格" prop="price">
                <el-input class ='modalInput' v-model="editForm.price"></el-input>
              </el-form-item> 
              <el-form-item label="备注信息(选填)" prop="remark">
                <el-input class ='modalInput' v-model="editForm.remark"></el-input>
              </el-form-item>  
              <div class="upload-box">
                  <el-upload
                    ref = 'editUpload'
                    :action="upUrl"
                    :headers="headers"
                    :on-preview="EditHandlePreview"
                    :on-remove="EditHandleRemove"
                    :on-change="EditHandleChange"
                    :on-success="EditUpSuccess"
                    :on-error = 'EditUpFailHandle'
                    :on-exceed="EditHandleExceed"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    list-type="picture"
                    accept="image/*"
                    :file-list="EditfileList">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button  size="small" type="success" @click="EditUp" icon="el-icon-upload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>                  
              </div>                                                                        
          </el-form>        
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancelEditModal">取 消</el-button>
              <el-button type="primary" @click="confirEditModal">确 定</el-button>
          </span>
      </el-dialog>         
  </div>
</template>

<script>
import minx from './minx/allgoods'
export default {
    mixins: [minx],
    data(){
       return {
          listLoading:false,
          input:null,//关键字搜索
          //  ---- 表格相关
          goods:[],
          goodsType:[],
          listQuery:{
                pageSize: 5,
                pageNo: 1
          },
          total:null,
          // ---- 模态框
          showAddModal:false,
          showEditModal:false,
          addForm:{
             goodName:'',//
             goodType:'',//
             num:'',
             picUrl:'',
             price:'',
             remark:'',
          },
          addRules:{
             goodName:[{ required: true, message: '商品名不能为空', trigger: 'blur'}],
             goodType:[{ required: true, message: '商品类型不能为空', trigger: 'change'}],
             num:[{ required: true, message: '商品初识数量不能为空', trigger: 'blur'}],
             price:[{ required: true, message: '商品价格不能为空', trigger: 'blur'}],
            //  picUrl:[{ required: true, message: '性别不能为空', trigger: 'blur'}],
            //  remark:[{ required: true, message: '备注', trigger: 'blur'}],
          },
          editForm:{
             goodName:'',//
             goodType:'',//
             num:'',
             price:'',
             remark:'',
          },
          editRules:{
             goodName:[{ required: true, message: '商品名不能为空', trigger: 'blur'}],
             goodType:[{ required: true, message: '商品类型不能为空', trigger: 'change'}],
             num:[{ required: true, message: '商品初识数量不能为空', trigger: 'blur'}],
             price:[{ required: true, message: '商品价格不能为空', trigger: 'blur'}],
            //  remark:[{ required: true, message: '备注', trigger: 'blur'}],
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
          this.AddfileList = []  
          this.addForm.picUrl = ''
          this.showAddModal = true        
       },
      // 点击编辑按钮
      handleEdit(index, row) {
        // console.log('点击编辑按钮',row)
        //---- 先清
           this.EditfileList = []  
           this.editForm.picUrl = ''
        //---- 再赋值
        this.editForm = {
          ...row
        }
        this.editForm.id = row['_id'] 
        this.EditfileList.push({
          name:row.goodName,
          url:row.picUrl
        })
        let num = this.editForm.picUrl.indexOf('/up')
        this.editForm.picUrl = this.editForm.picUrl.slice(num)
        // console.log(this.editForm)
        
        this.showEditModal = true    
      },
      // 点击删除按钮
      handleDel(index, row){
        // console.log(row)
          this.$confirm("确认删除商品吗?", "提示", {
            type: "warning"
          })
          .then(() => {
            //  console.log('删除')
              this.delGoods({
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
        this.queryGoods(this.listQuery)
      },
      // 页数改变
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.queryGoods(this.listQuery)
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
            // console.log(this.addForm)
            this.addGoods(this.addForm)
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
            // console.log(this.editForm)
            this.updateGoods(this.editForm)
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
          this.jieliu(this.queryGoods,this.listQuery)
      }
   }, 
   mounted(){
     this.queryGoods(this.listQuery)
     this.queryGoodsType()
   }
}
</script>





<style lang="scss" scoped>
@mixin loyout {        
  max-width:1000px;
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

//--------- 上传
.upload-box{
   max-width: 400px;
   margin-left:40px;
}

.goodImg{
  width: 50px;
  height:50px;
  border:1px dotted #ccc;
}



</style>





