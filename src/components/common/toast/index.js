import Toast from "./Toast.vue"
const obj = {}

obj.install = function(Vue) {
  // console.log('这里是初始化了挂载到全局的toast.....',vue);
  //1.拿到Toast组件；将Toast上的元素添加到页面上
  // document.body.appendChild(Toast.$el);
  //将Toast挂载到页面div上；相当于main.js中 
  // new Vue({
  //   render: h => h(App),
  //   router,
  //   store
  // }).$mount('#app')
//普通方式来实现 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor();
  //3.手动将对象挂载到某一个div上
  toast.$mount(document.createElement('div'));
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}


export default obj 