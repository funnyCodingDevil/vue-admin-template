<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before">共计{{ page.total }}条</span>
        <template #after>
          <el-button
            type="danger"
            size="small"
            @click="onExport"
          >excel导出</el-button>
          <el-button
            type="success"
            size="small"
            @click="$router.push('/import')"
          >excel导入</el-button>
          <el-button
            type="primary"
            size="small"
            @click="showAddDialog = true"
          >新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table
          :data="list"
          border
        >
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
          <el-table-column label="头像">
            <img
              slot-scope="{row}"
              v-imgError="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              @click="onShowPhoto(row)"
            >
          </el-table-column>
          <el-table-column
            label="工号"
            prop="workNumber"
            sortable=""
          />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
          >
            <template v-slot="{row}">
              {{ row.formOfEmployment | formOfEmployment }}
            </template>
          </el-table-column>
          <el-table-column
            label="部门"
            prop="departmentName"
            sortable=""
          />
          <el-table-column
            label="入职时间"
            prop="timeOfEntry"
            sortable=""
          >
            <template v-slot="{row}">
              <!-- {{ row.timeOfEntry | formatDate('YYYY-MM-DD') }} -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="账户状态"
            prop="enableState"
            sortable=""
          >
            <!-- v-model="row.enableState === 1" -->
            <!-- 因为v-model是一个语法糖等效于:value="" @input -->
            <template v-slot="{row}">
              <!-- 使用开关组件显示状态 -->
              <el-switch
                :value="row.enableState === 1"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
              >查看</el-button>
              <!-- <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail?id=' + row.id)"
              >查看</el-button> -->
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
                @click="onDel(row.id)"
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
    <!-- 使用对话框 点击头像弹出二维码 -->
    <!-- .sync 修饰符 简化对话框关闭 -->
    <el-dialog
      title="图片预览"
      :visible.sync="showQrcodeDialog"
      width="50%"
    >
      <qrcode-vue :value="currentRow.staffPhoto"></qrcode-vue>
    </el-dialog>
    <!-- 新增员工弹出层 -->
    <el-dialog
      v-bind="$attrs"
      title="新增员工"
      :visible="showAddDialog"
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
          label="姓名"
          prop="username"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入姓名"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="入职时间"
          prop="timeOfEntry"
        >
          <el-date-picker
            v-model="form.timeOfEntry"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择入职时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="聘用形式"
          prop="formOfEmployment"
        >
          <el-select
            v-model="form.formOfEmployment"
            placeholder="请选择聘用形式"
            clearable
            :style="{width: '100%'}"
          >
            <!-- 遍历下拉菜单的值 -->
            <el-option
              v-for="(item, index) in formOfEmploymentOptions"
              :key="index"
              :label="item.value"
              :value="item.id"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="工号"
          prop="workNumber"
        >
          <el-input
            v-model="form.workNumber"
            placeholder="请输入工号"
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="departmentName"
        >
          <el-input
            v-model="form.departmentName"
            placeholder="请输入部门"
            clearable
            :style="{width: '100%'}"
            @focus="getDeptsList"
          >
          </el-input>
          <!-- 树形控件 -->
          <!-- 绑定树的点击事件 -->
          <el-tree
            v-if="showDeptsTree"
            :data="deptsList"
            :props="{ label: 'name'}"
            default-expand-all
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-form-item>
        <el-form-item
          label="转正时间"
          prop="correctionTime"
        >
          <el-date-picker
            v-model="form.correctionTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择转正时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row
        slot="footer"
        type="flex"
        justify="center"
      >
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="handelConfirm"
        >确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeeList, addEmployee, delEmployee } from '@/api/employees'
import { pick } from 'lodash'
import EmployeeEnum from '@/api/constant/employees'
import QrcodeVue from 'qrcode.vue'
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
import { formatDate } from '@/filters'

export default {
  name: 'Employee',
  components: { QrcodeVue },
  filters: {
    formOfEmployment(val) {
      const f = EmployeeEnum.hireType.find((t) => t.id === val)
      return f ? f.value : '未知'
    }
  },
  props: {},
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 2,
        total: 0
      },
      showAddDialog: false,
      // 定义数据控制对话框显示和保存当前行
      showQrcodeDialog: false,
      currentRow: {},
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 4,
            message: '请输入1-4个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        timeOfEntry: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: 'change'
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '请选择聘用形式',
            trigger: 'change'
          }
        ],
        workNumber: [
          {
            required: true,
            message: '请输入工号',
            trigger: 'blur'
          }
        ],
        departmentName: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'change'
          }
        ],
        correctionTime: [
          {
            required: true,
            message: '请选择转正时间',
            trigger: 'change'
          }
        ]
      },
      // 获取枚举的值
      formOfEmploymentOptions: EmployeeEnum.hireType,
      deptsList: [], // departmentsList
      showDeptsTree: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    async onExport() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const headers = {
          手机号: 'mobile',
          姓名: 'username',
          入职日期: 'timeOfEntry',
          聘用形式: 'formOfEmployment',
          转正日期: 'correctionTime',
          工号: 'workNumber',
          部门: 'departmentName'
        }
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        console.log(rows)
        const data = rows.map((t) => {
          const n = pick(t, Object.values(headers))
          // 对字段进行格式化
          n.timeOfEntry = formatDate(n.timeOfEntry)
          n.correctionTime = formatDate(n.correctionTime) // formaDate 通过选择，引入
          n.formOfEmployment = this.$options.filters.formOfEmployment(n.formOfEmployment) // 通过$options 获取局部过滤器
          return Object.values(n)
        })
        excel.export_json_to_excel({
          header: Object.values(headers), // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(async(action) => {
          await delEmployee(id)
          this.$message.success('成功')
          this.getEmployeeList()
        })
        .catch(() => {})
    },
    handleNodeClick(data) {
      this.form.departmentName = data.name
      this.showDeptsTree = false
    },
    async getDeptsList() {
      /* const res = await getDepartments()
      this.deptsList = tranListToTreeData(res.depts, '') */
      this.deptsList = tranListToTreeData((await getDepartments()).depts, '')
      this.showDeptsTree = true
    },
    onOpen() {},
    close() {
      this.$refs['formRef'].resetFields()
      this.showAddDialog = false
      this.form = this.$options.data().form
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        // 请求
        await addEmployee(this.form)
        // 成功
        this.$message.success('成功')
        // 刷新
        this.getEmployeeList()
        this.close()
      })
    },
    onShowPhoto(row) {
      this.currentRow = row
      this.showQrcodeDialog = true
    },
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
