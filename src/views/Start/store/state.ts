
// import Vuex from 'vuex';
// import { Vue } from 'vue-property-decorator';

import {login} from './services';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production',
//   state: {
//     hello: 'world',
//     user: {},
//   },
//   mutations: {},
//   actions: {
//     async login({ commit }, data: object) {
//       commit('gotData', await login(data));
//     },
//   },
//   getters: {},
// });

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    hello: 'world',
    user: {},
  },
  mutations: {},
  actions: {
    async login({ commit }: {commit: any}, data: object) {
      commit('gotData', await login(data));
    },
  },
  getters: {},
}