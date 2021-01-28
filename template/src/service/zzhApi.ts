import {get, post} from '@utils/request';

// 最珠海，获取initCode
export const getInitCode = async (p:any) => {
  return post('/api/bestZhuHai/getInitCode',p);
};

//获取分享缩略图,title,概述
export const getShareContent = async (obj:any) => {
  return get('/api/wxShare/getShareParamByProductId',obj);
};
//获取分享权限--允许/不允许分享
export const getShareJurisdiction = async (obj:any) => {
  return get('/api/wxShare/judgeShareAuth',obj);
};
//获取微信openId--通过code换取openid
export const getWxOpenId = async (obj:any) => {
  return get('/api/wxShare/getOpenId',obj);
};
//获取微信签名信息
export const getWxSign = async (obj:any) => {
  return get('/api/wxShare/wechatParam',obj);
};
//保存用户信息-保存用户信息--返回userId和parentId
export const saveShareUserInfo = async (p:any) => {
  return post('/api/wxShare/saveShareUserInfo',p);
};
//更新链路信息-分享方式-api
export const updateShareRoute = async (p:any) => {
  return post('/api/wxShare/updateShareLink',p);
};
