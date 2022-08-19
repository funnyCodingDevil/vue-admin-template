// import Vue from 'vue'
// import moment from 'moment'
// Vue.filter('formatDate', (val, format = 'YYYY-MM-DD') => {
//   return moment(val).format(format)
// })

// 定义过滤器-方法2-定义工具函数
import moment from 'moment'

export function formatDate(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
}
