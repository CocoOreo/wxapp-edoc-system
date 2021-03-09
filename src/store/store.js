import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalog: '',
    contentOffset: 0,
    photoUrl: ''
  },
  mutations: {
    setCatalog (state, value) {
      state.catalog = value
    },
    async setContentOffset (state, value) {
      state.contentOffset = value
    }
  }
})
