const target = process.env.TARGET;

let prdPath = 'h5-market2';
switch (target) {
case 'h5':
  prdPath = 'h5-market2';
  break;
case 'test-prd':
  prdPath = 'h5-market3';
  break;
default:
  prdPath = 'h5-market';
}
export const baseName = prdPath;
export const versionNumber = '1.0.7';
const common = process.env.TARGET === 'production' ?
  {
    // 生产环境
    'baseDoain': 'https://product-oac.huafaih.com',
    'bestZhuhaiSDKUrl': '//app.bestzhuhai.com.cn/public/lib/jpasc-0.4.0.js'
  } : {
    // 测试环境
    'baseDoain': 'https://product-oac-stg.huafaih.com',
    'bestZhuhaiSDKUrl': 'https://smt-open.yun.city.pingan.com/lib/zhuhai/jpasc-0.4.0.js'
  };
export default common;
