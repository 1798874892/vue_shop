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
        <el-cascader @change="handleChange" :options="cateList" :props="cateProps" v-model="selectedKeys">
        </el-cascader>
      </el-row>
    </el-card>
   </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {
      // 商品分类列表
      cateList: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定的数组
      selectedKeys: []
    };
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有的商品分类列表
    async getCateList() {
      const { data:res } = await this.$http.get('categories')
      if(res.meta.status) {
        return this.$message.error('获取商品分类失败！')
      }
      this.cateList = res.data
    },
    // 级联选择框选中项变化会触发这个函数 
    handleChange() {
      // 证明选中的不是三级分类
      if(this.selectedCateKeys.length !== 3) {
        this.selectedKeys = []
        return
      }
      // 证明选中的是三级分类

    }
  },
}
</script>

<style scoped lang='less'>
  .cat_opt {
    margin: 15px 0;
  }
</style>