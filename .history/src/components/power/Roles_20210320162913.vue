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
          <el-button type="primary" @click="addRolesDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
            <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag @close="removeRightsById(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
            <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 用过for循环嵌套渲染二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag @close="removeRightsById(scope.row, item2.id)" closable type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag @close="removeRightsById(scope.row, item3.id)" closable type="warning" v-for="(item3, i3) in item2.children" :key="item3.id">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>
              {{scope.row}}
            </pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="索引"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditRolesDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRolesById(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightsDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRolesDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="addRolesDialogClosed">
      <el-form label-width="80px" :model="addRolesForm" :rules="addRolesFormRules" ref="addRolesFormRef">
        <!-- 角色名称框 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>

        <!-- 角色描述框 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button type="primary" @click="addRoles">确定</el-button>
        <el-button @click="addRolesDialogVisible=false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editRolesDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="editRolesDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editRolesForm" label-width="80px" :rules="editRolesFormRules" ref="editRolesFormRef">
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
      <span slot="footer">
        <el-button type="primary" @click="editRoles">确定</el-button>
        <el-button @click="editRolesDialogVisible=false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightsDialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="setRightsDialogClosed">
      <!-- 树形控件 -->
      <el-tree ref="treeRef" :show-checkbox="true" :default-expand-all="true" :default-checked-keys="defaultKeys" node-key="id" :data="rightsList" :props="treeProps"></el-tree>
      <!-- 底部 -->
      <span slot="footer">
        <el-button type="primary" @click="allotRights">确定</el-button>
        <el-button @click="setRightsDialogVisible=false">取消</el-button>
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
      //所有权限的树形数据
			rightsList: [],
      // 默认选中的节点Id值数组
      defaultKeys: [],
      // 当前即将分配权限的角色id
      roleId: '',
      // 添加角色对话框的显示状态
      addRolesDialogVisible: false,
      // 修改角色显示隐藏
      editRolesDialogVisible: false,
      // 控制分配权限对话框的显示与隐藏
      setRightsDialogVisible: false,
      // 添加角色的表单数据
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色表单数据
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 添加角色表单的验证规则对象
      addRolesFormRules: {
        roleName: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' },
					],
				roleDesc: [
						{ required: true, message: '请输入角色描述', trigger: 'blur' },
					]
      },
      // 修改角色表单的验证规则对象
      editRolesFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
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
    // 添加角色对话框的关闭事件
    addRolesDialogClosed() {
      this.$refs.addRolesFormRef.resetFields()
    },
    // 确认添加角色
    addRoles() {
      this.$refs.addRolesFormRef.validate(async valid => {
        if(!valid) return
        const { data: res } = await this.$http.post('roles', this.addRolesForm)
        if(res.meta.status !== 201) {
          this.$message.error("添加角色失败！")
        }
        this.getRolesList()
        this.addRolesDialogVisible = false 
        this.$message.success('添加角色成功！')
      })
    },
    // 修改角色对话框的关闭事件
    editRolesDialogClosed() {
      // Dialog的reset方法有bug 故直接为空
      // this.$refs.editRolesFormRef.resetFields()
      this.$refs.editRolesFormRef.roleName = ''
      this.$refs.editRolesFormRef.roleDesc = ''
    },
    // 修改获取角色名字和描述
    async showEditRolesDialog(id) {
     const { data: res } = await this.$http.get(`roles/${id}`)
     if(res.meta.status !== 200) {
       return this.$message.error('获取角色数据失败！')
     }
     this.editRolesForm = res.data
     this.editRolesDialogVisible = true
    },
    // 确认修改角色
    editRoles() {
      this.$refs.editRolesFormRef.validate(async valid => {
        if(!valid) return
        // 发起修改角色信息的数据请求
        const { data: res } = await this.$http.put(`roles/${this.editRolesForm.roleId}`, this.editRolesForm)
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
        const { data: res } = await this.$http.delete(`roles/${id}`)
        if(res.meta.status !== 200) {
          return this.$message.error('删除角色失败！')
        }
        this.$message.success('删除角色成功！')
        this.getRolesList()
    },
    // 根据id删除对应权限
    async removeRightsById(role, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
        if(confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if(res.meta.status !== 200) {
          return this.$message.error('删除权限失败！')
        }
        role.children = res.data
        this.$message.success('删除权限成功！')
    },
    // 展示分配权限的对话框
    async showSetRightsDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } =  await this.$http.get('rights/tree')
      if(res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      // 把获取到的权限数据保存到data中
      this.rightsList = res.data
      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defaultKeys)
      this.setRightsDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if(!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 分配权限对话框关闭事件
    setRightsDialogClosed() {
      this.defaultKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr})
      if(res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRolesList()
      this.setRightsDialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbotttom {
    border-bottom: 1px solid #eee;
  }

  // 纵向上的居中对齐
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>