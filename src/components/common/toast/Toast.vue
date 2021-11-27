<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>
<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "你好",
    // },
    // isShow:{
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      message:'',
      isShow: false
    };
  },
  methods: {
    show(message,duration=1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(()=>{
        this.isShow = false;
      },duration)
    }
  },
};
</script>
<style scoped>
.toast {
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align:center ;
  width: 180px;
  height: 30px;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  position: fixed;
}
</style>
