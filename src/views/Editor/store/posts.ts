import _ from 'lodash';
import { Message } from 'element-ui';
import {
  posts,
  getPost,
  booksRemoved,
  updatePost,
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
    orderType: 1,
  },
  mutations: {
    setPosts(state: FuckType, posts: object[]) {
      state.data = _.reverse(_.sortBy(posts, ['createTime']));
    },
    updatePostItem(state: FuckType, post: FuckType) {
      const index = _.findIndex(state.data, ['id', post.id]);
      if (index > -1) {
        state.data.splice(index, 1, post);
      }
    },
    addPost(state: FuckType, post: object) {
      state.data.unshift(post);
    },
    setCurrent(state: FuckType, post: FuckType) {
      state.current = post;
    },
    setActive(state: FuckType, id: string) {
      state.active = id;
      if (!id) {
        state.current = {};
      }
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
      } else {
        await commit('setPosts', []);
      }
    },
    async getPost({ commit }: FuckType, id: string) {
      const res = await getPost(id);
      if (res) {
        const data = res.data;
        await commit('setCurrent', data);
        await commit('setActive', data.id);
      }
    },
    async createPost({ dispatch, commit }: FuckType, data: object) {
      const res = await createPost(data);
      if (res) {
        const data = res.data;
        commit('addPost', data); // 在state里添加新增的数据
        commit('setCurrent', data); // 将新增数据回填入表单
        commit('setActive', data.id); // 设置新的文章选中项
      }
    },
    async updatePost({ commit, state }: FuckType, data: object) {
      const res = await updatePost(data);
      if (res) {
        const data = res.data;
        if (data) {
          commit('setCurrent', data);
          const { bookId, id, isPublish, lastModifyTime, summary, title, type } = data;
          commit('updatePostItem', { bookId, id, isPublish, lastModifyTime, summary, title, type });
          Message({
            type: 'success',
            message: `保存文章 (${data.id}) 成功`,
            center: true,
          });
        }
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
