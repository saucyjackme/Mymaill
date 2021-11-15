<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 为了吸顶效果，复制一份到<scroll>外面 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
      ref="tabcontrol1"
    />

    <!-- 使用better-scroll -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 封装的轮播图组件 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 封装的第二部分 -->
      <recommend-view :recommends="recommends" />
      <!-- 封装的第三部分 -->
      <feature-view />
      <!-- 封装的第四部分 '流行', '新款', '精选'-->
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        :class="{fixed:isTabFixed}"
      />
      <!-- 封装的第五部分 '流行', '新款', '精选'的数据-->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop"

import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from '@/common/utils';



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [], //取出数据插入<swiper-item>
      recommends: [], //<recommend-view>
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffetTop: 0,
      isTabFixed: false,
      saveY: 0,
      //itemImageListener: null,//已经加入混入中
    };
  },
  computed: {
    showGoods() {
      //<goods-list>
      return this.goods[this.currentType].list;
    },
  },
  //这两个生命周期函数在<keep-alive>切换时才生成
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 500);
    this.$refs.scroll.refresh(); //refresh()方法封装在Scroll.vue中
  },
  deactivated() {
    //1.保存首页离开时的Y值
    this.saveY = this.$refs.scroll.scroll.y;
    //或this.$refs.scroll.getScrollY(); getScrollY()方法在Scroll.vue中

    //2.取消GoodsListItem中img加载传过来的监听事件
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  created() {
    // 生命周期函数，组件创建完就要发送网络请求
    //调用methods的函数
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
    // //2.获取tabControl的offsetTop
    // console.log(this.$refs.tabControl2);
    // this.tabOffetTop = this.$refs.offsetTop;
  },

  methods: {
    /**
     * 网络请求相关的方法
     */
    //1.请求多个数据，轮播图 还有下边的
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list; //在data中保存，不然会被内存回收
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求'流行', '新款', '精选'的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //下一次上拉加载更多
        this.$refs.scroll.scroll.finishPullUp();//这里是调的Scroll组件中的finishPullUp()方法
        //或this.$refs.scroll.finishPullUp();//Scroll.vue中methods也要改
      });
    },
    /**
     * 事件监听相关的方法
     */
    //<tab-control>中
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },

    //better-scroll的方法，点击返回顶部
    backClick() {
      console.log('加native监听自定义原生组件的事件');
      //第一个是ref的属性名，第二个是封装的scroll组件的对象名 scrollTo(x,y,time)
      this.$refs.scroll.scroll.scrollTo(0,0,500);
      console.log(this.$refs.scroll.message);
    },

    /*用Scoll.vue，<scroll>*/
    contentScroll(position) {
      // console.log(position);
      //1.<back-top>的显示与隐藏
      this.isShowBackTop = Math.abs(position.y) > 1000;
      //2.决定<tab-control>是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffetTop;
    },

    //用Scoll.vue,<scroll>中的方法，上拉加载更多
    loadMore() {
      // console.log('Home组件中的上来加载更多，此功能由Scroll组件子传父过来');
      this.getHomeGoods(this.currentType);
    },

    //频繁刷新的防抖函数,已经封装到common/utils.js中
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     //...args可以传多个参数
    //     clearTimeout(timer); //先清空定时器
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },

    swiperImageLoad() {
      // console.log(this.$refs.tabcontrol2.$el.offsetTop);
      this.tabOffetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh; /* 视口高度100% ,用better-scroll*/
  position: relative; /* 用better-scroll*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /* 不用better-scroll */
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/* 用better-scroll */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
 .fixed {
   position: fixed;
   left: 0;
   right: 0;
   top: 44px;
 }
</style>