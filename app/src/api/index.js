// let apiUrl = 'http://127.0.0.1:2502' //洪山桥分部
let apiUrl = 'http://127.0.0.1:2501' //总部

function setApiUrl(str){
    apiUrl = str
}

function getApiUrl(){
    return apiUrl
}

export default {
    apiUrl,//请求哪个部门的api
    setApiUrl,
    getApiUrl,
}