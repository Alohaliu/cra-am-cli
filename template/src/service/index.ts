// import { access } from 'fs';
import axios from 'axios';
import { get,post } from '../utils/request';

export const getInitCode = async (param?:object) => {
  return post('/api/bestZhuHai/getInitCode',param);
};
export const saveBaseInfo = async (param?:object) => {
  return post('/api/baseInfo/save',param);
};
export const getZZHUserInfo = async (requestCode:string) => {
  return post(`/api/bestZhuHai/getUserInfo/${requestCode}`);
};
export const saveHFUserInfo = async (p:any) => {
  return post('/api/huafa/saveUserInfo',p);
};
// 根据渠道信息获取产品集市的卡片及卡片内容
export const getCardTemplate = async (obj:any) => {
  return get('/api/product/getCardTemplate',obj);
};
// 根据渠道号和产品id，设备信息判断是否需要授权
export const getAccessRestrictionInfo = async (p:object) => {
  return get('/api/product/getAccessRestrictionInfo',p);
};
// 根据渠道号获取产品集市名称
export const getChannelName = async (channelCode:string) => {
  return get('/api/product/getChannelName',{channelCode});
};
// 根据渠道号获取产品集市名称
export const getMarketName = async (channelCode:string) => {
  return get('/api/product/getMarketName',{channelCode});
};
// 根据产品id获取投放的产品相关信息
export const getProductInfo = async (p:any) => {
  return get('/api/product/getProductInfo',p);
};
// 判断是否展示中转页及中转页内容
export const getTransferPage = async (p:object) => {
  return get('/api/product/getTransferPage',p);
};
// 保存流水
export const saveStatistics = async (p:object) => {
  return post('/api/baseInfo/saveStatistics',p);
};

// 最珠海，获取initCode
// export const getInitCode = async () => {
//   return get(`/api/bestZhuHai/getInitCode`);
// };

// 老客户领取礼品提交
export const saveGiftInfo = async (p:object) => {
  return post('/api/futures/saveGiftUser',p);
};
//获取app下载地址
export const getAppDwnUrl = async (p:object,header) => {
  return get('/api/futures/getDownloadLink',p,header);
};
//获取用户信息,取手机号码
export const getUserInfoes = async (p:object,header) => {
  return post('/api/customer/getUserInfo',p,header);
};

//期货新开户下载,先提交手机号信息(获取验证码)
export const getFutureCode = async (p:object) => {
  return get('/api/futures/verityCode',p);
};
//期货新开户下载,提交用户的手机号
export const subUserPhone = async (p:object) => {
  return post('/api/futures/saveNewUser',p);
};

// 产品落地页
export const getLandingPageInfo = async (id:string,isReview:string) => {
  return get(`/api/landingPage/getLandingPageInfo?id=${id}&isReview=${isReview}`);
};

export const saveLandingPage = async (p:object) => {
  return post('/api/landingPage/saveLandingPage',p);
};
export const getVerityCode = async (p:object) => {
  return get('/api/landingPage/verityCode',p);
};
export const getWechatUserInfo = async (p:object) => {
  return get('/api/wechat/getWechatUserInfo',p);
};


// 埋点数据
export const saveBuriedData = async (p:object) => {
  return post('/api/buried/saveBuriedData',p);
};
// 获取设备信息
// export const getVerityCode = async () => {
//   return get(`/api/landingPage/verityCode`,p);
// };


// 华金普惠 小贷专区 /api/cutomizePage/getCustomizePageData
export const getCustomizePageData = async (obj:any) => {
  return get('/api/cutomizePage/getCustomizePageData',obj);
};
// 华金普惠 小贷专区授权页确定授权 /api/cutomizePage/saveSmallLoanUser
export const getSaveSmallLoanUser = async (obj:any) => {
  return get('/api/cutomizePage/saveSmallLoanUser',obj);
};
// 华金普惠 获取token /api/cutomizePage/getTokenByOpenId
export const getTokenByOpenId = async (obj:any) => {
  return get('/api/cutomizePage/getTokenByOpenId',obj);
};

// 优生活 获取openid||userId
export const getUlifeUserByCode = async (param:string) => {
  return get(`/api/ulife/${param}`);
};
//根据ip获取地理位置-(接口来自:高德开放平台,高德key目前是个人) 接口已转入后台调用,未使用
export const getAddressByIp = async (ip) => {
  return axios.request({
    url: `https://restapi.amap.com/v3/ip?ip=${ip}&output=JSON&key=376217fd8876e26b89f9a29a545e3413`,
    method: 'get',
  });
};
//优生活保存地理位置-根据ip查询并保存,(接口已转入后台调用,未使用)
export const saveAddress = async (p:object) => {
  return post('/api/ulife/saveGps',p);
};
