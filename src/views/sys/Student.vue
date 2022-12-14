<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="课程名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getLessonsList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定批量删除吗？"  @confirm="delHandle(null)">
          <el-button slot="reference" type="danger" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border stripe style="width: 100%"
              @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55" align="center" ></el-table-column>
      <el-table-column prop="className" label="课程名称" width="150" align="center"></el-table-column>
      <el-table-column prop="classRequired" label="课程性质" width="150" align="center" ></el-table-column>
      <el-table-column prop="classScore" label="课程学分" width="150" align="center"></el-table-column>
      <el-table-column prop="statu" label="订阅状态" width="150" align="center">
        <!--scope为父组件传回的值-->
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.statu ===1" type="success">订阅</el-tag>
          <el-tag size="small" v-else-if="scope.row.statu ===0" type="danger">未订阅</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="statu" label="操作" align="center">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.statu"
            :inactive-value=0
            :active-value=1
            @change="switchChange(scope.row.id)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="订阅"
            inactive-text="取消订阅">
          </el-switch>
      </template>
      </el-table-column>
    </el-table>
<!-- 分页组件-->
    <el-pagination
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
      :page-sizes="[10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Student',
    data() {
      return {
        searchForm:{},
        delBtlStatu:true,
        permDialogVisible:false,
        permForm:{},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        permTreeData: [],
        editForm: {},
        total:0,
        size:10,
        current:1,
        tableData: [],
        editFormRules: {
          name: [
            {required: true, message: '请输入下单人姓名', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入订单类型', trigger: 'blur'}
          ],
          created: [
            {required: true, message: '请输入下单时间', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入下单者电话', trigger: 'blur'}
          ],
          goodsId: [
            {required: true, message: '请输入订单编号', trigger: 'blur'}
          ],
          statu: [
            {required: true, message: '请选择订单状态', trigger: 'blur'}
          ]
        },
        multipleSelection:[],
      }
    },
    //页面创建成功立即调用
    created() {
      this.getLessonsList()
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 多选
      handleSelectionChange(val) {
        console.log('val')
        console.log(val)
        this.multipleSelection = val;
        this.delBtlStatu = val.length ==0
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size= val
        this.getLessonsList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.current= val
        this.getLessonsList()
      },
      handleClose() {
        this.resetForm('editForm')
      },
      //重置
      resetForm (formName) {
        console.log(this)
        this.$refs[formName].resetFields()
        this.dialogVisible = false
        this.editForm = {}
      },
      //获取列表
      getLessonsList() {
        this.$axios.get('/sys/student/list',{
          params: {
            className: this.searchForm.className,
            current:this.current,
            size: this.size
          }
        }).then(res => {
          this.tableData = res.data.data.records;
          this.size = res.data.data.size
          this.current = res.data.data.current
          this.total =res.data.data.total
        })
      },
      //订阅开关
      switchChange(row) {
        // console.log("开关===>",row);
        // let statu = row.statu == 1 ? '订阅' : '取消订阅';
        // console.log("----------"+statu)
        // console.log(row.statu == 1 ? 'addSub' :'delSub')

        this.$axios.post('sys/student/'+ (row.statu == 1 ? 'delSub' :'addSub'),row).then((res) =>
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success'}))

      },
      //删除
      delHandle(id) {
        var ids = []
        if(id) {
          ids.push(id)
        }else {
          this.multipleSelection.forEach(row => {
            ids.push(row.id)
          })
        }
        this.$axios.post("/sys/student/delete" , ids).then(res => {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
            onClose:() => {
              this.getLessonsList()
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    float: right;
    margin-top: 22px;
  }

</style>
