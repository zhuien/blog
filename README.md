# blog

> nodejs+vue+mongodb+express+elementui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# 目录结构
```
|-- build                           // webpack配置文件
|-- config                          // 项目打包路径
|-- mondb                           // 后台api
|   |--api                          // 后台接口
|       |--controller                       // 控制器
|       |--model                            // 数据模型
|       |--index.js                         // 接口暴露
|   |--uploads                      // 上传文件
|   |--index.js                     // 后台入口
|-- src                             // 源码目录
|   |-- api                                 // 数据请求
|   |-- assets                              // 资源文件
|   |-- common                              // 公共方法
|   |-- components                          // 页面
|   |-- config                              // 配置
|   |-- router                              // 路由
|   |-- store                               // 模块
|   |-- utils                               // 工具
|   |-- App.vue                           
|   |-- main.js                             
|-- static                             // 静态文件
```