import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ()=>import('../view/login'),
    },
    {
      path: '/layout',
      redirect:'/layout/users',
      component: ()=>import('../view/layout/layout'),
      children:[
        {
          path:'users',
          component:()=>import('../view/users/users')
        },
        {
          path:'addUsers',
          component:()=>import('../view/users/addUsers')
        },
        {
          path:'bookList',
          component:()=>import('../view/book/book')
        },
        {
          path:'addBook',
          component:()=>import('../view/book/addBook')
        },
        {
          path:'classify',
          component:()=>import('../view/classify/classify')
        },
        {
          path:'addClassify',
          component:()=>import('../view/classify/addClassify')
        },
        {
          path:'classifyBook',
          component:()=>import('../view/classify/classifyBook')
        },
        {
          path:'changeClassify',
          component:()=>import('../view/classify/changeClassify')
        },
        {
          path:'slideShow',
          component:()=>import('../view/slideShow/slideShow')
        },
        {
          path:'addSlideShow',
          component:()=>import('../view/slideShow/addSlideShow')
        },
        {
          path:'person',
          component:()=>import('../view/layout/person')
        },
        {
          path:'alterUser',
          component:()=>import('../view/users/alterUsers')
        },
        {
          path:'alterBook',
          component:()=>import('../view/book/alterBook')
        }
      ]
    },
  ]
})
