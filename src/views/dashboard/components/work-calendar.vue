<template>
  <div>
    <!-- 下拉和日历布局 -->
    <el-row
      type="flex"
      justify="end"
    >
      <el-select
        v-model="currentYear"
        size="small"
        @change="onChange"
      >
        <el-option
          v-for="t in yearList"
          :key="t"
          :value="t"
          :label="t"
        ></el-option>
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        @change="onChange"
      >
        <el-option
          v-for="t in 12"
          :key="t"
          :value="t"
          :label="t"
        ></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{date}">
        <!-- 格式化显示 -->
        <div>
          {{ date | formatDate('D') }}
          <!-- 添加休息元素 -->
          <div
            v-if="[0,6].includes(date.getDay())"
            class="rest"
          >休</div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  data() {
    // 不需要异步生成的数据.推荐写在data中
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    // 生成前后5年的数据-方法1-es5
    /* const yearList = []
    for (let i = -5; i <= 5; i++) {
      yearList.push(currentYear + i)
    } */
    // 通过es6的写法,生成长度为11的数组,然后通过map 生成数据
    const yearList = Array.from({ length: 11 }, (t, i) => (new Date()).getFullYear() + i - 5)
    return {
      yearList,
      currentYear,
      currentMonth,
      currentDate
    }
  },
  created() {},
  mounted() {},
  methods: {
    onChange() {
      this.currentDate = new Date(this.currentYear + '-' + this.currentMonth)
    }
  }
}
</script>

<style lang="scss" scoped>
// 控制下拉的样式
.el-select {
  width: 120px;
}
.el-select:first-child {
  margin-right: 10px;
}
// 隐藏部分元素
::deep .el-select__header {
  display: none;
}
.rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
  text-align: center;
}
::v-deep .el-calendar-table .el-calendar-day {
  box-sizing: content-box;
  line-height: 85px;
  text-align: center;
}
::v-deep .el-calendar-table td {
  border: none !important;
}
</style>
