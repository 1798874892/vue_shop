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
      <el-alert show-icon :closable="false" title="注意：只允许为第三级分类设置相关参数！" type="warning"></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <span>选择商品分类：</span>
        <!-- 选择商品分类的级联选择框 -->
      </el-row>
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
  .cat_opt {
    margin: 15px 0;
  }
</style>