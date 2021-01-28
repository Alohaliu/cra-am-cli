import {localStorageSet} from '../storageUtil';
type huafaJSSDKType = 'MideaCommon'|'MideaMap'|'MideaUser';
type huafaJSSDKMethodName = 'openUrl'|'exit'|'goBack'|'hideNav'|'showNav'
  |'openSysBrowser'|'getUser'|'location'|'getDeviceInfo'|'showShare';
const huafaNativeCall = (sdkType:huafaJSSDKType,methodName:huafaJSSDKMethodName,
  p?:any,cb?:(result:any)=>void,cb2?:()=>void) => {
  if ((window as any).cordova) {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    cordova.exec(function (result) {
      console.log('回调成功: ' + JSON.stringify(result));
      cb && cb(result);// 保存相关信息
      cb2 && cb2();// 供业务场景入参调用
    },function () {
      console.log('回调失败');
    }, sdkType, methodName, p);
  }
};
const saveUserData = (data:object) => {
  localStorageSet('huafaUser',data || '{}');
  localStorageSet('openId',(data as any).uid);
};
const saveDeviceInfoData = (data:object) => {
  localStorageSet('huafaDeviceInfo',data || '{}');
};
const saveLocationData = (data:object) => {
  localStorageSet('huafaLocation',data || '{}');
};
// 通过华发webview打开url
export const openUrl = (targetUrl:string) => huafaNativeCall('MideaCommon','openUrl',[targetUrl,'']);
// 关闭当前webview
export const closeWebview = () => huafaNativeCall('MideaCommon','exit','');
// 返回
export const goBack = () => huafaNativeCall('MideaCommon','goBack',[]);
// 隐藏title
export const hideNav = () => huafaNativeCall('MideaCommon','hideNav',[]);
// 显示title
export const showNav = () => huafaNativeCall('MideaCommon','showNav',[]);
// 调用系统默认浏览器打开url
export const openWithDefaultBrowser = (u:string) => huafaNativeCall('MideaCommon','openSysBrowser',[u]);
// 获取用户信息
export const getUser = (cb2:()=>void) => huafaNativeCall('MideaUser','getUser',[],saveUserData,cb2);
// 获取地理位置信息
export const getLocation = () => huafaNativeCall('MideaMap','location',['0'],saveLocationData);
// 获取设备信息
export const getDeviceInfo = () => huafaNativeCall('MideaCommon','getDeviceInfo',[],saveDeviceInfoData);
// 调用分享
export const openShareContainer = (shareData:object) => huafaNativeCall('MideaCommon','showShare',[shareData]);


