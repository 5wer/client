import { post, get, del, put } from '../../../utils/requestRemote';

interface Book {
  [key: string]: any;
}

export function books() {
  return get('v1/books');
}
export function booksRemoved() {
  return get('v1/booksRemoved');
}
export function createBook(data: Book) {
  return post('v1/book', data);
}
export function updateBook(data: Book) {
  return put('v1/book', data);
}
export function removeBook(id: string) {
  return del(`v1/book/${id}`);
}
export function restoreBook(id: string) {
  return put(`v1/book/${id}`);
}
