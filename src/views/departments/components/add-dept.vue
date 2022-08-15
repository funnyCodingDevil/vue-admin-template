<template>
  <div>
    <!-- 点击 x 和阴影触发关闭 子组件绑定关闭事件 统一方法都用close方法 -->
    <el-dialog
      :visible="showDialog"
      v-bind="$attrs"
      :title="form.id ? '编辑部门' : '新增部门'"
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
          label="部门名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入部门名称"
            clearable
            :style="{width: '100%'}"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="部门编码"
          prop="code"
        >
          <el-input
            v-model="form.code"
            placeholder="请输入部门编码"
            clearable
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门负责人"
          prop="manager"
        >
          <el-select
            v-model="form.manager"
            placeholder="请选择部门负责人"
            clearable
            :style="{width: '100%'}"
          >
            <el-option
              v-for="(item, index) in managerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门介绍"
          prop="introduce"
        >
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请输入部门介绍"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
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
import { getEmployeeSimple } from '@/api/user'
import { getDepartments, addDepartment, updateDepartment } from '@/api/departments'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    // 新增 - 父部门 子组件接收数据
    // 编辑 - 本部门
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateName = async(rule, value, callback) => {
      // 同级部门名称不能重复
      // 分析包含哪些数据
      // 当前要添加的部门名称 - this.form.name
      const name = this.form.name
      const { depts } = await getDepartments() // 两个判断都要用到这个数据，拿到外面声明
      let brothers
      // 编辑 - 根据本部门，在所有部门中找兄弟，并且排除自己部门
      if (this.form.id) {
        brothers = depts.filter(
          t => t.pid === this.node.pid && t.id !== this.node.id
        )
      } else {
        // 父部门 根据父部门找兄弟部门
        const parent = this.node
        // 同级部门 - 要添加的兄弟部门
        // brothers = parent.children
        // 解决bug 名称没有校验重复
        brothers = depts.filter(
          t => t.pid === parent.id
        )
      }
      // 同级别部门中是否存在重复名称的部门 如果有报错 没有就允许添加
      const f = brothers ? brothers.find((t) => t.name === name) : false
      f ? callback(new Error('存在重复的名称')) : callback()
    }
    // 使用箭头函数，避免this指向问题
    const validateCode = async(rule, value, callback) => {
      // 同级部门编码在整个模块不能重复
      // 分析包含哪些数据
      // 部门编码- 当前要添加的编码 this.form.code
      const code = this.form.code
      // 整个模块，所有部门 发请求
      const { depts } = await getDepartments()
      // 数据如果判断
      // 如果当前要添加的编码在整个模块中存在，则提示错误 没有则允许添加
      // 在编辑状态下允许自己修改自己
      let f
      if (this.form.id) {
        f = depts
          .filter((t) => t.id !== this.form.id)
          .find((t) => t.code === code)
      } else {
        depts.find((t) => t.code === code)
      }
      f ? callback(new Error('存在重复的编码')) : callback()
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        // 部门名称（name）：必填 1-50个字符  / 同级部门中禁止出现重复部门
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          },
          { validator: validateName, trigger: 'blur' }
        ],
        // 部门编码（code）：必填 1-50个字符  / 部门编码在整个模块中都不允许重复
        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          },
          { validator: validateCode, trigger: 'blur' }
        ],
        // 部门负责人（manager）：必填
        manager: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'change'
          }
        ],
        // 部门介绍 ( introduce)：必填 1-300个字符
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '长度在 1 到 300 个字符',
            trigger: 'blur'
          }
        ]
      },
      managerOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployeeSimple()
  },
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // 清空表单
      this.$refs['formRef'].resetFields()
      // 清空所有字段
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }
      // 关闭对话框
      this.$emit('update-show-dialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        // 发请求
        if (this.form.id) {
          await updateDepartment(this.form)
        } else {
          await addDepartment({
            ...this.form,
            pid: this.node.id
          })
        }
        // 提示成功
        this.$message.success('添加成功')
        // 刷新列表
        this.$emit('success')
        this.close()
      })
    },
    async getEmployeeSimple() {
      this.managerOptions = await getEmployeeSimple()
    }
  }
}
</script>
<style>
</style>
