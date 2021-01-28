import axios from 'axios';
import common from './index';
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();

import history from 'history/browser';
import {baseName} from '@constant/index';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://product-xxxx.com/prod-api'
  : 'https://test-xxx.com/stage-api';
const instance = axios.create({ //创建axios实例，在这里可以设置请求的默认配置
  timeout: 6000, // 设置超时时间10s
  baseURL: baseUrl // 根据自己配置的反向代理去设置不同环境的baeUrl
});
// 统一设置post请求头。
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.response.use(response => {
  // console.log('interceptors response',JSON.stringify(response));
  if (response.status === 200 && (response.data.code !== 500
    || response.data.code !== 100002)) {
    return response;
  }
  if (response.status === 200 && response.data.code === 100002) {
    // 产品已下架
    history.push(`/${baseName}/exception?pageType=undercarriage`);
    return;
  }
}, error => {
  if (error) {
    // alert('请求超时');
    console.log('request error',error);
    history.push(`/${baseName}/exception?pageType=error`);
    return error;
  }
});

function TimeoutPromise(ms = 5000, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('timeout');
    }, ms);
    promise.then(resolve, reject);
  })['catch'](err => {
    let resPage = typeof err === 'string' && err === 'timeout' ? 'error' : 'busy';
    history.push(`/${baseName}/exception?pageType=${resPage}`);
    window.location.reload();
  });
}

/* 统一封装get请求 */
export const get = (url, params = {}, config = {headers: common.getSignatureObj()}) => {
  const getPromise = new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      if (response === undefined) {
        // @ts-ignore
        // debugger;
        history.push(`/${baseName}/exception?pageType=error`);
        window.location.reload();
      } else {
        resolve(response.data);
      }
    })['catch'](error => {
      reject(error);
    });
  });
  return TimeoutPromise(10000,getPromise);
};
/* 统一封装post请求  */
export const post = (url, data = {}, config = {headers: common.getSignatureObj()}) => {
  const postPromise = new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      if (response === undefined) {
        history.push(`/${baseName}/exception?pageType=error`);
        window.location.reload();
      } else {
        resolve(response.data);
      }
    })['catch'](error => {
      reject(error);
    });
  });
  return TimeoutPromise(5000,postPromise);
};

