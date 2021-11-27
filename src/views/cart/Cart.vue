<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品种类({{ cartLength }})</div>
      <!-- <div>{{this.$store.cartList.length}}</div> -->
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部总结栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar.vue"


import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['cartLength'])
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
  },
  methods: {},
};
</script>
<style scoped>
/* .cart {
  height: 100%;
} */
.nav-bar {
  background-color: var(--color-tint);
}
</style>
