import { login } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true, // 锁，增加命名空间，避免重名
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = undefined
      removeToken()
    }
  },
  actions: { // 异步操作
    async login(context, data) {
      // 通过alt + / 可以查看每个方法的描述 触发建议
      // const res = await login(data)
      // console.log(res)
      // 错误处理
      // try {
      //   // 解构赋值
      //   const { data: { success, message, data: token }} = await login(data)
      //   if (success) {
      //     context.commit('setToken', token)
      //   } else {
      //     // 提示错误信息
      //     // 在js中不能this.$xxx
      //     Message.error(message)
      //   }
      // } catch (error) {
      //   Message.error('服务器报错，请稍后重试')
      // }
      // 简化之后的代码
      const token = await login(data)
      context.commit('setToken', token)
    }
  }
}
