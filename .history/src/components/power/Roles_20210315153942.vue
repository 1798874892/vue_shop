<template>
   <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="索引"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditRolesDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRolesById(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色 -->
    <!-- <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed">
      <el-form :model="addRulesForm" :rules="addRolesFormRules" ref="addRulesFormRef"> -->
        <!-- 角色名称框 -->
        <!-- <el-form-item>
          <el-input></el-input>
        </el-form-item> -->

        <!-- 角色描述框 -->
        <!-- <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确定</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog> -->

    <!-- 修改角色 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editRolesDialogVisible"
      width="50%"
      @close="editRolesDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editRolesForm" label-width="70px" :rules="editRolesFormRules" ref="editRolesFormRef">
        <!-- 修改角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <!-- 修改角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editRoles">确定</el-button>
        <el-button @click="editRolesDialogVisible=false">取消</el-button>
      </span>
    </el-dialog>
   </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      // 所有角色列表数据
      rolesList: [],
      // 当前即将分配权限的角色id
      roleId: '',
      // 修改角色显示隐藏
      editRolesDialogVisible: false,
      // 修改角色表单数据
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色表单的验证规则对象
      editRolesFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
        ]
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {  
    // 获取所有角色的列表
    async getRolesList() {
     const { data: res } = await this.$http.get('roles')
     if(res.meta.status !== 200) {
       return this.$message.error('获取角色列表失败！')
     }
     this.rolesList = res.data
    },
    // 修改角色对话框的关闭事件
    editRolesDialogClosed() {
      this.$refs.editRolesFormRef.resetFields()
    },
    // 修改获取角色名字和描述
    async showEditRolesDialog(id) {
     const { data: res } = await this.$http.get(`roles/${id}`, {roleName})
     if(res.meta.status !== 200) {
       return this.$message.error('获取角色数据失败！')
     }
     this.editRolesDialogVisible = true
    },
    // 确认修改角色
    editRoles() {
      this.$refs.editRolesFormRef.validate(async valid => {
        if(!valid) return
        // 发起修改角色信息的数据请求
        const { data: res } = await this.$http.put(`roles/${id}` + this.editRolesForm)
        if(res.meta.status !== 200) {
          return this.$message.error('更新角色信息失败！')
        }
        // 关闭对话框
        this.editRolesDialogVisible = false
        // 刷新数据列表
        this.getRolesList()
        // 提示修改成功
        this.$message.success('更新角色信息成功！')
      })
    },
    // 根据id删除对应的角色
    async removeRolesById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
        if(confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        const { data: res } = await this.$http.delete(`roles/${id}` + id)
        if(res.meta.status !== 200) {
          return this.$message.error('删除角色失败！')
        }
        this.$message.success('删除角色成功！')
        this.getRolesList()
    }
  }
}
</script>

<style scoped lang='less'>

</style>