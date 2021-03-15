<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-side width="200px"></el-side>
      <!-- 右侧主体区域 -->
      <el-main></el-main>
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

<style scoped lang='scss'>

</style>