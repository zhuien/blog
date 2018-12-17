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
|-- build                           // webpack配置文件 \<br>
|-- config                          // 项目打包路径 \<br>
|-- mondb                           // 后台api \<br>
|   |--api                          // 后台接口 \<br>
|       |--controller                       // 控制器 \<br>
|       |--model                            // 数据模型 \<br>
|       |--index.js                         // 接口暴露 \<br>
|   |--uploads                      // 上传文件 \<br>
|   |--index.js                     // 后台入口 \<br>
|-- src                             // 源码目录 \<br>
|   |-- api                                 // 数据请求 \<br>
|   |-- assets                              // 资源文件 \<br>
|   |-- common                              // 公共方法 \<br>
|   |-- components                          // 页面\<br>
|   |-- config                              // 配置\<br>
|   |-- router                              // 路由\<br>
|   |-- store                               // 模块 \<br>
|   |-- utils                               // 工具 \<br>
|   |-- App.vue\<br>                             
|   |-- main.js\<br>                             
|-- statis                             // 静态文件 \<br>
