<template>
   <div>
     <el-button type="info" @click="loginOut">退出</el-button>
   </div>
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
      this.$message("该用户已退出O_o")
    }
  },
}
</script>

<style scoped lang='scss'>

</style>