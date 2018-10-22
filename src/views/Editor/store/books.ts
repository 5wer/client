import _ from 'lodash';
import { books, booksRemoved, updateBook, removeBook, restoreBook, createBook } from './services';
import { setToken, router } from '../../../utils/requestRemote';

interface State {
  [key: string]: any;
}
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    books: [],
    booksRemoved: [],
  },
  mutations: {
    setBooks(state: State, books: object[]) {
      state.books = books;
    },
  },
  actions: {
    async getBooks({ commit }: { commit: any }, data: object) {
      const res = await books();
      if (res) {
        const data = res.data;
        await commit('setBooks', data);
      }
    },
  },
  getters: {},
};
