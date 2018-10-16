import { login } from './services';
import { setToken } from '../../../utils/requestRemote';

interface State {
  user: object;
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {},
  },
  mutations: {
    setUser(state: State, user: object) {
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
      }
    },
  },
  getters: {},
};
