import router from '@/router'
import store from '@/store'
const whileList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whileList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
