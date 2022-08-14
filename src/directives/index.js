import Vue from 'vue'
Vue.directive('imgError', {
  inserted(el, options) {
    // 做空值判断
    console.log('--inserted--')
    if (!el.src) {
      el.src = options.value
    }
    el.onerror = function() {
      this.src = options.value
    }
  },
  // 当前页面元素发送改变 执行 dom发生改变之后，做空值判断
  update(el, options) {
    console.log('--update--')
    if (!el.src) {
      el.src = options.value
    }
  }
})
