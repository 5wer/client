import _ from 'lodash';
import {
  posts,
  getPost,
  booksRemoved,
  updateBook,
  removeBook,
  restoreBook,
  clearBook,
  createPost,
} from './services';

interface FuckType {
  [key: string]: any;
}
export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    data: [],
    active: '',
    current: {},
  },
  mutations: {
    setPosts(state: FuckType, posts: object[]) {
      state.data = posts;
    },
    setCurrent(state: FuckType, post: FuckType) {
      state.current = post;
    },
    setActive(state: FuckType, id: string) {
      state.active = id;
    },
    updateBooks(state: FuckType, postId: string) {
      const newBooks = _.filter(state.data, ({ id }) => id !== postId);
      state.data = [...newBooks];
    },
  },
  actions: {
    async getPosts({ commit }: FuckType, bookId: string) {
      const res = await posts(bookId);
      if (res) {
        const data = res.data;
        await commit('setPosts', data);
      }
    },
    async getPost({ commit }: FuckType, postId: string) {
      const res = await getPost(postId);
      if (res) {
        const data = res.data;
        await commit('setCurrent', data);
      }
    },
    async createPost({ dispatch, ...other }: FuckType, data: object) {
      const res = await createPost(data);
      if (res) {
        const data = res.data;
        await dispatch('getPosts', data.bookId);
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
