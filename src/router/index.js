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
    component: () => import(/* webpackChunkName: "car" */ '../views/cars/Cars.vue'),
    meta: {
      title: "車種一覧"
    }
  },
  {
    path: '/carsort',
    name: 'carsort',
    component: () => import(/* webpackChunkName: "carsort" */ '../views/UnderDevelopment.vue'),
    meta: {
      title: "車種順序変更"
    }
  },
  {
    path: '/grades',
    name: 'grades',
    component: () => import(/* webpackChunkName: "grade" */ '../views/grades/Grades.vue'),
    meta: {
      title: "グレード一覧"
    }
  },
  {
    path: '/gradesort',
    name: 'gradesort',
    component: () => import(/* webpackChunkName: "gradesort" */ '../views/UnderDevelopment.vue'),
    meta: {
      title: "グレード順序変更"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    販売店
  --------------------------------------------------------------------------------------------- */
  {
    path: '/stores',
    name: 'stores',
    component: () => import(/* webpackChunkName: "store" */ '../views/stores/Stores.vue'),
    meta: {
      title: "販売店一覧"
    }
  },
  {
    path: '/storesort',
    name: 'storesort',
    component: () => import(/* webpackChunkName: "storesort" */ '../views/UnderDevelopment.vue'),
    meta: {
      title: "販売店順序変更"
    }
  },
    /* ---------------------------------------------------------------------------------------------
    色アイコン
  --------------------------------------------------------------------------------------------- */
  {
    path: '/colors',
    name: 'colors',
    component: () => import(/* webpackChunkName: "color" */ '../views/colors/Colors.vue'),
    meta: {
      title: "車体カラー一覧"
    }
  },



  /* ---------------------------------------------------------------------------------------------
    車種詳細
  --------------------------------------------------------------------------------------------- */
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "detail" */ '../views/details/Details.vue'),
    meta: {
      title: "車種詳細一覧"
    }
  },
  {
    path: '/detailsort',
    name: 'detailsort',
    component: () => import(/* webpackChunkName: "detailsort" */ '../views/UnderDevelopment.vue'),
    meta: {
      title: "車種詳細順序変更"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    インポート/エクスポート
  --------------------------------------------------------------------------------------------- */
  {
    path: '/import',
    name: 'import',
    component: () => import(/* webpackChunkName: "document" */ '../views/documents/Import.vue'),
    meta: {
      title: "インポート"
    }
  },
  {
    path: '/export',
    name: 'export',
    component: () => import(/* webpackChunkName: "document" */ '../views/UnderDevelopment.vue'),
    meta: {
      title: "エクスポート"
    }
  },
  /* ---------------------------------------------------------------------------------------------
    開発中
  --------------------------------------------------------------------------------------------- */
  {
    path: '/develop',
    name: 'develop',
    component: () => import(/* webpackChunkName: "graph" */ '../views/UnderDevelopment.vue'),
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