import Vue from 'vue' 
import App from './App.vue'
import router from './router'
//导入elementUI  ------外链cdn优化
// import './plugins/axios'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'; 
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入树状图表
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'


// 导入进度条NProgress包对应的JS和CSS
import NProgress from 'nprogress'


import axios from 'axios'
// 配置请求的根路径 
// axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'
 axios.defaults.baseURL = 'http://shop.trigger7.cn:8900/api/private/v1/' 
// 在request拦截器中展示进度条NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后一定要返回config
  return config
})
// 在request拦截器中展示进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 时间戳转化成时间格式
Vue.filter('dateFormat', function(originVal) {
  // padStart()方法为数值补全指定位数 指共两位用字符串'0'补全
  // 如果originVal是10位数的需要 originVal* 1000
  const dt = new Date(originVal*1000)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')