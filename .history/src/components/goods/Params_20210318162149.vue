<template>
   <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning"></el-alert>
    </el-card>
   </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  },
}
</script>

<style scoped lang='less'>

</style>