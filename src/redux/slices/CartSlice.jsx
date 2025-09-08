import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 }); // keep all product details + quantity
      }
    },

    increment: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrement: (state, action) => {
      const index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        state[index].quantity -= 1;
        if (state[index].quantity <= 0) {
          state.splice(index, 1); // remove item in place
        }
      }
    },

    remove: (state, action) => {
      return state.filter((i) => i.id !== action.payload);
    },
  },
});

export const { add, increment, decrement, remove } = CartSlice.actions;
export default CartSlice.reducer;
