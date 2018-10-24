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
