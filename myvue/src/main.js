// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Moment from 'moment'
import MySelect from './components/MySelect.vue'
import Login from './components/Login.vue'
import Head from './components/Head.vue'
import '@/icons' // icon
Vue.use(Head)
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
// 绑定 moment 进行时间格式化 
Vue.prototype.$moment = Moment;//赋值使用
Vue.use(MySelect)
Vue.use(Login)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
