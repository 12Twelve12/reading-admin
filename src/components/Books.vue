<template>
  <div>
    <el-button type="text" @click="dialogFormVisible  = true">添加到书库</el-button>
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
      <el-table-column prop="isSelected" label="已上传" width="120">
      </el-table-column>
      <el-table-column prop="des" label="简介" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="counts">
    </el-pagination>


    <el-dialog title="选择分类" :visible.sync="dialogFormVisible">
      <el-form>
        <Classify ref="classify_select"></Classify>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Classify from './classify.vue'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage4: 1,//当前页
        counts: 0,
        dialogFormVisible: false,
        ids:[]//为了修改mongodb中的idSelected
      }
    },
    components: {
      Classify
    },
    created() {
      this.getTableData(1)
    },
    methods: {
      handleSelectionChange(val) {
        let selects = []
        let ids=[]
        for (let i = 0; i < val.length; i++) {
          selects.push({
            "mongoId": val[i].id.$oid,
            "title": val[i].title,
            "img": val[i].img,
            "author": val[i].author,
            "des": val[i].des,
            "uploader": "本站",
            "classifyId": 0
          });
          ids.push(val[i].id.$oid);
        }
        // console.log(selects)
        this.multipleSelection = selects;
        this.ids=ids;
      },
      // 获取请求菜单
      async getTableData(page) {
        const {
          data: res
        } = await this.$http.get('http://127.0.0.1:8000/cmdb/index?page=' + page)
        if (res.code !== 0) return this.$message.error("加载失败")
        this.tableData = res.data
        this.counts = res.count
        // console.log(res)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.getTableData(val);
        this.currentPage4=val;
        console.log(`当前页: ${val}`);
      },
      onSubmit() {
        let params = {
          bookList: JSON.stringify(this.multipleSelection),
          classify_id: this.$refs.classify_select.value_select
        }
        this.axios.post('book/insertMany', this.$qs.stringify(params)).then((res) => {
          if (res) {
            this.dialogFormVisible = false;
            this.$message({
              message: '添加成功',
              type: 'success'
            });
             //添加成功同时修改mongodb中的上传状态
            this.axios.put('http://127.0.0.1:8000/cmdb/index/', {"ids":this.ids}).then((res) => {
                  if(res.data){
                    this.getTableData(this.currentPage4);
                  }
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
