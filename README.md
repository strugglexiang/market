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
- [15-图片传功能](#15-图片传功能)
- [16-axions请求为什么会发送两次](#16-axions请求为什么会发送两次)
- [17-饿了么的bug](#17-饿了么的bug)
- [18-后台怎么主动抛出错误好让axios拦截](#18-后台怎么主动抛出错误好让axios拦截)
- [19-有关权限模块的思考](#19-有关权限模块的思考)
- [20-router.beforeEach出现死循环](#20-router.beforeEach出现死循环)

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

### 15-图片传功能
参考链接：
>https://www.cnblogs.com/kongxianghai/archive/2015/02/15/4293139.html

>https://blog.csdn.net/z_alvin/article/details/78796088

>html上传文件的写法:https://www.cnblogs.com/ys-wuhan/p/5834268.html

1. 安装multiparty插件
> npm i -S multiparty
2. 引入
> let multiparty = requrie('multiparty')
3. 处理
```
1.生成mulparty对象
let form = new multiparty.Form()
2.配置上传图片的路径
form.uploadDir = './upload'
3 对上传数据处理
 form.parse(req, (err,fields,files) => {
     //fields 是获取的表单数据，因为你提交的表单有可能有除了图片以外的数据
     //files  图片上传成功后返回的信息
     //flles 是个对象，flles.fileUpload是个数组，记录了上传的文件（可能有多个）
     let inputFile = files.fileUpload[0];
     //这个时候已经上传成功了，图片在第二步配置的路径里面
     //然后可以利用node.js的fs模块对文件移动位置和重命名
        let inputFile = files.fileUpload[0]; //一定要注意这个 'fileUpload' 是input框的name值
        let oldPath = inputFile.path;
        let newPath = './upload/img/' + inputFile.originalFilename;
        // console.log(oldPath,newPath)
        //重命名为真实文件名
        fs.rename(oldPath, newPath, function(err) {
          if(err){
            return res.json({
                status:'0',
                msg:err,
                some:'图片上传成功，重命名失败',
                result:oldPath
            })
          } else {
            return res.json({
                status:'0',
                msg:err,
                some:'图片上传成功，重命名成功',
                result:newPath.slice(1)
            })
          }
        });     
 })
```


### 16-axions请求为什么会发送两次
>https://www.cnblogs.com/Upton/p/6183804.html
>
>https://www.tuicool.com/articles/3UBzIbb

OPTIONS 方法比较少见，该方法用于请求服务器告知其支持哪些其他的功能和方法。通过 OPTIONS 方法，可以询问服务器具体支持哪些方法，或者服务器会使用什么样的方法来处理一些特殊资源。可以说这是一个探测性的方法，客户端通过该方法可以在不访问服务器上实际资源的情况下就知道处理该资源的最优方式。

既然比较少见，什么情况下会使用这个方法呢？

最近在做跨域文件上传的时候，浏览器会自动发起一个 OPTIONS 方法到服务器。

如果只是普通的 ajax 请求，也不会发起这个请求，只有当 ajax 请求绑定了 upload 的事件并且跨域的时候，就会自动发起这个请求。

```
var xhr = new XMLHttpRequest();
var url = 'http://api.xxx.com/upload';
xhr.open('POST', url);
xhr.upload.addEventListener('progress', function (){
	// ...
}, false);
xhr.upload.addEventListener('load', function (){
	// ...
}, false);
xhr.upload.addEventListener('error', function (){
	// ...
}, false);
xhr.upload.addEventListener('abort',function (){
	// ...
}, false);
xhr.send(data);
```
上面的代码是在 xxx.com 域下发起了一个跨域的 POST 请求，期望提交数据到 api.xxx.com 这个域名的服务器，同时在提交数据的时候希望能监测到文件上传的实时进度。

自动发起的 OPTIONS 请求，其请求头包含了的一些关键性字段：
```
OPTIONS /upload HTTP/1.1
Access-Control-Request-Method: POST
Access-Control-Request-Headers: accept, content-type
Origin: http://xxx.com
```

在这种场景下，客户端发起的这个 OPTIONS 可以说是一个“预请求”，用于探测后续真正需要发起的跨域 POST 请求对于服务器来说是否是安全可接受的，因为跨域提交数据对于服务器来说可能存在很大的安全问题。

请求头 Access-Control-Request-Method 用于提醒服务器在接下来的请求中将会使用什么样的方法来发起请求。

那么在服务端应该如何处理这个 OPTIONS 请求呢？

这里以 node.js 服务器的 Koa 框架为例。在服务端会增加一个 OPTIONS 方法的 /upload 路由来处理客户端的这个请求。

Koa 中使用了一个比较受欢迎的 koa-router 中间件来处理路由，但是该中间件对 OPTIONS 方法默认的处理方式会有点问题。因为在响应上面的 OPTIONS 请求时，需要添加上用于访问控制的响应头。

响应头中关键性的字段：

```
Access-Control-Allow-Method: POST
Access-Control-Allow-Origin: http://xxx.com
```

Access-Control-Allow-Method 和 Access-Control-Allow-Origin 分别告知客户端，服务器允许客户端用于跨域的方法和域名。

node.js 的路由代码会是这样的：

```
router.options('/upload', function* (){
    this.set('Access-Control-Allow-Method', 'POST');
    this.set('Access-Control-Allow-Origin', 'http://xxx.com');
    this.status = 204;
});
```

关于 204 状态码的意义我经常会在面试的时候问起，这里就是一个实际应用的例子 ^_^

好了，OPTIONS 的请求处理完了，剩下的 POST 请求就简单了，只需在响应头中添加一条和 OPTIONS 一致的允许跨域的域名即可，这里就不重复粘贴代码了。


### 17-饿了么表单的一个bug
1. 分页器页码剪一后，再添加一个总数导致页数多一页的时候，点击多出的页码，不会触发事件，
要回点之前的页码，再点增加的页码
强迫症会有些受不了，有大佬会的可不可以教教我
2. 表单验证不为空可以输空格,本项目就不处理了，有点烦


### 18-后台怎么主动抛出错误好让axios拦截
```
service.interceptors.response.use(response => {
    //这里做数据处理
    //之前的拦截是做在这里的，但是并拦截不了，还是会继续执行下去
    //是因为我在后台直接res.json
    return response
},error => {
     //这里做拦截
     return Promise.reject(error)
})

发现解决方案
```
1.后端跨域要处理option请求
    if (req.method == 'OPTIONS') {
        res.end('OK')
    }
    else {
        next()
    }
2. 返回的时候带错误状态码
    return res.status(401).json({

    })
3. 这样前端response拦截器就能接收到response的错误
res.json返回的数据用error.response拿取    
```

### 19-有关权限模块的思考
思考权限这块后台要怎么写也有几天了，在这里总结一下思路，
不然回头忘了自己是怎么写的了
1. 首先在全局配置一个最基础的权限数组，只要创建员工，他就有这个权限，
sava的时候拿这个全局数组存
2. 这个全局基础数组和是前端搭配的，让前端能够很轻松的生成动态路由
3. 那么后端拿到用户的权限数组后，怎么根据他的权限数组来限制他访问接口呢？
这里的思路是这样的:
>首先我先人为的给每一个接口设置一个唯一的权限的码
>
>后台解析token的时候，拿到了用户的权限数组，写一个函数去解析
>
>解析这个前端的大路由的权限码，获得这个大路由要使用的接口的接口权限码(第一步设置的)
>存入一个本次访问的临时的数组里面(req.authority)
>
>然后再写一个express全局中间件，这个中间件判断当前访问的接口是什么接口，比对这个接口的权限
>码是不是在临时数组里面，如果不在，说明没有权限访问这个接口，return就行了。

```
1.用户最基础权限配置
let baseAuthority = [
    {
        auName: '首页',//type string
        auCode: 0,// type number
    },
    {
        auName: '登陆',//type string
        auCode: 1,// type number
    },
    {
        auName: '个人设置',//type string
        auCode: 6,// type number
    },
]
2.解析前端的权限码，生成小权限数组
function analyzeAuthority(auArray){
    let temp = []
    auArray.forEach((item,index,array) => {
        // --- 每一个item都是对象，包含auCode,auName
    })
    return temp 
}
3.权限解析逻辑
req.body.apiCode = analyzeAuthority(userInfo.authority)
4.接口权限限制中间件
function avalidateAuthority(req,res,next){
    // console.log(req.originalUrl)
    // console.log(req.apiCode)
    let currentCode = null
    switch(req.originalUrl){
        case '/user/login':
          currentCode = 1
          break;
        case '/user/checkToken':
          currentCode = 2
          break;
        case '/user/createWorker':
          currentCode = 3
          break; 
        case '/user/updateUser':
          currentCode = 4
        .......         
    }
    if(req.body.apiCode.includes(currentCode)){
        next()
    }else{
        return res.json({
            status:'0',
            msg:'你没有权限访问这个接口'
        })
    }
}
5.最后使用中间件测试
app.use((req,res,next) => {
    // console.log(req.originalUrl,req.originalUrl.includes('/upload'))
    // || req.originalUrl === '/goods/upload'
    if(req.originalUrl === '/user/login' || req.originalUrl.includes('/upload') ){
        next();
    }else{
        global.avalidateAuthority(req,res,next)
    }
})
```

### 20-router.beforeEach出现死循环
在写router.beforeEach的时候出现了死循环，检查了很久发现是因为用了
> next({ ...to, replace: true })

查询资料，了解到原理
```
next()直接跳转到to.path路径，没有再执行一遍beforeEach导航钩子，next('/')或者next('/login')自己指定路径的，路由跳转的时候还执行一遍beforeEach导航钩子，所以上面出现死循环；
栗子：如我们登录页（'/login'）面进入首页('/')，可以这么写：
router.beforeEach((to, from, next) => {
  var userInfo= JSON.parse(sessionStorage.getItem('userInfoStorage'));//获取浏览器缓存的用户信息
  if(userInfo){//如果有就直接到首页咯
    next();
  }else{
    if(to.path=='/login'){//如果是登录页面路径，就直接next()
      next();
    }else{//不然就跳转到登录；
      next('/login');
    }

  }
});
```