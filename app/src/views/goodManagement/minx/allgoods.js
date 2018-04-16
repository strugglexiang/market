import {
    getGoodsAjax,//获取商品
    addGoodsAjax,//添加商品
    updateGoodsAjax,//修改商品
    delGoodsAjax,//删除商品
    addGoodsPicAjax,//上传商品图片
} from '@/ajax/goods/goods'
export default {
    methods:{
        queryUser(obj){
            console.log(obj)
        }
    },  
    //测试节流函数
    // created () {
    //     console.log(this.jieliu(() => {
    //         console.log(this)
    //     }))
    // }
}