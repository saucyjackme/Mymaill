<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick" 
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        ref="detailInfo"
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="paramInfo"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="commentInfo"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
// import BackTop from "@/components/content/backTop/BackTop"
//复用goodslist组件代替推荐商品部分
import GoodsList from "@/components/content/goods/GoodsList.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";

import {backTopMixin} from "@/common/mixin"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    // BackTop,
    GoodsList,
    Scroll,
  },
  mixins:[backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    //1.保存所请求的iid
    this.iid = this.$route.params.iid;
    //2.根据保存的iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //1.获取顶部的图片轮播图数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息
      // console.log(data.shopInfo);
      this.shop = new Shop(data.shopInfo);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // console.log(this.paramInfo);
      //5.获取详情页参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //1.第一次获取，值不对，undefined
      //这里值不对是因为这里this.$refs.params.$el压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.detailInfo.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);
      // this.$nextTick(() => {
      //   //2.第二次获取：值不对，图片没有计算在内
      //   //根据最新的数据，对应的DOM已经被渲染出来了，但是图片依然是没有加载完
      //   //offsetTop值不对的时候，都是因为图片的问题
      //   // this.themeTopYs = [];
      //   // this.themeTopYs.push(0);
      //   // this.themeTopYs.push(this.$refs.detailInfo.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   // console.log(this.themeTopYs);
      // });
    });
    //3.请求商品推荐的详情数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
    });
  },
  mounted() {},
  updated() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.detailInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      // console.log("titleClick");
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      //1.获取Y值
      const positionY = -position.y;
      // console.log(positionY);
      //2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length-1; i++) {
        //this.currentIndex !== i 防止请求太过频繁
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i])  && positionY < this.themeTopYs[i+1]){
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.$refs.nav.currentIndex);
        }
      }
       //1.<back-top>的显示与隐藏
      //  console.log(positionY);
      this.isShowBackTop = Math.abs(positionY) > 1000;
    },
    //   //4.回到顶部功能;已移到minxin.js做混入
    // backClick() {
    //   // console.log("回到顶部");
    //   // console.log(this.$refs.scroll.scroll);
    //   this.$refs.scroll.scroll.scrollTo(0, 0, 100);
    // }
    addToCart() {
      console.log('Detail.vue中的addToCart');
      //1.获取购物车需要展示的信息
      const product = {};
      //topImages\goods\iid来自于本页面的变量，
      // console.log(product);
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车里
      // this.$store.cartList.push() 不要这么做 $store中修改数据需要通过mutations、commit等
      // this.$store.commit('addCart',product);
      // 复杂的逻辑操作和运算以及异步操作放在actions中
      this.$store.dispatch('addCart',product);
      console.log(this.$store.state.cartList);
    }
  },
}; 
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.content {
  height: calc(100% - 44px);
}
</style>
