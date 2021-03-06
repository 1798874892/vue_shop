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
         Submenu,
         MenuItem,
         MenuItemGroup,
         BreadcrumbItem, 
         Breadcrumb,
         Card,
         Row,
         Col,
         Table,
         TableColumn,
         Switch,
         Tooltip,
         Pagination,
         Dialog,
         MessageBox,
         Tag,
         Tree,
         Select,
         Option,
         Cascader,
         Alert,
         Tabs} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
// 将message组件挂载到vue原型 即可通过this获取到该组件进行系列操作
Vue.prototype.$message = Message
// 将MessageBox组件挂载到vue原型 即可通过this获取到该组件进行系列操作
Vue.prototype.$confirm = MessageBox.confirm