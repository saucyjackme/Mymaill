//导入vue
import Vue from 'vue';
import VueRouter from 'vue-router';

//导入路由组件
const Home = ()=> import('../views/home/Home')
const Category = ()=> import('../views/category/Category')
const Cart = ()=> import('../views/cart/Cart')
const Profile = ()=> import('../views/profile/Profile')
const Detail = ()=> import('../views/detail/Detail')

//安装插件
Vue.use(VueRouter);

//创建路由对象
const routes = [
  {
      path: '',
      redirect: '/home',
      meta:{
          title:'首页'
      }
  },
  {
      path: '/home',
      component: Home,
  },
  {
      path: '/category',
      component: Category,
      meta:{
          title:'分类'
      }
  },
  {
      path: '/cart',
      component: Cart,
      meta:{
          title:'购物车'
      }
  },
  {
      path: '/profile',
      component: Profile,
      meta:{
          title:'个人资料'
      }
  },
  {
    //传id
    path: '/detail/:iid',
    component: Detail,
    meta:{
        title:'详情页面'
    }
}
] ;
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router