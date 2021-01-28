/**
* @param key
* @param data
* @param time 失效时间（秒）,默认一周
* @returns {boolean}
*/
export const localStorageSet = (key:string, data:any, time?:number)=> { // 存储数据
//   console.log('测试存储localStorage',key, data, time);
  try {/* eslint-disable */
	if (!localStorage) {
	  return false
	}
	if(!time || isNaN(time)) {
	  time = 60 * 60 * 24 * 7;
	}
	const cacheExpireDate = ((new Date() as any) - 1) + time*1000;
	const cacheVal = { val: data, exp: cacheExpireDate };
	localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值
  }catch (e) {
	console.log(e)
  }
};
export const localStorageGet =  (key:string)=> { // 获取数据
  try{
	if (!localStorage) {
	  return false;
	}
	const cacheVal = localStorage.getItem(key);
	const result = JSON.parse(cacheVal);
	const now = (new Date() as any) - 1;
	//缓存不存在
	if (!result) {
	  return null;
	}
	//缓存过期
	if (now > result.exp) {
	  localStorageRemove(key);
	  return "";
	}
	return result.val;
	} catch (e) {
	  localStorageRemove(key);
      return null;
    }
};
export const localStorageRemove = (key:string)=> { // 删除数据
  if (!localStorage) {
	return false;
  }
  localStorage.removeItem(key);
}
export default {
  set: localStorageSet,
  get: localStorageGet,
  remove: localStorageRemove
}