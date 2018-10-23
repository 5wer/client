import _ from 'lodash';
import {
  books,
  booksRemoved,
  updateBook,
  removeBook,
  restoreBook,
  clearBook,
  createBook,
} from './services';
import { setToken, router } from '../../../utils/requestRemote';

interface FuckType {
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
    setBooks(state: FuckType, books: object[]) {
      state.books = books;
    },
    updateBooks(state: FuckType, bookId: string) {
      const newBooks = _.filter(state.books, ({ id }) => id !== bookId);
      state.books = [...newBooks];
    },
  },
  actions: {
    async getBooks({ commit }: FuckType) {
      const res = await books();
      if (res) {
        const data = res.data;
        await commit('setBooks', data);
      }
    },
    async createBook({ dispatch }: FuckType, data: object) {
      const res = await createBook(data);
      if (res) {
        const data = res.data;
        await dispatch('getBooks');
      }
    },
    async updateBook({ dispatch }: FuckType, data: object) {
      const res = await updateBook(data);
      if (res) {
        const data = res.data;
        await dispatch('getBooks');
      }
    },
    async clearBook({ commit }: FuckType, id: string) {
      const res = await clearBook(id);
      if (res) {
        await commit('updateBooks', id);
      }
    },
  },
  getters: {},
};
