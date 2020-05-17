import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MySelect from '@/components/MySelect'
import Login from '@/components/Login'
import AddQuestion from '@/components/AddQuestion'
import Home from '@/components/Home'
import ListQuestion from '@/components/ListQuestion'
import UpdateQuestion from '@/components/UpdateQuestion'
import Head from '@/components/Head'
import Discuss from '@/components/Discuss'
import Learn from '@/components/Learn'
import FirstPage from '@/components/FirstPage'
import Time from '@/components/Time'
import PaperIndex from '@/views/paper/index'
import PaperList from '@/views/paper/list'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/myselect',
      name: 'MySelect',
      component: MySelect
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addQuestion',
      name: 'AddQuestion',
      component: AddQuestion
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/listQuestion',
      name: 'ListQuestion',
      component: ListQuestion
    },
    {
      path: '/updateQuestion',
      name: 'UpdateQuestion',
      component: UpdateQuestion
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/discuss',
      name: 'Discuss',
      component: Discuss
    },
    {
      path: '/learn',
      name: 'Learn',
      component: Learn
    },
    {
      path: '/firstPage',
      name: 'FirstPage',
      component: FirstPage
    },
    {
      path: '/time',
      name: 'Time',
      component: Time
    },
    // 导入试卷的模块
    {
      path: '/paper/index',
      component: PaperIndex,
      name: 'PaperIndex'
    },
    {
      path: '/paper/list',
      component: PaperList,
      name: 'PaperList'
    }
  ]
})
