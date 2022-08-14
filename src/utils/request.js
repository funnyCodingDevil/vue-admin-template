import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index'
import router from '@/router/index' // 导入路由模块

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// 写请求拦截器
// 方式1-从axios文档中拿到请求拦截器的方法
// 方法2- 使用代码片段
// 通过airu
// 请求拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  // 通过请求拦截器传token
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
// 错误处理-方式2-在响应拦截器中统一处理错误
request.interceptors.response.use(response => {
  // 正常情况
  // 解构数据
  // eslint-disable-next-line object-curly-spacing
  const { data: { success, message, data } } = response
  // 状态码为200 success 为false 的错误
  if (success) {
    // 简化数据返回， 直接返回数据
    return data
  } else {
    Message.error(message)
    // 方法1-产生一个错误 阻止代码执行
    // throw new Error(message)
    // 方式2-返回一个失败promise
    throw Promise.reject(new Error(message))
  }
  // Do something before response is sent
}, error => {
  // 状态码为400,500的错误
  // Do something with response error
  // 判断是401错误，做出退出和跳转到登录页面
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error('服务器报错，请稍后重试')
  return Promise.reject(error)
})
export default request
