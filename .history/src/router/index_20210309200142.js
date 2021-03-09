import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  //  next() 放行 next('/login') 强制跳转

  // 分为三种情况1、如果用户访问登录页面 路由守卫不需要权限控制直接放行
  //            2、如果用户访问的不是登录页面而是有权限的页面 先判断是否有token路由守卫再决定是否放行
  //            3、最后如果确定存在token的话 直接放行
  if(to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router