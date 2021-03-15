import Vue from 'vue'
import { Button,
         Form,
         FormItem,
         Input,
         Message,
         Container,
         Header,
         Aside,
         Main,
         Menu,
         MenuItem,
         MenuItemGroup } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
// 将message组件挂载到vue原型 即可通过this获取到该组件进行系列操作
Vue.prototype.$message = Message