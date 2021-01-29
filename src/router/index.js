import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Error404 from '../views/Error404.vue'
import token from '../api/token.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    { path: '*', component: Error404 },
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      meta: { requiresAuth: true }
    }
  ]
}) 

router.beforeEach((to, from, next) => {  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.    
    if (token.get() && token.validate()) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
