<template>
	<el-container class='login_container'>
	  <el-header>
		  欢迎来到登录窗口
	  </el-header>
	  <el-main>
		     <el-form label-width="80px">
		  <!--      用户名-->
		        <el-form-item  label="用户名">
		          <el-input/>
		        </el-form-item>
		  <!--      密码-->
		  <!--prop="username"  prop="password" -->
		        <el-form-item  label="密码">
		          <el-input type="password"/>
		        </el-form-item>
		  <!--      按钮区域-->
		        <el-form-item class="btns">
		          <el-button type="primary">登录</el-button>
		          <el-button type="info">重置</el-button>
		        </el-form-item>

		      </el-form>
	  </el-main>
	</el-container>

</template>

<script>
export default{
  name:'login',
	data(){
		return{

		}
	},
	created(){

	},
	methods:{

	}
}
</script>

<style scoped>
	.login_container{
	  height: 100%;
	}
	.el-header{
	    background-color: #B3C0D1;
	    color: #333;
	    text-align: center;
	    line-height: 60px;
		height: auto;

	  }
	  .el-main {
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    line-height: 160px;
		height: auto;
	  }
</style>
