import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const test = {
  namespaced: true, // 锁，增加命名空间，避免重名
  state: {
    token: undefined
  },
  mutations: {
    setToken(state, token) {
      console.log('调用test模块的setToken方法')
      state.token = token
    }
  },
  actions: { // 异步操作
    login(context, data) {
      // 发请求
      setTimeout(() => {
        const token = '123'
        context.commit('setToken', token)
      }, 1000)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    test
  },
  state: { // 存数据
    count: 0,
    age: 21
  },
  // mutations 放同步数据
  mutations: {
    setToken() {
      console.log('调用根模块的setToken')
    },
    add(state) {
      state.count++
    },
    // 接收参数
    addN(state, num) {
      state.count += num
    }
  },
  // actions 放异步数据
  actions: {
    addSync(context) {
      // context 等效于 store
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addSyncN(context, num) {
      // context 等效于 store
      setTimeout(() => {
        context.commit('addN', num)
      }, 1000)
    }
  },
  // getters 放简单的计算数据
  getters: {
    ...getters,
    showCount(state) {
      return 'count=' + state.count
    }
  }
})

export default store
