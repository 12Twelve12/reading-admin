<template>
  <div>
    <el-button type="text" @click="c_add  = true">添加</el-button>
    <el-button type="text" @click="c_update  = true">修改</el-button>
    <el-button type="text" @click="delete_classify">删除</el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" width="120">
      </el-table-column>
      <el-table-column prop="name" label="分类名" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[ 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="counts">
    </el-pagination>


    <el-dialog title="添加" :visible.sync="c_add">
      <el-form ref="addRef" :model="add_form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="add_form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="c_add = false">取 消</el-button>
        <el-button type="primary" @click="add_classify">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改" :visible.sync="c_update">
      <el-form ref="updateRef" :model="update_form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="update_form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="c_update = false">取 消</el-button>
        <el-button type="primary" @click="update_classify">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage4: 1,
        counts: 0,
        c_add: false,
        c_update: false,
        add_form: {
          name: ''
        },
        update_form: {
          id: 0,
          name: ''
        },
        delete_id: [],
        //表单验证规则
        rules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }]
        }
      }

    },
    components: {},
    created() {
      this.getTableData(1)
    },
    methods: {
      handleSelectionChange(val) {
        if(val.length>0){
          this.update_form.id = val[0].id;
          this.update_form.name = val[0].name;
          let ids = []
          for (let i = 0; i < val.length; i++) {
            ids.push(val[i].id);
          }
          this.delete_id = ids;
        }

      },
      // 获取请求菜单
      async getTableData(page) {
        let limit = 10;
        let offset = (page - 1) * limit;
        const {
          data: res
        } = await this.$http.get('classify/queryAllByLimit?offset=' + offset + '&limit=' + limit)
        this.tableData = res
        this.counts = res.length
        // console.log(res)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.getTableData(val)
        console.log(`当前页: ${val}`);
      },  
      //添加分类
      add_classify() {
        this.$refs.addRef.validate(async valid => {
          console.log(valid);
          if (!valid) return;
          this.axios({
            method: 'post',
            url: 'classify/insert',
            data: this.$qs.stringify(this.add_form)
          }).then((res) => {
            if (res) {
              this.c_add = false;
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getTableData(1);
            }
          })

        })

      },
       //修改分类
      update_classify() {
        this.$refs.updateRef.validate(async valid => {
          this.axios({
            method: 'put',
            url: 'classify/update',
            data: this.$qs.stringify(this.update_form)
          }).then((res) => {
            if (res) {
              this.c_update = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getTableData(1);
            }
          })
        })
      },
        //删除分类
      delete_classify() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.delete_id);
          this.axios.delete('classify/delete', {
            params: {
              ids: this.delete_id
            },
            paramsSerializer: params => {
              return this.$qs.stringify(params, {
                indices: false
              })
            }
          }).then((res) => {
             if (res) {
               this.$message({
                 message: '删除成功',
                 type: 'success'
               });
               this.getTableData(1);
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style>
</style>
