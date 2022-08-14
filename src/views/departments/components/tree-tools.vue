<template>
  <el-row
    type="flex"
    style="width:100%;"
  >
    <el-col>{{ data.name }}</el-col>
    <el-col>
      <el-row
        type="flex"
        justify="end"
      >
        <span style="margin-right: 10px;">{{ data.manager }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 通过插槽把操作拿到父组件 避免父子通信 -->
            <slot></slot>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  components: {},
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
