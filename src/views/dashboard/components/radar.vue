<template>
  <div>
    <div
      ref="main"
      style="width: 600px; height: 400px;"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent } from 'echarts/components'
echarts.use([
  TitleComponent,
  LegendComponent,
  RadarChart,
  CanvasRenderer,
  TooltipComponent
])
export default {
  name: 'Radar',
  data() {
    return {}
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)
    // 绘制图表
    myChart.setOption({
      title: {
        text: ''
      },
      legend: {
        data: []
      },
      tooltip: {
        trigger: 'item'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '考勤', max: 100 },
          { name: '技术', max: 100 },
          { name: '管理', max: 100 },
          { name: '分享', max: 100 },
          { name: 'bug', max: 100 },
          { name: '助人', max: 100 }
        ],
        axisName: {
          color: '#fff',
          backgroundColor: '#6666',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      series: [
        {
          name: '绩效',
          type: 'radar',
          data: [
            {
              value: [42, 30, 20, 35, 50, 18],
              name: '张三'
            },
            {
              value: [50, 14, 28, 26, 42, 21],
              name: '李四'
            }
          ]
        }
      ]
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
