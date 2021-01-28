export const getInfo = () => {
  const param = ['usrPhone','usrId','deviceId','publicIP','deviceType'];
  return new Promise((resolve,reject) => {
    const cb = (data) => {
      if (data && typeof data === 'object') {
        resolve(data);
      } else {
        reject(data);
      }
      console.log(JSON.stringify(data));
    };
    setTimeout(() => {
      if ((window as any).LightJSBridge) {
        (window as any).LightJSBridge.call('winner.getNativeData', param, cb);
      }
    },100);
  });
};
