import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/base.less';
import App from './App';
import VConsole from 'vconsole';
import utils from '@utils/index';

// var FastClick = require('fastclick');
// FastClick.attach(document.body);
utils.clearLocalStorage();// 缓存重置;
const serviceWorker = require('./serviceWorker');
if (process.env.NODE_ENV !== 'production') {
  new VConsole();
  console.log('--------------test v 1.9.0.1---------build time:' + JSON.stringify(new Date()));
}
// 为方便单元测试，写导出方法
// 为方便单元测试，document.createElement('div')
const renderToDOM = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root') || document.createElement('div')
  );
};
renderToDOM();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export { renderToDOM };
