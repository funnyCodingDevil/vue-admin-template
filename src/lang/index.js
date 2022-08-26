// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 添加语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 取语言类型
import Cookies from 'js-cookie'
import zh from './zh'
import en from './en'
Vue.use(VueI18n)

export default new VueI18n({
  locale: Cookies.get('lang') || 'zh', // 设置地区
  messages: { // 设置地区信息
    zh: {
      title: '嗨喽~',
      ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
      ...zh
    },
    en: {
      title: 'hello world',
      ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
      ...en
    },
    ja: {
      title: 'こんにちは、世界'
    }
  }
})
