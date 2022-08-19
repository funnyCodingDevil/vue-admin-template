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
  },
  {
    path: 'detail/:id', // params传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    props: true, // 将路由参数传递给组件
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  },
  {
    path: 'detail', // query传参 查询字符串
    component: () => import('@/views/employees/detail'),
    hidden: true // 不在左侧菜单显示
  },
  {
    path: 'print/:id', // query传参 查询字符串
    component: () => import('@/views/employees/print'),
    hidden: true // 不在左侧菜单显示
  }]
}
