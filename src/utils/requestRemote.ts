import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { Message } from 'element-ui';
export const router = require('../router.ts').default;

const CONTENT_TYPE: string = 'Content-Type';
const JSON_TYPE: string = 'application/json';

let baseURL: string = 'http://localhost:3000/';
let token: string = '';
export function setToken(t: string): void {
  if (t === '') {
    token = t;
    window.sessionStorage.removeItem('token');
    return;
  }
  const _token: string = `Bearer ${t}`;
  window.sessionStorage.setItem('token', _token);
  token = _token;
}
function getToken() {
  if (token) {
    return token;
  }
  return window.sessionStorage.getItem('token');
}

export function getType(res: AxiosResponse) {
  return res.headers.get(CONTENT_TYPE);
}
interface ResData {
  code: number;
  data?: any;
  msg?: string;
}
export function parseResponse(res: AxiosResponse) {
  // TODO 这里只处理了json类型的返回值, 如果有其他类型的需要再扩展
  const data: ResData = res.data;
  return Promise.resolve(data);
}
export function checkStatus(data: ResData) {
  if (data.code > 0) {
    // 业务码大于0时表示业务处理失败
    return Promise.reject(`请求失败(code:${data.code}) ${data.msg}`);
  }
  return Promise.resolve(data);
}
interface Options {
  data: {
    [key: string]: string;
  };
  method: string;
}
export default function request(
  url: string,
  { data, method }: Options,
  other?: object,
) {
  const options = {
    url,
    method,
    baseURL,
    data,
    headers: { [CONTENT_TYPE]: JSON_TYPE, Authorization: getToken() },
    ...other,
  };
  switch (method.toUpperCase()) {
    case 'GET':
    case 'DELETE': {
      const _url = (function(url, data): string {
        let query: string = '?';
        for (let d in data) {
          if (data.hasOwnProperty(d)) {
            query += `${d}=${data[d]}&`;
          }
        }
        query.replace(/\&$/, '');
        return `${url}${query}`;
      })(url, data);
      options.url = _url;
      delete options.data;
      break;
    }
    case 'POST':
    case 'PUT':
    case 'PATCH': {
      // TODO 这三种请求方式没做任何处理
      break;
    }
  }
  return axios(options)
    .then(parseResponse)
    .then(checkStatus)
    .catch((err) => {
      Message.error(err);
    });
}
const createMethod = (method: string) => (
  url: string,
  data: any,
  other?: object,
) => {
  return request(url, { method, data }, other);
};
export const get = createMethod('get');
export const post = createMethod('post');
export const del = createMethod('delete');
export const put = createMethod('put');
