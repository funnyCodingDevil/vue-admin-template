<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="姓名:">
                <el-input
                  v-model="form.username"
                  style="width:300px"
                />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="form.password"
                  style="width:300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { saveUserDetailById } from '@/api/employees'
import { getEmployeeBaseInfo } from '@/api/user'
import JobInfo from './components/job-info.vue'
import UserInfo from './components/user-info.vue'
export default {
  name: 'EmployeeDetail',
  components: {
    JobInfo,
    UserInfo
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {},
  // 定义数据，回显数据
  async mounted() {
    this.form = await getEmployeeBaseInfo(this.id)
    this.form.password = ''
  },
  methods: {
    async onSubmit() {
      await saveUserDetailById(this.form)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
