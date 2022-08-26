import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/directives' // 导入图片加载失败指令文件
// 注册过滤器-方法1-简单模式
import '@/filters' // 引入过滤器
// 注册过滤器-方法2-单个注册
/*
  import { formatDate } from '@/filters/index'
  Vue.filter('formatDate', formatDate)
*/
// 注册过滤器-方法2-批量注册
import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
// 注册全局组件 - 方法1 通过Vue.component注册
// import '@/components'
// 注册全局组件 - 方法2 通过Vue.use注册
import Ui from '@/components/index.js'
Vue.use(Ui)
// 引入模拟文件
import '../mock/rzzt'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// 只在开发阶段使用测试语句
if (process.env.NODE_ENV === 'development') {
  // import '../mock/rzzt.js' // 不可以使用在if中
  require('../mock/rzzt')
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) }) // 恢复中文
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 方法1-把权限方法放在原型链上,作为公共方法
/* Vue.prototype.checkPermission = function(key) {
  return !this.$store.state.user.userInfo.roles.points.includes(key)
} */
// 方法2-mixin 混入
Vue.mixin({
  methods: {
    checkPermission: function(key) {
      // 防止公共代码报错,使用没有数值的数据-方法1-if
      /* if (this.$store.state.user.userInfo && this.$store.state.user.userInfo.roles && this.$store.state.user.userInfo.roles.points) {
        return !this.$store.state.user.userInfo.roles.points.includes(key)
      } else {
        return false
      } */
      // 方法2-通过try/catch
      try {
        return !this.$store.state.user.userInfo.roles.points.includes(key)
      } catch (error) {
        return false
      }
    }
  }
})
import i18n from '@/lang/index'
new Vue({
  el: '#app',
  router,
  store,
  i18n, // 在每个页面/组件上放东西
  render: h => h(App)
})

const date = new Date()
console.log(filters.formatDate(date))
