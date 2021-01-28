var program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
// const path = require('path');
const fs = require('fs-extra');
const validateProjectName = require('validate-npm-package-name');
const createApp = require('./createApp');
const packageJson = require('../package.json');

const questions = [
  {
    name:'name',
    message:'请输入项目名称？',
    default: 'my-cra-antd-app'
  },
  {
    name:'author',
    message:'请输入作者？',
    default: 'ldld'
  }
];
const log = console.log;
program
  .version(packageJson.version)
  .command('init')
  .description('init a new project')
  .action(function(){
    inquirer.prompt(questions).then(answer => {
      // log(chalk.green(JSON.stringify(answer)));
      checkAppName(answer.name);
      // 创建项目目录
      fs.ensureDirSync(answer.name);
      createApp(answer);
    }).catch(error => {
      log(chalk.red(error));
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    })
  });
program.parse(process.argv);// 格式化参数，必须要的;

function checkAppName(appName) {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  // TODO: there should be a single place that holds the dependencies
  const dependencies = ['react', 'react-dom', 'react-scripts'].sort();
  if (dependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        `We cannot create a project called ${chalk.green(
          appName
        )} because a dependency with the same name exists.\n` +
          `Due to the way npm works, the following names are not allowed:\n\n`
      ) +
        chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
        chalk.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
  // // 如果存在相同的名字，则退出
  // fs.pathExists(path.join(__dirname,appName)).then(() => {
  //   console.error(chalk.red('当前文件夹已存在，请重新输项目名!'));
  //   process.exit(1);
  // })
}
function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

