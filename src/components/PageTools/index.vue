<template>
  <el-card>
    <el-row type="flex">
      <el-col>
        <!-- 控制页面显示 -->
        <!-- 方法1 通过父传子 -->
        <!-- <div v-if="hasBefore" class="before"> -->
        <!-- 方法2 通过 $slots -->
        <div
          v-if="$slots.before"
          class="before"
        >
          <i class="el-icon-info" />
          <!-- 定义前面得插槽 -->
          <slot name="before"></slot>
        </div>
      </el-col>
      <el-col>
        <el-row
          type="flex"
          justify="end"
        >
          <slot name="after"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    // 接收父组件数据
    hasBefore: {
      type: Boolean,
      default: true
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

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.before {
  line-height: 34px;
  i {
    margin-right: 5px;
    color: #409eff;
  }
  display: inline-block;
  padding: 0px 10px;
  border-radius: 3px;
  border: 1px solid rgba(145, 213, 255, 1);
  background: rgba(230, 247, 255, 1);
}
</style>
