<template>
   <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateDialogVisible=true">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table :show-row-border="false" border index-text="#" show-index :expand-type="false" :data="cateList" :columns="columns" :selection-type="false"> 

      </tree-table>
      <!-- 分页区域 -->
    </el-card>


   </div>
</template>

<script>
export default {
  name: 'Cate',
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: ''
        }
      ]
    };
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data:res } = await this.$http.get('categories', { params: this.queryInfo })
      if(res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      // 把数据列表赋值给catelist
      this.cateList = res.data.result
      // 为总数据条数赋值
      this.total = res.data.total
    }
  },
}
</script>

<style scoped lang='less'>

</style>