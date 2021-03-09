<template>
   <div>
     <el-button type="info" @click="loginout">退出</el-button>
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
    }
  },
}
</script>

<style scoped lang='scss'>

</style>