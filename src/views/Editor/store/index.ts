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
    user: {},
  },
  mutations: {},
  actions: {},
  getters: {},
};
