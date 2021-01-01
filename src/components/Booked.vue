<template>
  <div>
    <Classify ref="classify_select" @child-event="getTableData"></Classify>

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
        currentPage4: 1,//当前页
        counts: 0,
        ids:[],//为了修改mongodb中的idSelected
        selVal:0
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
        let ids=[]
        for (let i = 0; i < val.length; i++) {
          ids.push(val[i].id.$oid);
        }
        this.ids=ids;
      },
      // 获取请求菜单
      async getTableData(classifyId) {
        let page=this.currentPage4;
        let limit = 5;
        let offset = (page - 1) * limit;
        this.axios({
          method: 'get',
          url: 'book/queryAll?classifyId=' + classifyId+'&offset=' + offset + '&limit=' + limit ,
        }).then((res) => {
           console.log(res);
           this.tableData=res.data;
        })

        // this.counts = res.count
        console.log('父组件：'+classifyId)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // this.getTableData(val);
        this.currentPage4=val;
        console.log(`当前页: ${val}`);
      }

    }
  }
</script>

<style>
</style>
