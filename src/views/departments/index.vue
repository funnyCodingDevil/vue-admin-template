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
          <el-dropdown-item>新增子部门</el-dropdown-item>
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
            <el-dropdown-item>新增子部门</el-dropdown-item>
            <el-dropdown-item>编辑部门</el-dropdown-item>
            <el-dropdown-item>删除部门</el-dropdown-item>
          </tree-tools>
        </el-tree>
      </el-card>
    </div>
    <add-dept></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
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
      company: {
        name: '传智教育',
        manager: '负责人'
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
      this.company = { name: res.companyName, manager: '负责人' }
      this.list = tranListToTreeData(res.depts, '')
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
