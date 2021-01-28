
const chalk = require('chalk');
const fs = require('fs-extra');
const copy =require('./copy');
const install = require('./install');
const log = console.log;

module.exports = function(res){
  const {name} = res;
  /* 找到template文件夹下的模版项目 */
  const sourcePath = `${__dirname.slice(0,-3)}template`;
  /* 修改package.json*/
  revisePackageJson(res,sourcePath).then(()=>{
    log(chalk.green('2.基础文件拷贝开始...'))
    copy(sourcePath ,`${process.cwd()}/${name}`,install(name));
  });
}

function revisePackageJson(res,sourcePath){
    log(chalk.green('1.package.json文件创建开始...'))
    return new Promise((resolve)=>{
      /* 读取文件 */
        fs.readFile(sourcePath+'/package.json',(err,data)=>{
            if(err) throw err
            const { author , name  } = res
            let json = data.toString()
            /* 替换模版 */
            json = json.replace(/my-cra-antd-app/g,name.trim())
            json = json.replace(/ldld/g,author.trim())
            const path = process.cwd()+ '/'+name +'/package.json';
            /* 写入文件 */
            fs.writeFile(path, Buffer.from(json) ,()=>{
              // console.log(chalk.green(( '创建文件：'+ path )));
              log(chalk.green('package.json文件创建完成'));
              resolve()
            })
            // fs.writeFileSync(
            //   path,
            //   JSON.stringify(packageJson, null, 2) + os.EOL
            // );
        })
    })
}
function copy2(from,to,cb){

}