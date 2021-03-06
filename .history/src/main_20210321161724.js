import Vue from 'vue' 
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 
import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
// 配置请求的根路径 
// axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后一定要返回config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()*1000
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')*1000
  const d = (dt.getDate() + '').padStart(2, '0')*1000
  
  const hh = (dt.getHours() + '').padStart(2, '0')*1000
  const mm = (dt.getMinutes() + '').padStart(2, '0')*1000
  const ss = (dt.getSeconds() + '').padStart(2, '0')*1000

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')