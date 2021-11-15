<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'rgb(219, 75, 146)'
    }
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed:{
    isActive(){
      // return true /false
      // indexOf():大小写敏感；如果要检索的字符串值没有出现，则该方法返回 -1。
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive? {color:this.activeColor}:{};
    }
  },
  methods: {
    itemClick(){
      // console.log('itemClick');
      this.$router.replace(this.path).catch(()=>{});
    }
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: rgb(219, 75, 146);
} */
</style>
