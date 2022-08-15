<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 实现左右布局方式1-栅格布局 -->
        <!-- <el-row>
          <el-col :span="12">左</el-col>
          <el-col :span="12">右</el-col>
        </el-row> -->
        <!-- 实现左右布局方式2-flex布局 -->
        <!-- <el-row type="flex">
          <el-col>左</el-col>
          <el-col>右</el-col>
        </el-row> -->
        <tree-tools :data="company">
          <el-dropdown-item @click.native="onAdd(company)">新增子部门</el-dropdown-item>
        </tree-tools>
        <el-tree
          :data="list"
          :props="{ label: 'name' }"
          default-expand-all
        >
          <!-- 在树组件中使用作用域插槽 -->
          <!-- <div slot-scope="{data}">{{ data.name }}--{{ data.manager }}</div> -->
          <tree-tools
            slot-scope="{data}"
            :data="data"
          >
            <!-- 父组件传递当前部门到子组件 data -->
            <el-dropdown-item @click.native="onAdd(data)">新增子部门</el-dropdown-item>
            <el-dropdown-item @click.native="onUpdate(data)">编辑部门</el-dropdown-item>
            <el-dropdown-item @click.native="onDel(data.id)">删除部门</el-dropdown-item>
          </tree-tools>
        </el-tree>
      </el-card>
    </div>
    <!-- 父组件监听消息 关闭对话框 -->
    <!-- 父组件传递当前部门到子组件-node -->
    <!-- 通知父组件属性列表-success -->
    <!-- 用ref 做编辑回显 -->
    <add-dept
      ref="addDeptRef"
      :show-dialog="showDialog"
      :node="currentNode"
      @success="getDepartments"
      @update-show-dialog="showDialog = $event"
    ></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { delDepartment, getDepartments, getDepartmentById } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  props: {},
  data() {
    return {
      showDialog: false, // 是否显示弹框
      currentNode: {}, // 当前点击的部门
      company: {
        name: '传智教育',
        manager: '负责人',
        id: '' // 解决点击确认时，请求没有传pid的问题
      },
      list: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ]
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
    // const res = await getDepartments()
    // console.log(res)
    // this.company.name = res.companyName
    // this.list = res.depts
  },
  mounted() {},
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人', id: '' }
      this.list = tranListToTreeData(res.depts, '')
    },
    onAdd(node) {
      // 父组件中保存当前操作的部门
      this.currentNode = node
      this.showDialog = true
    },
    async onUpdate(node) {
      // 保存当前操作部门
      this.currentNode = node
      // 获取部门详情
      const res = await getDepartmentById(node.id)
      console.log(res)
      // 如何把数据传入对话框 1-props（不推荐，改动太大） 2-通过refs直接修改子组件数据（好方法）
      this.$refs.addDeptRef.form = res
      // 打开对话框
      this.showDialog = true
    },
    onDel(id) {
      // 提示 通过代码片段 elmecon
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async(action) => {
          // 发请求
          await delDepartment(id)
          // 提示成功
          this.$message.success('删除成功')
          // 刷新页面
          this.getDepartments()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
