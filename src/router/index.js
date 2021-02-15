import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "cars" */ '../views/SignIn.vue')
  },
  {
     path: '/cars',
     name: 'cars',
     component: () => import(/* webpackChunkName: "cars" */ '../views/Cars.vue')
  },
  {
     path: '/stores',
     name: 'stores',
     component: () => import(/* webpackChunkName: "cars" */ '../views/Stores.vue')
  },
  {
     path: '/details',
     name: 'details',
     component: () => import(/* webpackChunkName: "cars" */ '../views/Details.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
