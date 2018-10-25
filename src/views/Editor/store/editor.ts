import _ from 'lodash';
import {
  posts,
  postsRemoved,
  updatePost,
  removePost,
  restorePost,
  clearPost,
  createPost,
} from './services';
import { FuckType } from '../../../utils';

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    editing: {},
  },
  mutations: {},
  actions: {
    async save({ commit, state }: FuckType) {},
    async load({ commit }: FuckType, id:string) {},
  },
};
