import axios from 'axios';
import _ from 'lodash';

const credentials = 'same-origin'; // include
const CONTENT_TYPE = 'Content-Type';
const JSON_TYPE = 'application/json';

// 后台API URI前端
let apiPrefix = 'http://localhost:3000/';
// token获取方法
let getToken;

interface Options {
  body: object;
  method: string;
}
export default function request(url: string, { body, method }: Options) {
  return axios.create({
    url,
  });
}
