<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before">共计{{ page.total }}条</span>
        <template #after>
          <el-button
            type="danger"
            size="small"
          >excel导入</el-button>
          <el-button
            type="success"
            size="small"
          >excel导出</el-button>
          <el-button
            type="primary"
            size="small"
          >新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="list" border>
          <el-table-column
            label="序号"
            type="index"
            sortable=""
          />
          <el-table-column
            label="姓名"
            prop="username"
            sortable=""
          />
          <el-table-column
            label="工号"
            prop="workNumber"
            sortable=""
          />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
          />
          <el-table-column
            label="部门"
            prop="departmentName"
            sortable=""
          />
          <el-table-column
            label="入职时间"
            prop="timeOfEntry"
            sortable=""
          />
          <el-table-column
            label="账户状态"
            prop="enableState"
            sortable=""
          />
          <el-table-column
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template>
              <el-button
                type="text"
                size="small"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
              >转正</el-button>
              <el-button
                type="text"
                size="small"
              >调岗</el-button>
              <el-button
                type="text"
                size="small"
              >离职</el-button>
              <el-button
                type="text"
                size="small"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="end"
        >
          <!-- 分页组件绑定属性和监听事件 -->
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.size"
            @current-change="onCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  name: 'Employee',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 2,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {
  },
  methods: {
    // 监听事件，刷新列表
    onCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.page)
      this.list = res.rows
      this.page.total = res.total
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
