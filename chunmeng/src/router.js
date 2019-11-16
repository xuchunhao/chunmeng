import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import cookieFunction from "@/cookie/cookieFunction.js";

Vue.use(Router)

const router = new Router({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/secondPage',
      name: 'secondPage',
      redirect: '/lost',
      component: () => import('./views/secondPage.vue'),
      beforeEnter: (to, from, next) => {
        if(cookieFunction.getCookie("token") == null){
          router.push({ path: "/login" });
        }else{
          next();
        }
      },
      children:[{
        path: '/secondPageIndex',
        name: 'secondPageIndex',
        component: () => import('@/components/secondPage/index.vue')
      },
      {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('@/components/secondPage/userinfo/userinfo')
      },
      {
        path: '/lost',
        name: 'lost',
        component: () => import('@/components/secondPage/lost/lost'),
      },
      {
        path: '/lostSubmit',
        name: 'lostSubmit',
        component: () => import('@/components/secondPage/lost/lostSubmit')
      },
      {
        path: '/find',
        name: 'find',
        component: () => import('@/components/secondPage/find/find'),
      },
      {
        path: '/findSubmit',
        name: 'findSubmit',
        component: () => import('@/components/secondPage/find/findSubmit')
      },
      {
        path:'/:findname',
        name:'findDetailed',
        component:() => import('@/components/secondPage/find/findDetailed'),
      },
      {
        path:'/:lostname',
        name:'lostDetailed',
        component:() => import('@/components/secondPage/lost/lostDetailed'),
      },

      // {
      //   path:'/s/:name',
      //   name:'article',
      //   component: () => import('@/components/bbs/articleList.vue')
      // },{
      //   path:'/s/:activity',
      //   name:'activity',
      //   component: () => import('@/components/bbs/activityList.vue')
      // }
    ]
    }
  ]
})

export default router;
