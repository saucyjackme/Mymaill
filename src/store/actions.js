import { ADD_TO_CART,ADD_COUNTER } from "./mutaions-type";


export default {
  //复杂的逻辑和操作以及异步操作放在actions里
  addCart(context, payload) {
    // console.log(state.cartList);
    // state.cartList.push(payload);
    //利用数组检查是否有重复项（空||有值）
    return new Promise((resolve) => {
      //查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        //如有，则数量+1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      } else {
        //如原先的没有，则设置当前payload是数量为1，并添加进数组
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('您已成功添加购物车')
      }
    })
  }
}