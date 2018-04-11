# market
维星超市管理系统

## 账号和密码
总部负责人:zong 123456 Um6Wau+VuBX8g+I
洪山分部: 洪山 123456  Um6Wau+VuBX8g+I

## 目录
- [1-项目结构搭建](#1-项目结构搭建)
- [2-使用字体图表](#2-使用字体图表)
- [3-使用elementUi](#3-使用elementUi)
- [4-根据权限动态生成路由](#4-根据权限动态生成路由)
- [5-在vue中写scss](#5-在vue中写scss)


### 1-项目结构搭建
1. 使用官方脚手架vue-cli搭建目录结构
>1. npm i -g vue-cli
>
>2. vue init webpack app 
>
>3. cd app 
>
>4. npm run dev

2. 使用vue-router
```
1.npm i -S vue-router
2.
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Vue.Router)({
    routes:{

    }
})
```
3. 使用vuex
```
1. npm i -S vuex
2.
import Vue from 'vue'
imoprt Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,(属性为函数，默认第一个参数是state)
    actions,(默认第一个参数store,第二个payload)
    mutations(默认第一个参数state,第二个payload)
})
```
4. 封装axios
```
1. npm i -S axios
2. 
import axios from 'axios'
let service  = axios.create({
    baseUrl:'',//请求域名
    timeout:''//请求超时时间
})

//reqrest拦截器
service.interceptors.request.use(
    config => {
       //config.headers[]
       return config
    },
    err => {
        //错误处理部分
      return Promise.reject(err)
    }
)
//respose拦截器
service.interceptors.response.use(
    response => {
        //业务处理部分
        return response
    },
    err => {
        //错误处理部分
        return Promise.reject(error)
    }
)

//导出
export default service
```
6. 发送ajax
```
import send from '../utils'
export function login (query){
    return send((
        url:
        method:
        data(params):
    ))
}
```

### 2-使用字体图表
```
1.npm i -S font-awesome
2.
import 'font-awesome/css/font-awesome.min.css';
```
### 3-使用elementUi
```
1. npm i -S element-ui
2.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
```

### 4-根据权限动态生成路由

### 5-在vue中写scss
为了使用sass，我们需要安装sass的依赖包
```
npm install --save-dev sass-loader
//sass-loader依赖于node-sass
npm install --save-dev node-sass

```
### 6-在vue中使用样式的经验
1. 水平垂直居中
```
水平居中:justify-content :center;
垂直居中:align-items:center;
```
2. vue中字体使用?


### 7-store里面的action里面如果要调用同级action的话
https://vuex.vuejs.org/zh-cn/actions.html#

### 8-文字不可复制
```
  -webkit-user-select: none;
  user-select: none;
```

### 9-store模块化
```
1.子模块
export default {
    actions,
    mutations,
}
2.getters模块
export default {
    计算属性(state) => {
        return state...
    }
}
3.导出store
export default {
    modules:{
        子模块
    },
    getters
}
```

### 10-class的绑定
http://www.jb51.net/article/91957.htm

