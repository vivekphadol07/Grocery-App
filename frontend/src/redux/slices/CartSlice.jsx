import { createSlice } from "@reduxjs/toolkit";

const getItemId = (item) => item.id || item._id;

const initialState = JSON.parse(localStorage.getItem("grocery_cart") || "[]");

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const product = action.payload;
      const productId = getItemId(product);
      const existingItem = state.find((item) => getItemId(item) === productId);

      if (existingItem) {
        if (existingItem.quantity < (product.stock ?? 999)) {
          existingItem.quantity += 1;
        }
      } else {
        if ((product.stock ?? 999) > 0) {
          state.push({ ...product, quantity: 1 });
        }
      }
      localStorage.setItem("grocery_cart", JSON.stringify(state));
    },

    increment: (state, action) => {
      const item = state.find((i) => getItemId(i) === action.payload);
      if (item) {
        if (item.quantity < (item.stock ?? 999)) {
          item.quantity += 1;
          localStorage.setItem("grocery_cart", JSON.stringify(state));
        }
      }
    },

    decrement: (state, action) => {
      const index = state.findIndex((i) => getItemId(i) === action.payload);
      if (index !== -1) {
        state[index].quantity -= 1;
        if (state[index].quantity <= 0) {
          state.splice(index, 1);
        }
        localStorage.setItem("grocery_cart", JSON.stringify(state));
      }
    },

    remove: (state, action) => {
      const nextState = state.filter((i) => getItemId(i) !== action.payload);
      localStorage.setItem("grocery_cart", JSON.stringify(nextState));
      return nextState;
    },

    clear: () => {
      localStorage.removeItem("grocery_cart");
      return [];
    },
  },
});

export const { add, increment, decrement, remove, clear } = CartSlice.actions;
export default CartSlice.reducer;
