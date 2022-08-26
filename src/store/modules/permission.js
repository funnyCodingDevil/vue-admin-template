import { constantRoutes, asyncRoutes } from '@/router/index'
export default {
  namespaced: true,
  state: {
    routes: [] // 定义数据存路由配置
  },
  mutations: {
    // 对路由配置进行赋值和清空
    setRoutes(state, filterRoutes) {
      state.routes = [...constantRoutes, ...filterRoutes]
    },
    removeRoutes(state) {
      state.routes = [...constantRoutes]
    }
  },
  actions: {
    // 把过滤的路由放在actions
    generateRoutes(context, menus) {
      // 开发阶段 放开权限 (实际开发不能写)
      // const filterRoutes = asyncRoutes
      const filterRoutes = asyncRoutes.filter(t => menus.includes(t.children[0].name))
      context.commit('setRoutes', filterRoutes)
      return filterRoutes
    }
  }
}
