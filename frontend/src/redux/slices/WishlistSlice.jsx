import { createSlice } from "@reduxjs/toolkit";

const getItemId = (item) => item.id || item._id;

const initialState = JSON.parse(localStorage.getItem("grocery_wishlist") || "[]");

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggle: (state, action) => {
      const product = action.payload;
      const productId = getItemId(product);
      const index = state.findIndex((item) => getItemId(item) === productId);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(product);
      }
      localStorage.setItem("grocery_wishlist", JSON.stringify(state));
    },
    remove: (state, action) => {
      const nextState = state.filter((i) => getItemId(i) !== action.payload);
      localStorage.setItem("grocery_wishlist", JSON.stringify(nextState));
      return nextState;
    },
    clear: () => {
      localStorage.removeItem("grocery_wishlist");
      return [];
    },
  },
});

export const { toggle, remove, clear } = WishlistSlice.actions;
export default WishlistSlice.reducer;
