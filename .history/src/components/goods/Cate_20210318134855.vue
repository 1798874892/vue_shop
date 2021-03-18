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
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table class="treeTable" show-row-border="false" border index-text="#" show-index :expand-type="false" :data="cateList" :columns="columns" :selection-type="false"> 
        <template slot="effective" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
        <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
        <el-tag size="mini" type="warning" v-else>三级</el-tag>
      </template>
      <!-- 操作 -->
      <template slot="option" slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" 
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[3, 5, 10, 15]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">

      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="addCateDialogClosed">
      <!-- 添加分类的表单 -->
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类：">
          <!-- options用来指定数据源 -->
          <!-- props用来指定配置对象 -->
          <el-cascader clearable @change="parentCateChanged" :options="parentCateList" :props="cascaderProps" v-model="selectedKeys">

          </el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="addCateDialogVisible=false">取消</el-button>
      </span>
    </el-dialog>
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
          label: '是否有效',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'effective'
        },
        {
          label: '排序',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'option'
        }
      ],
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类等级，默认添加的是一级分类
        cat_level: 0
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        // value表示你所选中对象
        value: 'cat_id',
        // label表示你看到的值
        label: 'cat_name',
        // children表示父子嵌套的属性
        children: 'children',
        checkStrictLy: true,
        expandTrigger: 'hover'
      },
      // 选中的父级分类的id数组
      selectedKeys: []
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
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      // 先获取父级分类的数据列表
      this.getParentCateList()
      // 再展示出对话框
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data:res } = await this.$http.get('categories', { params: { type: 2 } })
      if(res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败！')
      }
      this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      
    },
    // 
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
    }
  },
}
</script>

<style scoped lang='less'>
  .treeTable {
    margin-top: 15px;
  }

  .el-cascader {
    width: 100%;
  }
</style>