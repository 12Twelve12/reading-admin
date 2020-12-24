<template>
  <div class="login_container">
      <div class="login_box">
        <!-- 头像区 -->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="avatar" />
        </div>
        <!-- 登录表单 -->
         <el-form ref="formRef" label-width="0px" class="login_form" :model="form">
                  <el-form-item >
                    <el-input v-model="form.name" prefix-icon="el-icon-user"></el-input>
                  </el-form-item>
                  <el-form-item >
                    <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock"></el-input>
                  </el-form-item>
                  <el-form-item class="btns">
                    <el-button type="success" round @click="login">登录</el-button>
                    <el-button type="info" round @click="resetFrom">重置</el-button>
                  </el-form-item>
          </el-form>
      </div>
  </div>

</template>

<script>
export default{
 //  name:'login',
	data(){
		return{
      form:{
        name:'admin',
        password:'123456'
      }

		}
	},
	// created(){

	// },
	methods:{
    resetFrom(){
      console.log(this);
      this.$refs.formRef.resetFields();
    },
    login(){
      this.$refs.formRef.validate(async valid=>{
        if(!valid) return this.$message.error('出错了');
        // this.$http.post("cmdb/index",this.form)
        // const {data:res}=await this.$http.get("cmdb/index",{params:{page:1}});
        // console.log(res);

      });
    }

	}
}
</script>

<style scoped>
	.login_container{
	  height: 100%;
    background-color: #42B983;
	}
  .login_box {
    width: 450px;
    height: 360px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
}
.avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .login_form {
    position: absolute;
    bottom: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: center;
  }

</style>
