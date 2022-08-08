import axios from 'axios'

const request = axios.create({
  baseURL: ''
})
// 写请求拦截器
// 方式1-从axios文档中拿到请求拦截器的方法
// 方法2- 使用代码片段
// 通过airu
// 请求拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
  // Do something before response is sent
  return response
}, error => {
  // Do something with response error
  return Promise.reject(error)
})
export default request
