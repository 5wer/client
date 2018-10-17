import { post, get } from '../../../utils/requestRemote';

export function login(data: object) {
  return post('v1/login', data);
}
export function getUserInfo() {
  return get('v1/getUserInfo');
}
export function registe() {
  return post('v1/getUserInfo');
}
