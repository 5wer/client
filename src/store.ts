import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: {
      namespaced: true,
      ...require('./views/Start/store/state').default,
    },
    books: {
      namespaced: true,
      ...require('./views/Editor/store/books').default,
    },
  },
});
