<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-side width="200px">Aside</el-side>
      <!-- 右侧主体区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed:{},

  mounted () {},

  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message("该用户已退出o_O")
    }
  },
}
</script>

<style scoped lang='less'>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
  }
  
  .el-main {
    background-color: #eaedf1;
  }
</style>