import { ADD_TO_CART,ADD_COUNTER } from "./mutaions-type";

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++;
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  }
}