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
- [7-store里面的action里面如果要调用同级action的话](#7-store里面的action里面如果要调用同级action)
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
- [20-router.beforeEach中next的理解](#20-router.beforeEach中next的理解)
- [21-es6数组去重](#21-es6数组去重)
- [22-underscore对数组按照自定义顺序排序](#22-underscore对数组按照自定义顺序排序)
- [23-mongoose创建时间和更新时间](#23-mongoose创建时间和更新时间)
- [24-mongodb中group进行分组计算](#24-mongodb中group进行分组计算)
- [25-mongodb使用聚合](#25-mongodb使用聚合)
- [26-mongoose数组类型数据操作](#26-mongoose数组类型数据操作)
- [27-vue里面父子组件通信](#27-vue里面父子组件通信)
- [28-vue里面非父子组件通信](#28-vue里面非父子组件通信)
- [29-axios同时发送多个请求](#29-axios同时发送多个请求)
- [30-vue中使用echarts](#30-vue中使用echarts)
- [31-echart图表随宽度变化而变化](#31-echart图表随宽度变化而变化)
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
3. 文本过长省略号
```
1. 单行
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
2. 多行（不要限制高度）
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;//行数控住
overflow: hidden;
```


### 7-store里面的action里面如果要调用同级action
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
```
发现解决方案:
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
1. 用户最基础权限配置
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
2. 解析前端的权限码，生成小权限数组
function analyzeAuthority(auArray){
    let temp = []
    auArray.forEach((item,index,array) => {
        // --- 每一个item都是对象，包含auCode,auName
    })
    return temp 
}
3. 权限解析逻辑
req.body.apiCode = analyzeAuthority(userInfo.authority)
4. 接口权限限制中间件
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
5. 最后使用中间件测试
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

### 20-router.beforeEach中next的理解 
> next({ ...to, replace: true })  replace设置为true应该是为了等路由完全加载完成后再跳转，清除历史记录,也可以避免死循环;解决手动刷新后动态路由丢失

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
> 我在做这个动态路由的时候出现死循环是因为请求回来的至少要有一个权限，如果没有，addRoute === 0 就一直成立，所有会一直出现死循环，所以我设置了每个人都至少有首页、登录、修改个人信息的权限

### 21-es6数组去重
用到set和Array.from。
```
1.set 接收数组去重，但返回的是对象
let arr = [1,1,'1','1',undefined,undefined,NaN,NaN]
console.log(new set(arr))
2.就该轮到Array.from出场了，它的作用，就是可以把类数组对象、可迭代对象转化为数组。
cosnole.log(Array.from(new Set(arr)))
```


###  22-underscore对数组按照自定义顺序排序
http://yijiebuyi.com/blog/76ac90e5bd31253769f205888bc23cee.html
```
如果你的数组是一个对象组合
var arr=
[
{"key":"key1","value":"value1","createTime":"124573216"},
{"key":"key2","value":"value2","createTime":"124593216"},
{"key":"key3","value":"value3","createTime":"124596216"},
{"key":"key4","value":"value4","createTime":"124596286"},
{"key":"key5","value":"value5","createTime":"124596289"},
]
正序排列
_.sortBy(arr, function(item) {
  return item.createTime;
});
如何倒序排列
_.sortBy(arr, function(item) {
  return -item.createTime;
});

```


### 23-mongoose创建时间和更新时间
在schema中设置timestamps为true，schema映射的文档document会自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
```
var UserSchema = new Schema(
  {...},
  { timestamps: true }
);
```
https://www.cnblogs.com/duhuo/p/6232534.html

https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm_source=itdadao&utm_medium=referral


### 24-mongodb中group进行分组计算
```
// 准备测试数据
db.user.drop();
for(var i=10; i< 100; i++) {
  db.user.insert({
    name:"user" + i, 
    age : Math.floor(Math.random()*10)+ 20, 
    sex : Math.floor(Math.random()*3)%2 ==0 ? 'M' : 'F',
    chinese : Math.floor(Math.random()*50)+50,
    math : Math.floor(Math.random()*50)+50,
    english : Math.floor(Math.random()*50)+50,
    class : "C" + i%5
  })
}
 
// group函数
// 按照class进行分组，显示每个class中的用户姓名和性别
db.user.group({
  key: {"class": true},
  initial: {"person": []},
  reduce: function(cur, prev) {
    prev.person.push({name: cur.name, sex: cur.sex, age: cur.age});
  }
});
 
// 对age>25的用户，按照class进行分组，显示每个class中的用户姓名和性别，并统计每组的人数
db.user.group({
  key: {"class": true},
  initial: {"person": []},
  reduce: function(doc, out){
    out.person.push({name: doc.name, sex: doc.sex, age: doc.age});
  },
  finalize: function(out){
    out.count = out.person.length;
  },
  condition: {"age": {$gt: 25}}
})
 
// 分组计算每个class中，chinese最大值和最小值
db.user.group({
  key: {"class": true},
  initial: {"chinese_min": 0, "chinese_max":0 },
  reduce: function(doc, out){
    out.chinese_min = doc.chinese;
    out.chinese_min = doc.chinese;
 
    out.chinese_min = Math.min(out.chinese_min, doc.chinese);
    out.chinese_max = Math.max(out.chinese_max, doc.chinese)
  },
})
```
group参数选项：
1. key： 这个就是分组的key,如果指定了key:{“day” : true}，那么在分组的结果中就会显示每组“day”的键值。
2. initial： 每组都分享一个初始化函数，特别注意：是每一组initial函数。
3. reduce： 这个函数的第一个参数是当前的文档对象，第二个参数是上一次function操作的累计对象。有多少个文档， $reduce就会调用多少次。
4. condition： 这个就是过滤条件。
5. finalize： 这是个函数，每一组文档执行完后，多会触发此方法。

### mongodb使用聚合
https://cnodejs.org/topic/56ac82e724b0c1ec628ff0d2
https://blog.csdn.net/suyu_yuan/article/details/51768725
mongodb官方：https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group
菜鸟教程详细说明:http://www.runoob.com/mongodb/mongodb-aggregate.html
```
1.数据
{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-03-15T09:00:00Z") }
{ "_id" : 4, "item" : "xyz", "price" : 5, "quantity" : 20, "date" : ISODate("2014-04-04T11:21:39.736Z") }
{ "_id" : 5, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-04-04T21:23:13.331Z") }
2.使用
db.sales.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
)
3.结果
{ "_id" : { "month" : 3, "day" : 15, "year" : 2014 }, "totalPrice" : 50, "averageQuantity" : 10, "count" : 1 }
{ "_id" : { "month" : 4, "day" : 4, "year" : 2014 }, "totalPrice" : 200, "averageQuantity" : 15, "count" : 2 }
{ "_id" : { "month" : 3, "day" : 1, "year" : 2014 }, "totalPrice" : 40, "averageQuantity" : 1.5, "count" : 2 }
```

### 26-mongoose数组类型数据操作
<https://blog.csdn.net/xuweilinjijis/article/details/77044853>
```
var mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost:27017/test');  
var db = mongoose.connection;  
db.on('error',function (err) {  
  console.log('Mongoose connection error: ' + err);  
});  
  
db.once('open', function() {  
  console.log('Mongoose connection connected!');  
});  
  
var Schema = mongoose.Schema;  
  
var userSchema = new Schema({  
    _id : String,  
    tags: [{ _id: false, tagID: Number, optDate: Date, enable: Boolean }]  
});  
  
var User = mongoose.model('User', userSchema,'user');  
  
//查询  
User.aggregate({ $project: { _id : 1, tags: 1 } }).unwind('tags').exec(function (err, users) {  
  if (err) return console.error(err);  
  console.log(users);  
});  
  
//插入  
User.update({ "_id" : "195861"}, { $push : { tags: {tagID : 1, optDate : Date("2016-08-12T15:21:02.930Z"), enable : false}}},function(err,result){  
  if (err) return console.error(err);  
  console.log(result);  
  });  
  
//删除  
User.update({ "_id" : "195861"}, { $pull : { tags: {tagID : 2}}},function(err,result){  
  if (err) return console.error(err);  
  console.log(result);  
  });  
  
  
//更新  
User.update(  
{   
     "_id" : "195861",  
     "tags.tagID" : 1  
},  
{  
     $set: {  
          "tags.$" : {  
          'tagID" : 333,  
          "optDate" : new Date(),  
          "enable" : true}  
           }  
},function(err,result){  
  if (err) return console.error(err);  
  console.log(result);  
  });  
```


### 27-vue里面父子组件通信
https://cn.vuejs.org/v2/guide/components.html#Prop
这里说的父子组件通信，不用vuex
首先说下常规方法
1. 父传子
>1. 传入属性
>```markdown
> 首先在子组件中声明props属性接收又父组件传来的数据
> props:['message']
> props:{
>   message:{
>    type: String,
>    default: 'ss'
>    required: true
>   }    
>}
> 再父组件调用子组件的时候传入就行了
> <child message='你好'></child>
> <child :message='parent-property'></child>
>
>```
>2. 传入方法
>```markdown
>  1. 第一种方法和上面一样
>  2. 第二种
>    父组件调用子组件用ref标明
>    <child ref= 'test'></child>
>    然后付组件在自己的某个方法中调用
>    parentMethod(){
>        this.refs['test'].childMethod('传参')
>    }
>    ref可以是动态的，用v-for渲染数组列表可以试下v-bind:ref='item'
>```

2. 子传父
```
1.子组件调用父组件方法
<template>
<div @click="iclick"></div>
</template>
methods:{
    iclick(){
        let data = {
            a:'data'
        };
        this.$emit('ievent',data,'lalala');
    }
}
2.父组件方法接收数据触发
<i-template @ievent = "ievent"></i-template>
methods:{
    ievent(...data){
        console.log('allData:',data);// data为包含传过来所有数据的数组，第一个元素是对象，第二个元素是字符串
    }
}
```

### 28-vue里面非父子组件通信
非父子组件之间通信，vue官方锐减使用vueX，但是这里相较简单，所以采用的是利用给一个空实例eventHub，作为两个组件的中央数据总线，使用this.$root.eventHub.$emit来派发自定义事件，使用this.$root.eventHub.$on来监控 
这里特别说明$root，官方解释：表示当前组建树的根实例，如果根实例没有父实例，次实例将会是自己
```
1. 跟组件中创建第三方总线
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue() // 给data添加一个 名字为eventHub 的空vue实例,用来传输非父子组件的数据
  }
}).$mount('#app'); // 手动挂载，#app
2. 组件2监控事件
created() {
    // 获取按钮组件的点击的元素，用在drop方法里
    this.$root.eventHub.$on('cart.add', this.drop);
},
3. 组件2分发组件1自定义事件，传递信息event.target
this.$root.eventHub.$emit('cart.add', event.target); // 传输点击的目标元素
```

### 29-axios同时发送多个请求
```
axios.all([way1(),way2()])
.then(axios.spread((way1result, way2result) => {
    //结果按上面请求的数据
    console.log(way1result)
    console.log(way2result)
}))
```

### 30-vue中使用echarts
https://blog.csdn.net/mr_wuch/article/details/70225364
1. 安装
```
npm install echarts -S
```
2. 全局引入
```
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
```
3. 使用
```
<div id="myChart" :style="{width: '300px', height: '300px'}"></div>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
注意： 这里echarts初始化应在钩子函数mounted()中，这个钩子函数是在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用
```


### 31-echart图表随宽度变化而变化
```
window.onresize = function(){
  myChart.resize();
  只要在改变宽度时重新渲染就可以了
  谢谢，有一个疑问，这里不设置函数节流会不会导致页面很卡，因为你不断触发resize
});
```