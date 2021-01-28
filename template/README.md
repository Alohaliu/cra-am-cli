### 本地开发
- 1 npm install （或 yarn install）
- 2 npm start
### 启动打包命令
- npm start   本地启动，集成了jssdk 调用华发+ native原生接口
- npm start:h5   本地启动，纯h5不包含调任何native原生接口
- npm run uat  测试环境打包，集成了jssdk 调用华发+ native原生接口
- npm run uat:h5  测试环境打包，纯h5不包含调任何native原生接口
- npm run build
- npm run build:h5

### 代码提交
git add .  
npm run commit (or yarn commit)

### 代码提交注释规范

- init:初始提交
- feat:增加新功能
- fix:修复bug
- ui:更新UI
- refactor:代码重构
- release:发布
- deploy:部署
- docs:修改文档
- test:增删测试
- chore:更改配置文件
- style:修改不影响逻辑,代码换行，空格处理(并非CSS修改)
- revert:版本回退
- add:添加依赖
- minus:版本回退
- del:删除代码/文件


### 测试打包命令
npm run uat
npm run uat:h5

### 生产部署
#### h5-market打包
./deploy.sh
#### h5-market2打包
./deploy.sh h5

### h5-market 与h5-market2区别
在1.0.9版本之前:

- h5-market: 集成了jssdk 调用华发+ native原生接口,路径为 /zhfi/OAC/apps/h5-market
- h5-market2: 纯js的内容，部署路径为/zhfi/OAC/apps/h5-market2

在1.0.9版本之后的版本:

无区别





