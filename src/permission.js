import router from '@/router/index.js'
import store from '@/store/index.js'
// 通过路由守卫控制页面跳转
// 跳转之前-前置守卫
router.beforeEach(async(to, from, next) => {
  // to - 去哪里的路由信息
  // from - 从哪里来的路由信息
  // next - 是否允许访问
  // 如果已经登录并且用户信息没有数据，再获取用户信息
  const { token, userId } = store.getters // 用解构赋值简化数据获取
  if (token && !userId) {
    await store.dispatch('user/getUserInfo')
  }
  // 白名单里的路由可以直接访问
  if (['/login', '/404'].includes(to.path)) {
    return next()
  }
  // 如果他没有token，不允许他访问，并且跳转到登录页
  if (token) {
    next()
  } else {
    next('/login')
  }
})
