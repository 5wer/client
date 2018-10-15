import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: 'rootState',
  },
  mutations: {

  },
  actions: {
    login(){
      console.log('root action')
    }
  },
  modules: {
    user: {namespaced: true,
      ...require('./views/Start/store/state').default},
  },
});