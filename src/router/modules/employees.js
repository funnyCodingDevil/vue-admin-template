import Layout from '@/layout'
// 模块化路由写法 把员工的路由单独放到一个文件中去
export default {
  // 创建路由 - 员工
  path: '/employees',
  component: Layout,
  children: [{
    // path: '' 默认路由 当访问/employees默认访问到页面
    path: '',
    name: 'employee',
    component: () => import('@/views/employees/index.vue'),
    meta: { title: '员工', icon: 'people' }
  }]
}
