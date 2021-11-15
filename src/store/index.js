//利用Vuex Store存储状态
import Vue from 'vue'
import Vuex from 'vuex'
//导入拆分的mutations等js文件
import mutations from './mutations'
import actions from './actions'

//1.安装插件
Vue.use(Vuex);
//2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  actions
})

//3.挂载到Vue实例上
export default store
