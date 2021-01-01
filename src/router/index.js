import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Books from '@/components/Books'
import Booked from '@/components/Booked'
import Users from '@/components/Users'
import Classify from '@/components/Book_Classify'


//导入全局样式表
import '@/assets/css/global.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:'/welcome',
      children:[{path:'/welcome',component:Welcome},
                {path:'/users',component:Users},
                {path:'/books',component:Books},
                {path:'/classify',component:Classify},
                 {path:'/booked',component:Booked},]
    }
  ]
})
