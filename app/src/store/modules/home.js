// 本文件主要是为了布局的准备


let  state = {
    sideStatu : !Number.parseInt(sessionStorage.getItem('sideStatu')),//侧边栏默认展开
}

let actions = {
    sideStatu_action({commit}){
        commit('sideStatu_mutation')
    }
}

let mutations = {
    sideStatu_mutation(state){
        //存1 false不展开
        //存0 得true 展开
      if(state.sideStatu){
         sessionStorage.setItem('sideStatu',1)   
      }else{
        sessionStorage.setItem('sideStatu',0) 
      }
      state.sideStatu = !state.sideStatu
    //   console.log(state.sideStatu)
    }
}

export default {
    state ,
    actions,
    mutations
}