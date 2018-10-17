import _ from 'lodash';
import { login, getUserInfo } from './services';
import { setToken, router } from '../../../utils/requestRemote';

interface State {
  [key: string]: any;
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {},
  },
  mutations: {
    setUser(state: State, user: object) {
      console.log('user', user);
      state.user = user;
    },
  },
  actions: {
    async login({ commit }: { commit: any }, data: object) {
      const res = await login(data);
      if (res) {
        const { user, token } = res.data;
        setToken(token);
        commit('setUser', user);
        await router.push('/main');
      }
    },
    async getUserInfo({ commit, state }: { commit: any; state: any }) {
      if (_.isEmpty(state.user)) {
        const res = await getUserInfo();
        if (res) {
          // api-login的返回值的data中包含token和user, 但是api-getUserInfo的返回值的data本身就是user
          let { user } = res.data;
          if (!user) {
            user = res.data;
          }
          console.log(user);
          commit('setUser', user);
        }
      }
    },
  },
  getters: {
    hello() {
      return 'hello';
    },
  },
};
