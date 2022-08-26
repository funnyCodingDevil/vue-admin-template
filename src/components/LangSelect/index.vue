<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon
        class-name="international-icon"
        icon-class="language"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language==='zh'"
        command="zh"
      >
        中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      >
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 存语言类型
import Cookies from 'js-cookie'
// 方法1-引入文件
// import lang from '@/lang/index'
export default {
  computed: {
    language() {
      // 删除vuex的模块 替换成简单语句
      // return this.$store.getters.language
      // return lang.locale
      // 方法2- this.$i18n
      return this.$i18n.locale
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      Cookies.set('lang', lang)
      // this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .svg-icon {
  color: #fff;
}
</style>
