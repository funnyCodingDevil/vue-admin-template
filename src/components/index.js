/* import Vue from 'vue'
import PageTools from './PageTools/index.vue'

Vue.component('PageTools', PageTools)
 */
// 注册全局组件 - 方法2 通过Vue.use注册
import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import ImageUpload from './ImageUpload/index.vue'
import Screenfull from './Screenfull/index.vue'
import ThemePicker from './ThemePicker/index.vue'
import LangSelect from './LangSelect/index.vue'
export default function install(Vue) {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('Screenfull', Screenfull)
  Vue.component('ThemePicker', ThemePicker)
  Vue.component('LangSelect', LangSelect)
}
