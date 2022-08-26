import router, { constantRoutes, asyncRoutes } from '@/router/index.js'
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
    // 在路由守卫中获取获取标识
    // 获取用户菜单标识-方法1-从vuex中取
    // console.log('menus', store.state.user.userInfo.roles.menus)
    // console.log('menus', menus)
    // 获取用户菜单标识-方法2-从返回值中取(推荐)
    /* const { roles: { menus }} = await store.dispatch('user/getUserInfo')
    // 筛选动态路由
    // 不做菜单权限控制的代码
    // const filterRoutes = asyncRoutes // 放开所有权限
    const filterRoutes = asyncRoutes.filter(t => menus.includes(t.children[0].name))
    console.log('filterRoutes', filterRoutes)
    // 手动对原始路由做拼接
    // (1)解决左侧菜单不显示
    // 注意:通过router.addRoutes 动态添加路由配置,不会影响原始配置,手动修改原始配置
    router.options.routes = [...constantRoutes, ...filterRoutes]
    router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
    // 注意,防止404,添加动态路由之后,没有立即生效
    // 1-需要在跳转一次
    // 2-把404的路由配置放到最后
    return next(to.path) */

    // 标准版
    // 获取用户菜单标识-方法2-从返回值里取(推荐)
    const { roles: { menus }} = await store.dispatch('user/getUserInfo')
    // 调用vuex的模块做过滤
    const filterRoutes = await store.dispatch('permission/generateRoutes', menus)
    // 添加动态路由
    router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
    return next(to.path)
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
