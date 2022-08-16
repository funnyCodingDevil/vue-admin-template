<template>
  <el-card>
    <el-row type="flex">
      <el-col>
        <div class="before">
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
          <el-col>
            <slot name="after"></slot>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
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
