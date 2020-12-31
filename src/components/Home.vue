<template>
  <el-container>
     <!-- 头部 -->
    <el-header>
      <div>
        <img src="../../build/logo.png"/>
        <span>阅读后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
     <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '82px' : '205px'">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" fill="#517E69" >
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="/welcome"
                class="el-menu-vertical-demo"
                @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                active-text-color="#FEC367"
                :unique-opened="true"
                router>
          <el-menu-item index="/welcome">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">书籍管理</span>
            </template>
            <el-menu-item-group>
             <!-- <span slot="title">分组一</span> -->
              <el-menu-item index="/classify">书籍分类</el-menu-item>
              <el-menu-item index="/books">获取书籍</el-menu-item>
              <el-menu-item index="/router2">已选择书籍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
             <!-- <span slot="title">分组一</span> -->
              <el-menu-item index="/users">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default{
    data () {
        return {
          // 默认不折叠
          isCollapse: false,
          // 被激活导航地址
          activePath: ''
        }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
          },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          window.sessionStorage.clear()
          this.$router.push('/login')
        }
      }
  }
</script>

<style scoped="scoped">
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #517E69;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  img {
    height: 20px;
  }
  span {
    margin-left: 15px;
  }
  .el-aside {
    background-color: #ffffff;
    padding-left: 5px;
    padding-top: 5px;
  }
  .el-menu {
    border: none;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
