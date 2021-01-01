<template>
  <el-select v-model="value_select" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        value_select: '',
        tableData:[]
      }
    },
    created() {
      this.getDatas()
    },
    methods:{
      getDatas(){
        this.axios({
          method: 'get',
          url: 'classify/queryAlls',
        }).then((res) => {
          if (res) {
            this.options=res.data
          }
        })
      },
      change(val){
        this.$emit('child-event',val)
      }
    }
  }
</script>

<style>
</style>
