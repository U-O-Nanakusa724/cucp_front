import Vue from 'vue'
import Vuex from 'vuex'

import pageTitle from './pageTitle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pageTitle: pageTitle
  },
})
