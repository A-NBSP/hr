import layout from '@/layout'
export default {
  path: '/employees',
  component: layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    }
  ]
}
