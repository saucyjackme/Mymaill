<template>
  <div class="cart-list">
    <scroll class="content" :probeType="3">
      <cart-list-item v-for="(item,index) in cartList" 
      :key="index" 
      :product="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue"


import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.cart-list {
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
