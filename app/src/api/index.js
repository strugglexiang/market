let apiUrl = 'http://127.0.0.1:2502' //洪山桥分部
// let apiUrl = 'http://127.0.0.1:2501' //总部

// let apiUrl = ''

function setApiUrl(str){
    apiUrl = str
}

function getApiUrl(){
    return apiUrl
}

function getPartName(){
   if(apiUrl === 'http://127.0.0.1:2501'){
       return '总部'
   }else if(apiUrl === 'http://127.0.0.1:2502'){
       return '洪山桥分部'
   }
}

export default {
    apiUrl,//请求哪个部门的api
    setApiUrl,
    getApiUrl,
    getPartName,
}