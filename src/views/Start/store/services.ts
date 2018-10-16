import { post } from '../../../utils/requestRemote';

export function login(data: object) {
  return post('v1/login', data);
}
