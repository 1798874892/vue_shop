import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import  ('../components/Login.vue')
const Home = () => import  ('../components/Home.vue')
const Welcome = () => import  ('../components/Welcome.vue')
const Users = () => import  ('../components/user/Users.vue')
const Rights = () => import  ('../components/power/Rights.vue')
const Roles = () => import  ('../components/power/Roles.vue')
const Cate = () => import  ('../components/goods/Cate.vue')
const Params = () => import  ('../components/goods/Params.vue')
const GoodsList = () => import  ('../components/goods/List.vue')
const GoodsAdd = () => import  ('../components/goods/Add.vue')
const GoodsEdit = () => import  ('../components/goods/Edit.vue')
const Order = () => import  ('../components/order/Order.vue')
const Report = () => import  ('../components/report/Report.vue')



const routes = [
  { path: '/', redirect: '/login'},
    { path: '/login', component: Login},
    { 
      path: '/home', 
      component: Home,
      redirect: 'welcome',
      children: [
        { path: '/welcome', component: Welcome }, 
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate},
        { path: '/params', component: Params},
        { path: '/goods', component: GoodsList},
        { path: '/goods/add', component: GoodsAdd},
        { path: '/goods/edit/:id', component: GoodsEdit},
        { path: '/orders', component: Order},
        { path: '/reports', component: Report},]
    }
]

const router = new VueRouter({
  mode: 'history',
	base: process.env.BASE_URL,
  routes
})


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转

  // 分为三种情况1、如果用户访问登录页面 导航守卫不需要权限控制直接放行
  //            2、如果用户访问的不是登录页面而是有权限的页面 先判断是否有token导航守卫在决定是否放行
  //            3、最后如果确定存在token的话 直接放行

  if(to.path === '/login') return next()
  // 从seesionStorage中获取到 保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登录页
  if(!tokenStr) return next('/login')
  next()
})

export default router 