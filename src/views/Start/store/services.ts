import { post } from '../../../utils/request.js';

export function login(data: object) {
  return post('v1/login', data);
}
