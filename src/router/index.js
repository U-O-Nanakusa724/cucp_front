import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import(/* webpackChunkName: "graph" */ '../views/Graph.vue')
  },
  {
    path: '/cars',
    name: 'cars',
    component: () => import(/* webpackChunkName: "cars" */ '../views/Cars.vue')
  },
  {
    path: '/stores',
    name: 'stores',
    component: () => import(/* webpackChunkName: "stores" */ '../views/Stores.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
