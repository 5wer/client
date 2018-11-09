import { post, get, del, put } from '../../../utils/requestRemote';

/**
 * 文集api
 */
export function books() {
  return get('v1/books');
}
export function booksRemoved() {
  return get('v1/books-removed');
}
export function createBook(data: object) {
  return post('v1/book', data);
}
export function updateBook(data: object) {
  return put('v1/book', data);
}
export function clearBook(id: string) {
  return del(`v1/book/${id}`);
}
export function restoreBook(id: string) {
  return put(`v1/book-restore/${id}`);
}
export function removeBook(id: string) {
  return put(`v1/book-remove/${id}`);
}

/**
 * 文章api
 */
export function posts(bookId?: string) {
  if (bookId) {
    return get(`v1/posts/${bookId}`);
  }
  return get('v1/posts');
}
export function getPost(postId?: string) {
  return get(`v1/post/${postId}`);
}
export function postsRemoved() {
  return get('v1/posts-removed');
}
export function createPost(data: object) {
  return post('v1/post', data);
}
export function updatePost(data: object) {
  return put('v1/post', data);
}
export function restorePost(id: string) {
  return put(`v1/post-restore/${id}`);
}
export function removePost(id: string): { [key: string]: any } {
  return put(`v1/post-remove/${id}`);
}
export function clearPost(id: string): { [key: string]: any } {
  return del(`v1/post/${id}`);
}
