<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 使用UploadExcel组件 上传文件 -->
      <UploadExcel :on-success="onSuccess"></UploadExcel>
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/user'

export default {
  name: 'Import',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    async onSuccess({ header, results }) {
      console.log(header, results)
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const data = []
      results.forEach((t) => {
        const item = {}
        for (var key in t) {
          const newkey = userRelations[key]
          item[newkey] = t[key]
        }
        data.push(item)
      })
      await importEmployee(data)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
