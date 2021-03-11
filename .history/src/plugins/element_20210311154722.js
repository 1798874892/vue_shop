import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 将message组件挂载到vue原型上 即可通过this获取到该组件进行系列操作
Vue.prototype.$message = Message
