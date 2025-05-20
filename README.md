# qiankun-example

qiankun 实战 demo，父应用 vue，子应用使用 `react`, `vue` 和 `原生HTML`。

[微前端qiankun从搭建到部署的实践](https://juejin.im/post/6875462470593904653)

## 开始
安装根目录工程依赖
```
npm i
```
一键安装所有主子应用的依赖
```
npm run install
```

一键启动所有所有应用
```
npm start
```

通过 [http://localhost:8080/](http://localhost:8080/) 访问主应用。

## 发布
一键构建并打包所有主子应用
```
npm run build
```
问题记录
vite项目作为子应用, base路由不能有两级路径, 否则vite-plugin-qiankun创建的文件会出现类似http://localhost:8083/subapp/subapp/sub-vue3/@vite/client的错误链接

