const which = require('which');
const chalk = require('chalk');
const log = console.log;
/**
 * 
 * @param {*} installArg  执行命令 命令行组成的数组，默认为 install 
 */
module.exports = function (root,installArg = [ 'install' ]) {
  /* 通过第一步,闭包保存npm */  
  const npm = findNpm();
  return function (done){
    if(root){
      process.chdir(root);
      log(chalk.green( '当前新建项目目录为:'+ process.cwd()));
    }
    log(chalk.yellow('Installing packages. This might take a couple of minutes.'));
    /* 执行命令 */  
    runCmd(which.sync(npm),installArg, function () {
      /* 执行成功回调 */
      log(chalk.green('依赖包安装完成！\n\n\n'));
      log(
        chalk.green(
          `\n项目初始化完成，您可以执行如下命令.\n` +
            `\n npm start: 启动项目\n`+
            `\n npm run uat : 测试环境打包\n`+
            `\n npm run build : 生产环境环境打包\n`
          +`\n\n`+
          `\n更多命令，请参考package.json文件中的 scripts部分.\n`
        )
      );
      done && done()
    })
  }
}
  /**
 * 
 * @param {*} cmd   
 * @param {*} args 
 * @param {*} fn 
 */
/* 运行终端命令 */ 
function runCmd(cmd, args, fn) {
  args = args || []
  var runner = require('child_process').spawn(cmd, args, {
    stdio: 'inherit'
  })
  runner.on('close', function (code) {
    if (fn) {
    fn(code)
    }
  })
}
/* 找到npm */
function findNpm() {
  var npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm']
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i])
      // console.log('use npm: ' + npms[i])
      return npms[i]
    } catch (e) {
    }
  }
  throw new Error('please install npm')
}