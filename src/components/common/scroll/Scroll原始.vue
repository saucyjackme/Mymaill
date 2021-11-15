<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
// import ObserveDOM from "@better-scroll/observe-dom";
// // import ObserveImage from '@better-scroll/observe-image';
// import MouseWheel from '@better-scroll/mouse-wheel';

// BScroll.use(ObserveDOM);
// // BScroll.use(ObserveImage);
// BScroll.use(MouseWheel);

export default {
  name: "Scroll",
  data() {
    return {
      bscroll:null
    };
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      //  eventPassthrough: 'vertical',
      // click:true,
      // scrollX: false,
      // scrollY: true,
      // observeDOM: true,
      // observeImage:true,
      // mouseWheel: true,
      probeType: 2,
      click:true,
      // mouseWheel:true,
      // observeDOM:true
    });
  },
  methods: {},
};
</script>
<style scoped></style>
 