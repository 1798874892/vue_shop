import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { input } from 'element-ui'
// 导入弹框提示组件
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input)
// 将message组件挂载到vue原型上 即可通过this获取到该组件进行系列操作
Vue.prototype.$message = Message
