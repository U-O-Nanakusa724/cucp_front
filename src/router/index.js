import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  /* ---------------------------------------------------------------------------------------------
    グラフ
  --------------------------------------------------------------------------------------------- */
  {
    path: '/graph',
    name: 'graph',
    component: () => import(/* webpackChunkName: "graph" */ '../views/Graph.vue'),
    meta: {
      title: "グラフ"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    車種
  --------------------------------------------------------------------------------------------- */
  {
    path: '/cars',
    name: 'cars',
    component: () => import('../views/cars/Cars.vue'),
    meta: {
      title: "車種一覧"
    }
  },
  {
    path: '/carsort',
    name: 'carsort',
    component: () => import('../views/UnderDevelopment.vue'),
    meta: {
      title: "車種順序変更"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    販売店
  --------------------------------------------------------------------------------------------- */
  {
    path: '/stores',
    name: 'stores',
    component: () => import('../views/stores/Stores.vue'),
    meta: {
      title: "販売店一覧"
    }
  },
  {
    path: '/storesort',
    name: 'storesort',
    component: () => import('../views/UnderDevelopment.vue'),
    meta: {
      title: "販売店順序変更"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    車種詳細
  --------------------------------------------------------------------------------------------- */
  {
    path: '/details',
    name: 'details',
    component: () => import('../views/details/Details.vue'),
    meta: {
      title: "車種詳細一覧"
    }
  },
  {
    path: '/detailsort',
    name: 'detailsort',
    component: () => import('../views/UnderDevelopment.vue'),
    meta: {
      title: "車種詳細順序変更"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    インポート/エクスポート
  --------------------------------------------------------------------------------------------- */
  {
    path: '/documents',
    name: 'documents',
    component: () => import('../views/UnderDevelopment.vue'),
    meta: {
      title: "インポート/エクスポート"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    開発中
  --------------------------------------------------------------------------------------------- */
  {
    path: '/develop',
    name: 'develop',
    component: () => import('../views/UnderDevelopment.vue'),
    meta: {
      title: "開発中"
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.afterEach((to) => {
  store.dispatch('pageTitle/changePage', to.meta.title);
})