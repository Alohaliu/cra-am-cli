import {saveBuriedData} from '@service/index';
import constant , { versionNumber } from '@constant/index';
import * as huafaSDK from './nativeSDK/huafaAppNative';
const md5 = require('md5');
const userAgent = window.navigator.userAgent;
export default {
  generateNonceStr() {
    return Math.random().toString(36).substr(2, 15);
  },
  getTimestamp() {
    return new Date().getTime();
  },
  getSignatureObj() {
    // eslint-disable-next-line
    const nonceStr = this.generateNonceStr();
    const timestamp = this.getTimestamp();
    const signature = md5(process.env.APP_ID + process.env.APP_SCRET + timestamp + nonceStr);
    return {
      'x-appKey': process.env.APP_ID,
      'x-randomSeries': nonceStr,
      'x-sign': signature,
      'x-timestamp': timestamp
    };
  },
  getURLParameters() {
    const url = window.location.href.replace(/\s+/g,'');
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
      (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
      {}
    );
  },
  clearLocalStorage() {
    if (localStorage.getItem('resetLocalStorage')) {
      return;
    }
    localStorage.clear();
    localStorage.setItem('resetLocalStorage','1');
  },
  isHuafaAppWebview() {
    return userAgent.indexOf('MissonWebKit') > -1
      || userAgent.indexOf('mideaConnect') > -1;
  },
  isHJFutureAppWebview() {
    return userAgent.toLowerCase().indexOf('lightos') > -1;
  },
  isBestZhuhaiAppWebview() {
    return userAgent.indexOf('smt_ios') >= 0
      || userAgent.indexOf('smt_android') >= 0;
  },
  /**
   * sdk utils begins
   */
  getHuafaSDKUrl() {
    const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    const flatform = isIOS ? 'ios' : 'android';
    // ios 要区分 new old版本
    const versionPrefix = !isIOS ? '' : userAgent.indexOf('MissonWKCordova') > -1 ? 'new/' : 'old/';
    // const fileName = isIOS && userAgent.indexOf('MissonWKCordova') > -1 ? 'cordova1' : 'cordova';
    return `${constant.baseDoain}/common-assets/huafaSDK/${flatform}/${versionPrefix}cordova.js`;
  },
  getSDKConfig() {
    let platform = 'h5';
    this.isHuafaAppWebview() && (platform = 'huafaApp');
    this.isHJFutureAppWebview() && (platform = 'hjFutureApp');
    this.isBestZhuhaiAppWebview() && (platform = 'bestZhuhaiApp');
    console.log('platform=' + platform);
    const huafaSDKUrl = this.getHuafaSDKUrl();
    switch (platform) {
    case 'huafaApp':
      return {
        isNeedRegisterSDK: true,
        SDKUrl: huafaSDKUrl,
        action: 'huafaApp'
      };
    case 'hjFutureApp':
      return {
        isNeedRegisterSDK: false,
        SDKUrl: '',
        action: 'hjFutureApp'
      };
    case 'bestZhuhaiApp':
      return {
        isNeedRegisterSDK: true,
        SDKUrl: constant.bestZhuhaiSDKUrl,
        action: 'bestZhuhaiApp'
      };
    case 'h5':
      return {
        isNeedRegisterSDK: false,
        SDKUrl: '',
        action: 'h5'
      };
    default :
      return {
        isNeedRegisterSDK: false,
        SDKUrl: '',
        action: ''
      };
    }
  },
  dipacthSDKAction(actionType:string,cb:()=> void) {
    switch (actionType) {
    case 'huafaApp':
      this.handlerHuafaAppAction(cb);
      break;
    case 'hjFutureApp':
      this.handlerHjFutureApp(cb);
      break;
    case 'bestZhuhaiApp':
      this.handlerBestZhuhaiApp(cb);
      break;
    default:
      break;
    }
  },
  handlerHuafaAppAction(cb?:()=>void) {
    // 获取用户信息，地理位置信息
    document.addEventListener('deviceready', () => {
      huafaSDK.getUser(cb);
      huafaSDK.getLocation();
      huafaSDK.getDeviceInfo();
    });
  },
  handlerBestZhuhaiApp(cb?:()=>void) {
    cb();
  },
  handlerHjFutureApp(cb?:()=>void) {
    cb();
  }
  /**
   * sdk utils ends
   */
};
//设置埋点信息TDAPP.onEvent (EventId, Label, MapKv);
export const setSpot = (EventId) => {
  try {
    (window as any).TDAPP.onEvent(EventId);
    return true;
  } catch (err) {
    return false;
  }
};

export const saveBuriedDataByApi = async (
  eventId,
  labelCnName,
  labelEnName,
  channelVersion,
  deviceId,
  gpsId,
  twoChannelId,
  productId,
  userId,
  endTime,
  cardId,
  fissionType,
  shareChannelId,
  shareSource,
  shareUserId,
  beginTime
) => {
  await saveBuriedData({
    beginTime, //开始时间
    channelVersion, //渠道版本号
    deviceId, //设备id
    eventId,//埋点页面名称(根据Excel需求表中Event ID填写)
    gpsId, //位置id
    h5Version: versionNumber, //前端版本号
    oneChannelId: twoChannelId ? twoChannelId.split('-')[0] : '', //一级渠道号
    twoChannelId, //二级渠道号
    productId, //产品id
    cardId, //首页卡片id
    userId: userId ? userId : '',//用户id
    endTime,//离开页面时间
    fissionType,//裂变方式(1微信,2微信朋友圈,7复制链接)
    labelCnName, //label中文名称
    labelEnName,//label英文名称
    shareChannelId,//分享渠道id
    shareSource,//分享源(最珠海,华发+,...)-目前只有最珠海分享
    shareUserId,//分享人id
  });
  let firstParameter = (eventId === '产品集市首页' || eventId === '信息授权页' || eventId === 'LOGO中转页') ? eventId : productId + eventId;
  let commonId = (labelCnName === '卡片曝光' || labelCnName === '卡片点击') ? cardId : productId;
  let eventData = firstParameter + ';' + labelCnName + ';' + labelEnName + ';' + commonId + ';' + twoChannelId + ';' + gpsId + ';' + shareChannelId + ';' + deviceId + ';' + userId;
  setSpot(eventData);
};
//js获取浏览器信息
export const getBrowserInformation = async () => {
  const browserInformation = (window as any).navigator;
  let jub = typeof browserInformation?.getBattery === 'function';
  const levelNum = jub ? (await browserInformation.getBattery().then(function (battery) {
    return battery.level * 100 + '%';
  })) : undefined;
  let obj = {
    appCodeName: browserInformation?.appCodeName,
    appName: browserInformation?.appName,
    appVersion: browserInformation?.appVersion,
    language: browserInformation?.language,
    platform: browserInformation?.platform,
    userAgent: browserInformation?.userAgent,
    onLine: browserInformation?.onLine,
    geolocation: browserInformation?.geolocation,
    battery: levelNum,
    javaEnabled: browserInformation?.javaEnabled(),
    oscpu: browserInformation?.oscpu,
    connection: browserInformation?.connection,
    IP: ''
  };
  return obj;
};
//优生活- 特有方法
export const isMobile = {
  Windows: function () {
    return (/IEMobile/i).test(navigator.userAgent);
  },
  Android: function () {
    return (/Android/i).test(navigator.userAgent);
  },
  BlackBerry: function () {
    return (/BlackBerry/i).test(navigator.userAgent);
  },
  iOS: function () {
    return (/iPhone|iPad|iPod|iOS/i).test(navigator.userAgent);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Windows()
    );
  },
};
//优生活- 特有方法
export const shareParam = function (source) {
  let array = [];
  for (let key in source) {
    let newkey = encodeURIComponent(key);
    let newvalue = source[key];
    array.push(newkey + '=' + newvalue);
  }

  return array.join('&');
};
//优生活- 特有方法
export const generateShareUrlWithParam = function (original, param) {
  if (original.indexOf('?') !== -1) {
    // @ts-ignore
    return original + '&' + shareParam(param);
  } else {
    // @ts-ignore
    return original + '?' + shareParam(param);
  }
};
