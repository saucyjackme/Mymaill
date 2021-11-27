//启动文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'

Vue.config.productionTip = false
//安装事件总线
Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast);//这里会执行index.js中obj的install函数


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
