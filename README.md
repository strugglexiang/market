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
- [6-在vue中使用样式的经验](#6-在vue中使用样式的经验)
- [7-store里面的action里面如果要调用同级action的话](#7-store里面的action里面如果要调用同级action的话)
- [8-文字不可复制](#8-文字不可复制)
- [9-store模块化](#9-store模块化)
- [10-class的绑定](#10-class的绑定)
- [11-函数节流](#11-函数节流)
- [12-解决打包问题](#12-解决打包问题)
- [13-有关系统安全性的考虑](#13-有关系统安全性的考虑)
- [14-后台api分页经验](#14-后台api分页经验)


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

### 11-函数节流
http://www.jb51.net/article/105022.htm
1. 这种实现方式的思路很好理解：设置一个一间隔时间，比如50毫秒，以此时间为基准设置定时器，当第一次触发事件到第二次触发事件间隔小于50毫秒时，清除这个定时器，并设置一个新的定时器，以此类推，直到有一次事件触发后50毫秒内没有重复触发。
```
function debounce(method){ 
  clearTimeout(method.timer); 
  method.timer=setTimeout(function(){ 
   method(); 
  },50); 
} 
这种设计方式有一个问题：本来应该多次触发的事件，可能最终只会发生一次。具体来说，一个循序渐进的滚动事件，如果用户滚动太快速，或者程序设置的函数节流间隔时间太长，那么最终滚动事件会呈现为一个很突然的跳跃事件，中间过程都被节流截掉了。这个例子举的有点夸张了，不过使用这种方式进行节流最终是会明显感受到程序比不节流的时候“更突兀”，这对于用户体验是很差的。有一种弥补这种缺陷的设计思路。
```
2. 第二种实现方式的思路与第一种稍有差别：设置一个间隔时间，比如50毫秒，以此时间为基准稳定分隔事件触发情况，也就是说100毫秒内连续触发多次事件，也只会按照50毫秒一次稳定分隔执行。代码如下：
```
var oldTime=new Date().getTime(); 
var delay=50; 
function throttle1(method){ 
  var curTime=new Date().getTime(); 
  if(curTime-oldTime>=delay){ 
   oldTime=curTime; 
   method(); 
  } 
} 
```
```
var timer=undefined,delay=50; 
function throttle2(method){ 
  if(timer){ 
    return ; 
  } 
  method(); 
  timer=setTimeout(function(){ 
    timer=undefined; 
  },delay); 
}
```


https://segmentfault.com/q/1010000008160697

### 12-解决打包问题
打包出现空白页
>config文件夹下 index.js
```
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
```
https://www.cnblogs.com/wanf/p/7871787.html

字体图标打包错误
在build utils.js文件下
```
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath:'../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```


### 13-有关系统安全性的考虑 
>系统安全性主要依靠于token的验证上面
>
>为了防止有人用本部门的token去访问别的部门的api
>
>我会为每个部门设置一个了代表部门的秘钥信息
>
>每当往数据库中新增一个用户，给这个用户添加一个属性，属性值为本部门秘钥
>
>查询的时候控制field不返回这个秘钥信息
>
>token解析和本部门的秘钥做对比，一致则能继续访问，不一致则代表了是莫名攻击
>
>或者生成token的时候把本部门秘钥信息带入生成
>
>本系统暂时不做这个，毕竟只是自己用


### 14-后台api分页经验
分页是按函数顺序执行的
```
model
.sort()
.find(params)
.limit(pageSize)
.skip(pageSize*(pageNo-1))
1.根据我自己Postman测试接口，正确的顺序应该要这么写
find > sort > limit > skip
2.这里有个问题，那就是统计数目的时候要在find后统计，不能在最开始统计
```