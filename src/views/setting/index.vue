<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row>
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              :data="list"
              style="width: 100%; margin-top: 20px;"
              border
              stripe
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                label="角色"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="描述"
                prop="description"
                align="center"
              ></el-table-column>
              <el-table-column
                label="操作"
                align="center"
              >
                <template v-slot="{row}">
                  <el-button
                    size="small"
                    type="success"
                    @click="onAssignPerm(row.id)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="onUpdate(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="onDel(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页符 -->
            <el-row
              type="flex"
              justify="end"
            >
              <!-- 分页组件绑定事件和属性 -->
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                @current-change="onCurrentChange"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
            >
            </el-alert>
            <el-form
              ref="form"
              label-width="80px"
              style="width: 500px; margin: 30px 0 0 20px;"
            >
              <el-form-item label="公司名称">
                <el-input
                  v-model="info.name"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="info.companyAddress"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input
                  v-model="info.mailbox"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="info.remarks"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 修改标题和控制对话框的显示 -->
    <el-dialog
      :visible="showDialog"
      v-bind="$attrs"
      :title="form.id? '编辑角色':'新增角色'"
      v-on="$listeners"
      @open="onOpen"
      @close="close"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item
          label="角色名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            placeholder="请输入角色描述"
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部居中处理 -->
      <div
        slot="footer"
        type="flex"
        justify="center"
      >
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="showAssignPermDialog"
    >
      <!-- 配置树组件 -->
      <!-- 给选中值，父子不关联 -->
      <!-- @check-change="onCheckChange" 方法1 通过事件选中数据的同时更新 -->
      <!-- 方法二 给组件取别名 -->
      <el-tree ref="treeRef" :data="perList" :props="{label: 'name'}" show-checkbox default-expand-all node-key="id" :default-checked-keys="checkPremList" check-strictly />
      <el-row
        slot="footer"
        type="flex"
        justify="center"
      >
        <el-button @click="showAssignPermDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAssignPermDialog"
        >确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo } from '@/api/user'
import {
  addRole,
  getRoleList,
  delRole,
  getRoleById,
  updateRole,
  assignPerm
} from '@/api/setting'
import { tranListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false,
      list: [],
      info: {},
      page: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      form: {
        name: undefined,
        description: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        description: []
      },
      showAssignPermDialog: false, // 控制对话框数据
      perList: [],
      checkPremList: [],
      currentRoleId: undefined
    }
  },
  created() {
    this.getCompanyInfo()
    this.getRoleList()
  },
  mounted() {
    // $options 等效于vue组件本身/页面配置本身
    console.log('$options', this.$options)
  },
  methods: {
    // 方法1-通过事件实现选中数据的同步
    /* onCheckChange(item, isChecked) {
      if (isChecked) {
        this.checkedPermList.push(item.id)
      } else {
        const index = this.checkedPermList.findIndex(t => item.id)
        this.checkedPermList.splice(index, 1)
      }
    }, */
    async onAssignPerm(id) {
      // 显示对话框和获取数据列表
      this.currentRoleId = id
      // 回显数据
      const { permIds } = await getRoleById(id)
      this.checkPremList = permIds
      this.perList = tranListToTreeData(await getPermissionList(), '0')
      this.showAssignPermDialog = true
    },
    // 方法二-通过调用组件的方法获取选中数据
    async handleAssignPermDialog() {
      await assignPerm({
        id: this.currentRoleId,
        permIds: this.$refs.treeRef.getCheckedKeys()
      })
      this.$message.success('操作成功')
      this.showAssignPermDialog = false
    },
    async onUpdate(id) {
      // 数据回显
      this.form = await getRoleById(id)
      this.showDialog = true
    },
    onDel(id) {
      // 确认 elmecon
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(async(action) => {
          // 发请求
          await delRole(id)
          // 提示成功
          this.$message.success('操作成功')
          // 刷新页面
          this.getRoleList()
        })
        .catch(() => {})
    },
    // 调用接口获取数据
    async getCompanyInfo() {
      this.info = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      console.log(this.info)
    },
    async getRoleList() {
      const res = await getRoleList(this.page)
      console.log(res)
      this.page.total = res.total
      this.list = res.rows
    },
    onCurrentChange(val) {
      this.page.page = val
      // 点击页面值执行回调
      this.getRoleList()
    },
    onOpen() {},
    close() {
      this.$refs['formRef'].resetFields()
      this.showDialog = false
      // 清空表单数据- 方法1 cv - 显示替换
      /*
        this.form: {
        name: undefined,
        description: undefined
      }
      */
      // 清空表单数据- 方法2 获取原生配置
      this.form = this.$options.data().form
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        // 发请求
        // 编辑按钮
        if (this.form.id) {
          await updateRole(this.form)
        } else {
          await addRole(this.form)
        }
        // 操作成功
        this.$message.success('操作成功')
        // 刷新列表
        this.getRoleList()
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
