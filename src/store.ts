import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: require('./views/Start/store/state').default,
    books: require('./views/Editor/store/books').default,
    posts: require('./views/Editor/store/posts').default,
  },
});
