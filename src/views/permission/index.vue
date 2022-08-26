<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 通过父传子告知子组件不要显示前面的内容  :has-before="false" -->
      <PageTools>
        <!-- 添加一级权限 -->
        <el-button
          slot="after"
          type="primary"
          size="small"
          @click="onAdd({type: 1, pid: '0'})"
        >添加权限</el-button>
      </PageTools>
      <el-table
        :data="list"
        border
        stripe
        row-key="id"
      >
        <el-table-column
          label="名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="标识"
          align="center"
          prop="code"
        ></el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="description"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template v-slot="{row}">
            <!-- 添加二级权限 -->
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="onAdd({type: 2, pid: row.id})"
            >添加</el-button>
            <el-button
              type="text"
              @click="onUpdate(row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="onDel(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 控制子组件显示 方法1-props -->
      <!-- <add-perm :show-dialog="showDialog"></add-perm> -->
      <!-- 通过$attrs + v-bind 传对象 -->
      <!-- 设置动态标题 -->
      <add-perm
        v-if="showDialog"
        ref="addPermRef"
        :visible="showDialog"
        :title="isEdit?'编辑权限':'增加权限'"
        @close="showDialog = false"
      ></add-perm>
    </div>
  </div>
</template>

<script>
import { delPermission, getPermissionDetail, getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import AddPerm from './components/add-perm.vue'
export default {
  name: 'Permission',
  components: { AddPerm },
  props: {},
  data() {
    return {
      list: [],
      showDialog: false,
      isEdit: false
    }
  },
  created() {
    this.getPermissionList()
  },
  mounted() {},
  methods: {
    // 回显数据
    onUpdate(id) {
      this.showDialog = true
      this.isEdit = true
      this.$nextTick(async() => {
        this.$refs.addPermRef.form = await getPermissionDetail(id)
      })
    },
    onAdd(data) {
      this.showDialog = true
      this.isEdit = false
      // 对象赋值-方法1-单个操作
      /*  this.$refs.addPermRef.form.type = data.type
      this.$refs.addPermRef.form.pid = data.id */
      // 对象赋值-方法2-通过Object.assign
      // 把type和pid传入子组件
      this.$nextTick(() => {
        // 解决异步赋值问题
        Object.assign(this.$refs.addPermRef.form, data)
      })
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(async(action) => {
          await delPermission(id)
          this.$message.success('操作成功')
          this.getPermissionList()
        })
        .catch(() => {})
    },
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
