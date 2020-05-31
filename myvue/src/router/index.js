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
import UserIndex from '@/views/user/index'
import DiscussRender from '@/components/DiscussRender'
import DiscussIndex from '@/views/discuss/index'
import TestBank from '@/views/testbank/index'
import AdminIndex from '@/views/admin/index'
import Console from '@/views/admin/console'
import NotFound from '@/views/admin/notFound'
import User from '@/views/admin/user'
import Question from '@/views/admin/question'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
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
    },
    {
      path: '/user/index',
      component: UserIndex,
      name: 'UserIndex'
    },
    {
      path: '/discussRender',
      component: DiscussRender,
      name: 'DiscussRender'
    },
    //讨论贴首页
    {
      path: '/discuss/index',
      component: DiscussIndex,
      name: 'DiscussIndex'
    },
    //点击题目贡献进行跳转
    {
      path: '/testbank/index',
      component: TestBank,
      name: 'TestBank'
    },
    //管理员的界面路由
    {
      path: '/admin/index',
      component: AdminIndex,
      children: [
        {
          path: '/console',
          name: 'console',
          component: Console
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/question',
          name: 'articles',
          component: Question
        },
        {
          path: '/404',
          component: NotFound
        }
      ]
    }
  ]
})
