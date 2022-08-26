<template>
  <div>
    <!-- :visible="showDialog" -->
    <el-dialog
      v-bind="$attrs"
      title="新增权限"
      v-on="$listeners"
      @open="onOpen"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item
          label="权限名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入权限名称"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="code"
        >
          <el-input
            v-model="form.code"
            placeholder="请输入权限标识"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="权限描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            placeholder="请输入权限描述"
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="开启"
          prop="enVisible"
          required
        >
          <!-- 完善开启字符串的类型 -->
          <el-switch
            v-model="form.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <!-- 完善底部按钮样式居中 -->
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
import { addPermission, updatePermission } from '@/api/permission'
export default {
  name: 'AddPerm',
  components: {},
  inheritAttrs: false,
  /* props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  }, */
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: '0',
        // 子组件定义数据
        type: 1,
        pid: '0'
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入权限名称',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: 'blur'
          }
        ],
        description: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // 关闭操作-方法1手动
      /* this.$refs['formRef'].resetFields()
      this.$emit('close')
      this.form = {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: '0',
        // 子组件定义数据
        type: 1,
        pid: '0'
      } */
      // 方法2 - 通过v-if销毁组件 通知父组件
      this.$emit('close')
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        // 点击发请求（新增权限） if else 区分编辑还是新增
        if (this.form.id) {
          // 编辑
          await updatePermission(this.form)
        } else {
          await addPermission(this.form)
        }
        // 提示成功
        this.$message.success('操作成功')
        // 刷新-方法1-发消息
        this.$emit('success')
        // 方法2-通过$parent直接找到父组件
        this.$parent.getPermissionList()
        this.close()
      })
    }
  }
}
</script>
<style>
</style>
