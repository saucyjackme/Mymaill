<template>
  <div class="cart-bottom-bar">
    <div class="check-content" @click="selectAll">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calculate">去计算 {{ checkLength }}</div>
  </div>
</template>
<script>
import checkButton from "@/components/content/checkButton/CheckButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    checkButton,
  },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      // fileter()函数遍历数组中的元素并返回符合条件的每个元素形成新的数组
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      //   //全选逻辑：有一个未选中（checked）就不是全选,filter返回一个数组
      //   //1:第一个是string类型 会报错
      //   //1： return !(this.cartList.filter(item => item.checked).length)
      //   //2:find;第二种要考虑undefined的情况;
      //   //当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
      //   //如果没有符合条件的元素返回 undefined
      //   // if(this.cartList.length == 0) return false
      //   // return !this.cartList.find(item => !item.checked)
      //3.every 每个都有才为true,一个没有即为false
      if (this.$store.state.cartList.length == 0) return false;
      return this.$store.state.cartList.every((item) => item.checked);
    },
  },
  methods: {
    selectAll() {
      // console.log('....');
      //如果已全选，则取反
      //如果有一个不选，则全选
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    //去结算按钮条件判断
    calculate() {
      if(this.checkLength == 0) {
        this.$toast.show('请选择需要购买的商品',800)
      }
    }
  },
};
</script>
<style scoped>
.cart-bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 134px;
  align-items: center;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 65px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
}

.price {
  margin-left: 35px;
  flex: 1;
}
.calculate {
  line-height: 40px;
  text-align: center;
  height: 40px;
  width: 90px;
  background-color: red;
  color: #fff;
}
</style>
