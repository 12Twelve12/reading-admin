<template>
  <div>
    <Classify ref="classify_select" @child-event="getData"></Classify>
    <el-button type="text" @click="delete_books">删除</el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!-- <el-table-column prop="id.$oid" label="id" width="120" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column prop="title" label="书名" width="120">
      </el-table-column>
      <el-table-column label="封面" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.img" min-width="46" height="46" />
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120">
      </el-table-column>
      <el-table-column prop="uploader" label="上传者" width="120">
      </el-table-column>
      <el-table-column prop="des" label="简介" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="counts">
    </el-pagination>


  </div>

</template>

<script>
  import Classify from './classify.vue'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage4: 1, //当前页
        counts: 0,
        mongo_ids: [], //为了修改mongodb中的idSelected
        ids:[],
        selVal: 0 //子组件传过来的classifyId
      }
    },
    components: {
      Classify
    },
    // created() {
    //   this.getTableData(1)
    // },
    methods: {
      handleSelectionChange(val) {
        let mongo_ids = [];
        let ids=[];
        for (let i = 0; i < val.length; i++) {
          mongo_ids.push(val[i].mongoId);
          ids.push(val[i].id);
        }
        this.ids = ids;
        this.mongo_ids=mongo_ids;
      },
      // 获取子组件参数，选择器改变就会触发
      getData(classifyId) {
        this.selVal = classifyId;
        this.getTableData(classifyId, 1);
      },
      //请求数据
      getTableData(classifyId, page) {
        let limit = 5;
        let offset = (page - 1) * limit;
        this.axios({
          method: 'get',
          url: 'book/queryAll?classifyId=' + classifyId + '&offset=' + offset + '&limit=' + limit,
        }).then((res) => {
          console.log(res);
          this.tableData = res.data.bookList;
          this.counts = res.data.count;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // this.getTableData(val);
        this.currentPage4 = val;
        console.log(`当前页: ${val}`);
        this.getTableData(this.selVal, val);
      },
      //删除书
      delete_books() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.ids);
          this.axios.delete('book/delete', {
            params: {
              ids: this.ids
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
              //删除成功同时修改mongodb中的上传状态
              this.axios.post('http://127.0.0.1:8000/cmdb/index/', {
                "ids": this.mongo_ids
              }).then((res) => {
                if (res.data) {
                  this.getTableData(this.selVal, 1);
                }
              })
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
